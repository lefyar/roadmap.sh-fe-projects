import { useEffect, useRef } from "react";
import type { Story } from "./Stories";

export default function ViewStory({ stories, index, select }: {
  stories: Story[]; index: number; select: (id: string | null) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  function move(step: number) {
    const next = stories[index + step];
    if (next) select(next.id);
  }
  const touchX = useRef(0);
  return <dialog ref={dialog} aria-label="Photo viewer" onCancel={event => { event.preventDefault(); select(null); }}
    onKeyDown={e => {
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    }}>
    <div className="viewer-bar"><span aria-live="polite">Photo {index + 1} of {stories.length}</span>
      <button onClick={() => select(null)}>Close</button></div>
    <img className="full-photo" src={stories[index].image} alt="Selected diary photo"
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
      }} />
    <div className="viewer-bar"><button disabled={!index} onClick={() => move(-1)}>Previous</button>
      <button disabled={index === stories.length - 1} onClick={() => move(1)}>Next</button></div>
  </dialog>;
}
