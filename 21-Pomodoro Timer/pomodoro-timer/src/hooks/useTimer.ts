import { useState, useEffect, useCallback } from 'react';
import { TimerConfig, TimerState, SessionType } from '../types';

const INITIAL_CONFIG: TimerConfig = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

export const useTimer = () => {
  const [config, setConfig] = useState<TimerConfig>(INITIAL_CONFIG);
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    timeRemaining: config.workMinutes * 60,
    currentSession: 'work',
    completedSessions: 0,
  });

  const playNotification = useCallback(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(console.error);
  }, []);

  const getNextSession = useCallback((currentSession: SessionType, completedSessions: number): SessionType => {
    if (currentSession === 'work') {
      return (completedSessions + 1) % config.sessionsBeforeLongBreak === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  }, [config.sessionsBeforeLongBreak]);

  const getSessionDuration = useCallback((sessionType: SessionType): number => {
    switch (sessionType) {
      case 'work':
        return config.workMinutes * 60;
      case 'shortBreak':
        return config.shortBreakMinutes * 60;
      case 'longBreak':
        return config.longBreakMinutes * 60;
    }
  }, [config]);

  useEffect(() => {
    let interval: number;

    if (timerState.isRunning && timerState.timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (timerState.timeRemaining === 0) {
      playNotification();
      const nextSession = getNextSession(timerState.currentSession, timerState.completedSessions);
      setTimerState(prev => ({
        isRunning: false,
        timeRemaining: getSessionDuration(nextSession),
        currentSession: nextSession,
        completedSessions: prev.currentSession === 'work' ? prev.completedSessions + 1 : prev.completedSessions,
      }));
    }

    return () => clearInterval(interval);
  }, [timerState, getNextSession, getSessionDuration, playNotification]);

  const startTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: true }));
  };

  const pauseTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    setTimerState({
      isRunning: false,
      timeRemaining: getSessionDuration('work'),
      currentSession: 'work',
      completedSessions: 0,
    });
  };

  const updateConfig = (newConfig: TimerConfig) => {
    setConfig(newConfig);
    setTimerState(prev => ({
      ...prev,
      timeRemaining: getSessionDuration(prev.currentSession),
    }));
  };

  return {
    timerState,
    config,
    startTimer,
    pauseTimer,
    resetTimer,
    updateConfig,
  };
};