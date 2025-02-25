export interface TimerConfig {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}

export type SessionType = 'work' | 'shortBreak' | 'longBreak';

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  currentSession: SessionType;
  completedSessions: number;
}