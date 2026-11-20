import { useEffect, useRef } from "react";
import type { Story } from "../storyStorage";

type ViewStoryProps = {
  story: Story;
  index: number;
  total: number;
  onMove: (step: number) => void;
  onClose: () => void;
  onDelete: (story: Story) => void;
  error: string;
};

const postingDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

export default function ViewStory({ story, index, total, onMove, onClose, onDelete, error }: ViewStoryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    close.current?.focus();
    return () => element?.close();
  }, []);

  return (
    <dialog className="story-viewer" ref={dialog} aria-label="Story viewer"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          onMove(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div className="viewer-header">
        <p aria-live="polite">Story {index + 1} of {total}</p>
        <button className="viewer-button" type="button" ref={close} onClick={onClose}>Close</button>
      </div>

      <div className="viewer-stage"
        onPointerDown={event => {
          if (event.isPrimary && event.pointerType !== "mouse") {
            pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
          }
        }}
        onPointerCancel={() => { pointer.current = null; }}
        onPointerUp={event => {
          const start = pointer.current;
          if (!start || start.id !== event.pointerId) return;
          pointer.current = null;
          const distance = event.clientX - start.x;
          if (Math.abs(distance) >= 48 && Math.abs(distance) > Math.abs(event.clientY - start.y)) {
            onMove(distance < 0 ? 1 : -1);
          }
        }}>
        <img src={story.image} alt={`Story photo posted ${postingDate.format(story.created)}`} draggable={false} />
      </div>

      <div className="viewer-actions">
        <div className="viewer-navigation">
          <button className="viewer-button" type="button" aria-disabled={index === 0} onClick={() => onMove(-1)}>Previous</button>
          <button className="viewer-button" type="button" aria-disabled={index === total - 1} onClick={() => onMove(1)}>Next</button>
        </div>
        <button className="viewer-delete" type="button" onClick={() => onDelete(story)}>Delete story</button>
      </div>
      <p className="viewer-error" role="status">{error}</p>
    </dialog>
  );
}
