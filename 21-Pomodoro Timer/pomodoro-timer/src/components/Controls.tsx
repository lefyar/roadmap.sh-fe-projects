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
        className="flex items-center justify-center gap-2 px-4 min-h-11 rounded-md bg-rose-700 text-white hover:bg-rose-800"
      >
        {isRunning ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        {isRunning ? 'Pause timer' : 'Start timer'}
      </button>
      
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 px-4 min-h-11 rounded-md bg-white border border-slate-300 hover:bg-slate-100"
      >
        <RotateCcw size={18} aria-hidden="true" /> Reset timer
      </button>
    </div>
  );
};
