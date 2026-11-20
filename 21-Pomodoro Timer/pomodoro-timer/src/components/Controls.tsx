import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={isRunning ? onPause : onStart}
        className="flex items-center justify-center gap-2 px-4 min-h-11 rounded-md bg-[var(--ui-action)] text-white hover:bg-[var(--ui-action-hover)]"
      >
        {isRunning ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        {isRunning ? 'Pause timer' : 'Start timer'}
      </button>
      
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 px-4 min-h-11 rounded-md bg-[var(--ui-surface)] border border-[color:var(--ui-control)] hover:bg-[var(--ui-hover)]"
      >
        <RotateCcw size={18} aria-hidden="true" /> Reset timer
      </button>
    </div>
  );
};
