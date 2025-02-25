import React from 'react';
import { X } from 'lucide-react';
import { TimerConfig } from '../types';

interface SettingsProps {
  config: TimerConfig;
  onUpdate: (config: TimerConfig) => void;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  config,
  onUpdate,
  onClose,
}) => {
  const [localConfig, setLocalConfig] = React.useState(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(localConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#101010] flex items-center justify-center p-4">
      <div className="bg-[#1b1b1b] rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#f1f1f1]">Timer Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#f1f1f1] hover:text-gray-400 transition-colors rounded-full"
            aria-label="Close settings"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#f1f1f1] mb-1">
                Work Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={localConfig.workMinutes}
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  workMinutes: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 bg-[#2c2c2c] text-[#f1f1f1] rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#f1f1f1] mb-1">
                Short Break Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={localConfig.shortBreakMinutes}
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  shortBreakMinutes: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 bg-[#2c2c2c] text-[#f1f1f1] rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#f1f1f1] mb-1">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={localConfig.longBreakMinutes}
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  longBreakMinutes: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 bg-[#2c2c2c] text-[#f1f1f1] rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#f1f1f1] mb-1">
                Sessions Before Long Break
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={localConfig.sessionsBeforeLongBreak}
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  sessionsBeforeLongBreak: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 bg-[#2c2c2c] text-[#f1f1f1] rounded-md"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#f1f1f1] bg-[#1b1b1b] rounded-md hover:bg-[#2c2c2c] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};