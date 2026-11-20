import { useEffect, useRef, type FormEvent } from 'react';
import type { TimerConfig } from '../types';
import { timerFields } from '../timerFields';

const fieldNames = Object.keys(timerFields) as (keyof TimerConfig)[];

interface SettingsProps {
  config: TimerConfig;
  onUpdate: (config: TimerConfig) => void;
  onClose: () => void;
}

export function Settings({ config, onUpdate, onClose }: SettingsProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const next = { ...config };
    for (const key of fieldNames) next[key] = Number(values.get(key));
    onUpdate(next);
    onClose();
  }

  return (
    <dialog ref={dialog} aria-labelledby="settings-title" className="m-auto w-[min(90vw,28rem)] rounded-xl border border-slate-300 p-5 text-slate-900"
      onCancel={event => { event.preventDefault(); onClose(); }}>
      <h2 id="settings-title" className="mb-4 text-xl font-semibold">Timer settings</h2>
      <form onSubmit={save}>
        <div className="grid gap-3">
          {fieldNames.map(key => <label key={key} className="grid gap-1 font-medium">
            {timerFields[key].label}
            <input className="rounded-md border border-slate-400 px-3 py-2" name={key} type="number"
              min={1} max={timerFields[key].max} defaultValue={config[key]} required />
          </label>)}
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-md border border-slate-300 px-3 py-2">Cancel</button>
          <button className="rounded-md bg-rose-700 px-3 py-2 text-white">Save settings</button>
        </div>
      </form>
    </dialog>
  );
}
