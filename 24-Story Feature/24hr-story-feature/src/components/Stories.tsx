import { useEffect, useRef, useState } from "react";
import ViewStory from "./ViewStory";

export type Story = { id: string; created: number; image: string };
const key = "roadmap.photo-stories.v1";
const day = 24 * 60 * 60 * 1000;

function writeStories(list: Story[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

function readStories(): Story[] {
  const stored = localStorage.getItem(key);
  let saved;
  try { saved = JSON.parse(stored || "[]"); } catch { return []; }
  if (!Array.isArray(saved)) return [];
  const active: Story[] = saved.filter(item => item && Number.isFinite(item.created) &&
    item.created + day > Date.now() && typeof item.image === "string" &&
    item.image.startsWith("data:image/jpeg;base64,"))
    .map(item => ({ ...item, id: typeof item.id === "string" ? item.id : String(item.created) }));
  if (active.length !== saved.length) {
    try { writeStories(active); } catch { /* Expired photos are still hidden. */ }
  }
  return active;
}

async function resizePhoto(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const photo = new Image();
    photo.src = url;
    await photo.decode();
    const scale = Math.min(1, 1080 / Math.max(photo.width, photo.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(photo.width * scale));
    canvas.height = Math.max(1, Math.round(photo.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(photo, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.75);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selected, select] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const picker = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function refresh() {
      try {
        setStories(readStories());
      } catch {
        setMessage("Your saved photos could not be opened.");
      }
    }
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    const timer = window.setInterval(refresh, 10000);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  async function upload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 15 * 1024 * 1024) {
      setMessage("Choose an image smaller than 15 MB.");
      return;
    }
    setBusy(true);
    try {
      const image = await resizePhoto(file);
      const updated = [{ id: crypto.randomUUID(), image, created: Date.now() }, ...readStories()];
      writeStories(updated);
      setStories(updated);
      setMessage("Photo added.");
    } catch {
      setMessage("Could not save this photo. Try a smaller JPEG or PNG, or check browser storage.");
    } finally {
      setBusy(false);
    }
  }

  function removeStory(story: Story) {
    try {
      const remaining = readStories().filter(item => item.id !== story.id);
      writeStories(remaining);
      setStories(remaining);
      if (selected === story.id) select(null);
      setMessage("Photo deleted.");
    } catch {
      setMessage("Could not delete this photo. Check browser storage and try again.");
    }
  }

  return <section className="album">
    <header><h1>Photo diary</h1><p>Photos stay in this browser for 24 hours.</p></header>
    <input ref={picker} type="file" accept="image/*" hidden onChange={event => {
      void upload(event.target.files?.[0]);
      event.target.value = "";
    }} />
    <button className="upload" disabled={busy} onClick={() => picker.current?.click()}>
      {busy ? "Saving photo…" : "+ Add a photo"}
    </button>
    <p role="status">{message}</p>
    {stories.length === 0 ? <p className="empty">No photos yet.</p> :
      <div className="photos">{stories.map(story => (
        <div key={story.id} className="photo-item">
          <button className="photo"
            onClick={() => select(story.id)} aria-label={`View photo from ${new Date(story.created).toLocaleTimeString()}`}>
            <img src={story.image} alt="" /><time>{new Date(story.created).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</time>
          </button>
          <button className="delete-photo"
            onClick={() => removeStory(story)}
            aria-label={`Delete photo from ${new Date(story.created).toLocaleTimeString()}`}>×</button>
        </div>
      ))}</div>}
    {stories.some(story => story.id === selected) &&
      <ViewStory stories={stories} index={stories.findIndex(story => story.id === selected)}
        select={select} />}
  </section>;
}
