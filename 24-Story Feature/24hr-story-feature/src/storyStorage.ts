export type Story = {
  id: string;
  created: number;
  image: string;
};

export const storageKey = "roadmap.photo-stories.v1";
export const storyLifetime = 24 * 60 * 60 * 1000;

export function expiresAt(story: Story) {
  return story.created + storyLifetime;
}

export function writeStories(stories: Story[]) {
  if (stories.length) {
    localStorage.setItem(storageKey, JSON.stringify(stories));
  } else {
    localStorage.removeItem(storageKey);
  }
}

export function readStories(): Story[] {
  const stored = localStorage.getItem(storageKey);
  if (stored === null) return [];

  let saved: unknown;
  try {
    saved = JSON.parse(stored);
  } catch {
    return [];
  }
  if (!Array.isArray(saved)) return [];

  const now = Date.now();
  const active: Story[] = [];
  for (const item of saved as unknown[]) {
    if (!item || typeof item !== "object") continue;
    const { id, created, image } = item as Partial<Story>;
    if (typeof created !== "number" || !Number.isFinite(created) || created > 8.64e15 ||
        created + storyLifetime <= now || typeof image !== "string" ||
        !image.startsWith("data:image/jpeg;base64,")) continue;
    active.push({ id: typeof id === "string" ? id : String(created), created, image });
  }

  if (active.length !== saved.length) {
    try {
      writeStories(active);
    } catch {
      // Still show only unexpired stories when the browser blocks storage writes.
    }
  }
  return active.sort((a, b) => b.created - a.created);
}

export async function encodePhoto(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const photo = new Image();
    photo.src = url;
    await photo.decode();
    const width = photo.naturalWidth;
    const height = photo.naturalHeight;
    const scale = Math.min(1, 1080 / width, 1920 / height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));

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
