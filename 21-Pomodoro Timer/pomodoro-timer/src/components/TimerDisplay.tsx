import React from 'react';
import { Timer, Settings2 } from 'lucide-react';
import { SessionType } from '../types';

interface TimerDisplayProps {
  timeRemaining: number;
  currentSession: SessionType;
  completedSessions: number;
  focusMinutes: number;
  onSettingsClick: () => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const sessionLabels: Record<SessionType, string> = {
  work: 'Focus Time',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeRemaining,
  currentSession,
  completedSessions,
  focusMinutes,
  onSettingsClick,
}) => {
  return (
    <section className="w-full max-w-md mx-auto border border-[color:var(--ui-line)] bg-[var(--ui-surface)] rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2 mb-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold" aria-live="polite">
          <Timer aria-hidden="true" className="h-5 w-5 text-[color:var(--ui-muted)]" />
          {sessionLabels[currentSession]}
        </h2>
      <button
        type="button"
        onClick={onSettingsClick}
        className="flex min-h-11 items-center gap-1.5 rounded-md border border-[color:var(--ui-control)] px-2.5 py-2 hover:bg-[var(--ui-hover)]"
        aria-haspopup="dialog"
      >
        <Settings2 size={17} aria-hidden="true" /> Settings
      </button>
      </div>

      <div className="text-center">
        <div className="text-6xl font-bold tabular-nums mb-4" role="timer" aria-label="Time remaining">
          {formatTime(timeRemaining)}
        </div>

        <div className="text-sm text-[color:var(--ui-muted)] mb-2">
          Completed Sessions: {completedSessions} · Focus: {focusMinutes} min
        </div>

      </div>
    </section>
  );
};
