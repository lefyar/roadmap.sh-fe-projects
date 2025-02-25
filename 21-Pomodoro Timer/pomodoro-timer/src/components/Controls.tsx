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
        className="flex items-center justify-center w-14 h-14 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors"
        aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>
      
      <button
        onClick={onReset}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2c2c2c] text-white hover:bg-[#222222] transition-colors"
        aria-label="Reset Timer"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};