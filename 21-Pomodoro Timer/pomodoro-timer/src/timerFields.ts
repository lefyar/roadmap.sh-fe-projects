export const timerFields = {
  workMinutes: { label: 'Focus minutes', max: 60 },
  shortBreakMinutes: { label: 'Short break minutes', max: 30 },
  longBreakMinutes: { label: 'Long break minutes', max: 60 },
  sessionsBeforeLongBreak: { label: 'Focus sessions before a long break', max: 10 },
} as const;
