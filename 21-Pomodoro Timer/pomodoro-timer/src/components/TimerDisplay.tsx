import React from 'react';
import { Timer, Settings2 } from 'lucide-react';
import { SessionType } from '../types';

interface TimerDisplayProps {
  timeRemaining: number;
  currentSession: SessionType;
  completedSessions: number;
  isRunning: boolean;
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
  isRunning,
  onSettingsClick,
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto bg-[#1b1b1b] rounded-2xl shadow-lg p-8">
      {isRunning && (
        <p className='absolute top-4 left-4 text-sm text-gray-500'>Time is running!</p>
      )}
      <button
        onClick={onSettingsClick}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Settings"
      >
        <Settings2 size={24} />
      </button>
      
      <div className="flex items-center justify-center mb-6">
        <Timer className="w-8 h-8 text-rose-500 mr-2" />
        <h2 className="text-2xl font-semibold text-[#f1f1f1]">
          {sessionLabels[currentSession]}
        </h2>
      </div>

      <div className="text-center">
        <div className="text-6xl font-bold text-[#f1f1f1] mb-4" role="timer">
          {formatTime(timeRemaining)}
        </div>
        
        <div className="text-sm text-gray-500 mb-2">
          Completed Sessions: {completedSessions}
        </div>
        
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < (completedSessions % 4) ? 'bg-rose-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};