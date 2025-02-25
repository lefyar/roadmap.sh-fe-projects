import { useState } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { Settings } from './components/Settings';
import { useTimer } from './hooks/useTimer';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const {
    timerState,
    config,
    startTimer,
    pauseTimer,
    resetTimer,
    updateConfig,
  } = useTimer();

  return (
    <div className="min-h-screen bg-[#101010] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TimerDisplay
          timeRemaining={timerState.timeRemaining}
          currentSession={timerState.currentSession}
          completedSessions={timerState.completedSessions}
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