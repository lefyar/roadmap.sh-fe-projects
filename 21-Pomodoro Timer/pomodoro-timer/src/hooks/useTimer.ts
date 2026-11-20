import { useState, useEffect, useCallback } from 'react';
import { TimerConfig, TimerState, SessionType } from '../types';

const INITIAL_CONFIG: TimerConfig = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

const CONFIG_STORAGE_KEY = 'pomodoro.config.v1';

function loadConfig(): TimerConfig {
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG_STORAGE_KEY) ?? '');
    if (saved && typeof saved === 'object') {
      const cfg = saved as Partial<TimerConfig>;
      if (
        Number.isFinite(cfg.workMinutes) && (cfg.workMinutes as number) >= 1 &&
        Number.isFinite(cfg.shortBreakMinutes) && (cfg.shortBreakMinutes as number) >= 1 &&
        Number.isFinite(cfg.longBreakMinutes) && (cfg.longBreakMinutes as number) >= 1 &&
        Number.isFinite(cfg.sessionsBeforeLongBreak) && (cfg.sessionsBeforeLongBreak as number) >= 1
      ) {
        return {
          workMinutes: cfg.workMinutes as number,
          shortBreakMinutes: cfg.shortBreakMinutes as number,
          longBreakMinutes: cfg.longBreakMinutes as number,
          sessionsBeforeLongBreak: cfg.sessionsBeforeLongBreak as number,
        };
      }
    }
  } catch {
    // corrupt or missing persisted settings are ignored
  }
  return INITIAL_CONFIG;
}

export const useTimer = () => {
  const [config, setConfig] = useState<TimerConfig>(loadConfig);
  const [timerState, setTimerState] = useState<TimerState>(() => {
    const initial = loadConfig();
    return {
      isRunning: false,
      timeRemaining: initial.workMinutes * 60,
      currentSession: 'work',
      completedSessions: 0,
    };
  });
  const [focusMinutes, setFocusMinutes] = useState(0);

  const saveConfig = useCallback((cfg: TimerConfig) => {
    setConfig(cfg);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(cfg));
    } catch {
      // storage unavailable
    }
  }, []);

  const playNotification = useCallback(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(() => undefined);
  }, []);

  const getNextSession = useCallback((currentSession: SessionType, completedSessions: number): SessionType => {
    if (currentSession === 'work') {
      return (completedSessions + 1) % config.sessionsBeforeLongBreak === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  }, [config.sessionsBeforeLongBreak]);

  const getSessionDuration = useCallback((sessionType: SessionType, durations: TimerConfig = config): number => {
    switch (sessionType) {
      case 'work':
        return durations.workMinutes * 60;
      case 'shortBreak':
        return durations.shortBreakMinutes * 60;
      case 'longBreak':
        return durations.longBreakMinutes * 60;
    }
  }, [config]);

  useEffect(() => {
    let interval: number;

    if (timerState.isRunning && timerState.timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimerState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (timerState.timeRemaining === 0) {
      playNotification();
      const completedWork = timerState.currentSession === 'work';
      const nextSession = getNextSession(timerState.currentSession, timerState.completedSessions);
      const duration = getSessionDuration(nextSession, config);
      setTimerState((prev) => ({
        isRunning: true,
        timeRemaining: duration,
        currentSession: nextSession,
        completedSessions: prev.currentSession === 'work' ? prev.completedSessions + 1 : prev.completedSessions,
      }));
      if (completedWork) {
        setFocusMinutes((prev) => prev + config.workMinutes);
      }
    }

    return () => clearInterval(interval);
  }, [timerState, getNextSession, getSessionDuration, playNotification, config]);

  const startTimer = () => {
    setTimerState((prev) => ({ ...prev, isRunning: true }));
  };

  const pauseTimer = () => {
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  };

  const resetTimer = useCallback(() => {
    setTimerState({
      isRunning: false,
      timeRemaining: getSessionDuration('work'),
      currentSession: 'work',
      completedSessions: 0,
    });
  }, [getSessionDuration]);

  const updateConfig = useCallback((newConfig: TimerConfig) => {
    saveConfig(newConfig);
    setTimerState((prev) => ({
      ...prev,
      timeRemaining: getSessionDuration(prev.currentSession, newConfig),
    }));
  }, [saveConfig, getSessionDuration]);

  return {
    timerState,
    config,
    focusMinutes,
    startTimer,
    pauseTimer,
    resetTimer,
    updateConfig,
  };
};
