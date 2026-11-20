import React, { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { TimerDisplay } from './TimerDisplay';
import { Controls } from './Controls';
import { Settings } from './Settings';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const {
    timerState,
    config,
    focusMinutes,
    startTimer,
    pauseTimer,
    resetTimer,
    updateConfig,
  } = useTimer();

  const { isRunning } = timerState;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        if (isRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      } else if (event.key === 'Escape') {
        resetTimer();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isRunning, pauseTimer, startTimer, resetTimer]);

  return (
    <div className="min-h-screen bg-[#101010] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TimerDisplay
          timeRemaining={timerState.timeRemaining}
          currentSession={timerState.currentSession}
          completedSessions={timerState.completedSessions}
          focusMinutes={focusMinutes}
          isRunning={timerState.isRunning}
          onSettingsClick={() => setShowSettings(true)}
        />

        <Controls
          isRunning={timerState.isRunning}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />
      </div>

      {showSettings && (
        <Settings
          config={config}
          onUpdate={updateConfig}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
