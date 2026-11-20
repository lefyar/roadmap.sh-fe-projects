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
    focusMinutes,
    startTimer,
    pauseTimer,
    resetTimer,
    updateConfig,
  } = useTimer();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-900">
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-center text-3xl font-bold tracking-tight">Pomodoro Timer</h1>
        <TimerDisplay
          timeRemaining={timerState.timeRemaining}
          currentSession={timerState.currentSession}
          completedSessions={timerState.completedSessions}
          focusMinutes={focusMinutes}
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
    </main>
  );
}

export default App;
