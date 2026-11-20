import { useCallback, useEffect, useRef, useState } from "react";
import ViewStory from "./ViewStory";
import { encodePhoto, expiresAt, readStories, storageKey, storyLifetime, writeStories, type Story } from "../storyStorage";

const maxFileSize = 15 * 1024 * 1024;
const postingTime = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const postingDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

type Notice = { text: string; error?: boolean };

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [busy, setBusy] = useState(false);
  const picker = useRef<HTMLInputElement>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const index = stories.findIndex(story => story.id === selected);

  const refresh = useCallback(() => {
    try {
      setStories(readStories());
    } catch {
      setStories(current => current.filter(story => expiresAt(story) > Date.now()));
      setNotice({ text: "Browser storage is unavailable. Check your browser settings.", error: true });
    }
  }, []);

  useEffect(() => {
    const syncStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) refresh();
    };
    refresh();
    window.addEventListener("storage", syncStorage);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  useEffect(() => {
    if (stories.length === 0) return;
    const now = Date.now();
    const nextExpiry = stories.reduce((soonest, story) => Math.min(soonest, expiresAt(story)), now + storyLifetime);
    const delay = Math.max(0, nextExpiry - now);
    const timer = window.setTimeout(refresh, delay);
    return () => window.clearTimeout(timer);
  }, [stories, refresh]);

  const closeViewer = useCallback(() => {
    setSelected(null);
    window.requestAnimationFrame(() => {
      const target = opener.current?.isConnected ? opener.current : addButton.current;
      target?.focus();
    });
  }, []);

  useEffect(() => {
    if (selected !== null && index === -1) closeViewer();
  }, [selected, index, closeViewer]);

  async function upload(file?: File) {
    if (!file || busy) return;
    if ((file.type && !file.type.startsWith("image/")) || file.size > maxFileSize) {
      setNotice({ text: "Choose an image up to 15 MB.", error: true });
      return;
    }

    setBusy(true);
    setNotice(null);
    try {
      let image: string;
      try {
        image = await encodePhoto(file);
      } catch {
        setNotice({ text: "This image couldn?t be opened. Try a JPEG or PNG.", error: true });
        return;
      }

      const story = { id: crypto.randomUUID(), image, created: Date.now() };
      const updated = [story, ...readStories()];
      writeStories(updated);
      setStories(updated);
      setNotice({ text: "Story added." });
    } catch (error) {
      const full = error instanceof DOMException && error.name === "QuotaExceededError";
      setNotice({
        text: full ? "Browser storage is full. Delete a story or try a smaller image."
          : "Couldn?t save the story. Check your browser storage settings and try again.",
        error: true,
      });
    } finally {
      setBusy(false);
    }
  }

  function removeStory(story: Story) {
    try {
      const remaining = readStories().filter(item => item.id !== story.id);
      writeStories(remaining);
      setStories(remaining);
      closeViewer();
      setNotice({ text: "Story deleted." });
    } catch {
      setNotice({ text: "Couldn?t delete this story. Check your browser storage settings and try again.", error: true });
    }
  }

  return (
    <section className="stories" aria-labelledby="stories-title">
      <header className="stories-header">
        <h1 id="stories-title">Stories</h1>
        <p>Photos stay in this browser and disappear after 24 hours.</p>
      </header>

      <input ref={picker} type="file" accept="image/*" hidden onChange={event => {
        void upload(event.target.files?.[0]);
        event.target.value = "";
      }} />

      <div className="story-tray">
        <button className="story-add" ref={addButton} type="button" aria-disabled={busy}
          onClick={() => { if (!busy) picker.current?.click(); }}>
          <span className="add-mark" aria-hidden="true" />
          <span>{busy ? "Saving?" : "Add story"}</span>
        </button>
        {stories.length === 0 ? <p className="story-empty">No stories yet.</p> :
          <ul className="story-list" role="list" aria-label="Active stories">
            {stories.map((story, position) => (
              <li key={story.id}>
                <button className="story-preview" type="button" aria-haspopup="dialog"
                  aria-label={`View story from ${postingDate.format(story.created)}, ${position + 1} of ${stories.length}`}
                  onClick={event => {
                    setNotice(null);
                    opener.current = event.currentTarget;
                    setSelected(story.id);
                  }}>
                  <img src={story.image} alt="" />
                  <time dateTime={new Date(story.created).toISOString()}>{postingTime.format(story.created)}</time>
                </button>
              </li>
            ))}
          </ul>}
      </div>

      <p className="story-notice" role="status" data-error={notice?.error}>{index < 0 ? notice?.text : ""}</p>

      {index >= 0 && <ViewStory story={stories[index]} index={index} total={stories.length}
        onMove={step => {
          const next = stories[index + step];
          if (next) {
            setNotice(null);
            setSelected(next.id);
          }
        }}
        onClose={closeViewer} onDelete={removeStory} error={notice?.error ? notice.text : ""} />}
    </section>
  );
}
