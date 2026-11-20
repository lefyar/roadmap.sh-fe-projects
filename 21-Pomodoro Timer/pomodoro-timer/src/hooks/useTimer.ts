import { useEffect, useRef, useState } from 'react';
import type { SessionType, TimerConfig, TimerState } from '../types';
import { timerFields } from '../timerFields';

const defaults: TimerConfig = {
  workMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15, sessionsBeforeLongBreak: 4,
};
const key = 'pomodoro.config.v1';
const minutes = { work: 'workMinutes', shortBreak: 'shortBreakMinutes', longBreak: 'longBreakMinutes' } as const;

function loadConfig(): TimerConfig {
  const config = { ...defaults };
  try {
    const stored = JSON.parse(localStorage.getItem(key) ?? '{}');
    for (const field of Object.keys(config) as (keyof TimerConfig)[]) {
      const value = stored?.[field];
      if (Number.isInteger(value) && value >= 1 && value <= timerFields[field].max) config[field] = value;
    }
  } catch { /* Defaults are used when storage is unavailable. */ }
  return config;
}

function initialState(config: TimerConfig, focusMinutes = 0) {
  return {
    deadline: null as number | null,
    timeRemaining: config.workMinutes * 60,
    currentSession: 'work' as SessionType,
    completedSessions: 0,
    focusMinutes,
  };
}

export function useTimer() {
  const [config, setConfig] = useState(loadConfig);
  const [state, setState] = useState(() => initialState(config));
  const audio = useRef<AudioContext>(null);
  const lastSession = useRef<SessionType>('work');

  useEffect(() => () => { void audio.current?.close(); audio.current = null; }, []);
  useEffect(() => {
    if (lastSession.current === state.currentSession) return;
    lastSession.current = state.currentSession;
    const context = audio.current;
    if (!context || context.state !== 'running') return;
    const tone = context.createOscillator();
    const volume = context.createGain();
    const now = context.currentTime;
    tone.frequency.value = 740;
    volume.gain.setValueAtTime(0.12, now);
    volume.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    tone.connect(volume).connect(context.destination);
    tone.start();
    tone.stop(now + 0.28);
  }, [state.currentSession]);

  useEffect(() => {
    if (state.deadline === null) return;
    const tick = () => {
      const now = Date.now();
      setState(previous => {
        if (previous.deadline === null) return previous;
        const remaining = Math.ceil((previous.deadline - now) / 1000);
        if (remaining > 0) return remaining === previous.timeRemaining
          ? previous : { ...previous, timeRemaining: remaining };
        const worked = previous.currentSession === 'work';
        const completedSessions = previous.completedSessions + Number(worked);
        const currentSession = !worked ? 'work'
          : completedSessions % config.sessionsBeforeLongBreak === 0 ? 'longBreak' : 'shortBreak';
        const duration = config[minutes[currentSession]] * 60;
        return { deadline: now + duration * 1000, timeRemaining: duration, currentSession, completedSessions,
          focusMinutes: previous.focusMinutes + (worked ? config.workMinutes : 0) };
      });
    };
    const interval = window.setInterval(tick, 200);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [state.deadline, config]);

  function startTimer() {
    if (typeof AudioContext !== 'undefined') {
      audio.current ??= new AudioContext();
      void audio.current.resume().catch(() => undefined);
    }
    const now = Date.now();
    setState(previous => ({ ...previous, deadline: now + previous.timeRemaining * 1000 }));
  }

  function pauseTimer() {
    const now = Date.now();
    setState(previous => previous.deadline === null ? previous : ({
      ...previous, deadline: null, timeRemaining: Math.max(1, Math.ceil((previous.deadline - now) / 1000)),
    }));
  }

  function resetTimer() {
    lastSession.current = 'work';
    setState(previous => initialState(config, previous.focusMinutes));
  }

  function updateConfig(next: TimerConfig) {
    setConfig(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* Keep settings for this visit. */ }
    setState(previous => ({ ...previous, deadline: null, timeRemaining: next[minutes[previous.currentSession]] * 60 }));
  }

  const timerState: TimerState = { ...state, isRunning: state.deadline !== null };
  return { timerState, config, focusMinutes: state.focusMinutes, startTimer, pauseTimer, resetTimer, updateConfig };
}
