import { useState, useEffect, type FormEvent } from "react";
import RedditLane from "./RedditLane";

const STORAGE_KEY = "subreddits";
const VALID_NAME = /^\w{1,21}$/;

function loadSubreddits(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved)
      ? saved.filter(
          (name): name is string => typeof name === "string" && VALID_NAME.test(name)
        )
      : [];
  } catch {
    return [];
  }
}

export default function InputSub() {
  const [subreddits, setSubreddits] = useState<string[]>(loadSubreddits);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subreddits));
    } catch {
      setError("Browser storage is unavailable. Lanes will last for this session.");
    }
  }, [subreddits]);

  const addSubreddit = (event: FormEvent) => {
    event.preventDefault();
    const name = input.trim().replace(/^r\//i, "").toLowerCase();
    if (!VALID_NAME.test(name)) {
      setError("Enter a subreddit name using letters, numbers, or underscores.");
      return;
    }
    if (subreddits.some((sub) => sub.toLowerCase() === name)) {
      setError("Subreddit already exists");
      return;
    }
    setSubreddits((prev) => [...prev, name]);
    setInput("");
    setError(null);
  };

  const removeSubreddit = (subreddit: string) => {
    setSubreddits((prev) => prev.filter((sub) => sub !== subreddit));
  };

  return (
    <div className="app dark-theme">
      <h1>Multi-Lane Reddit Client</h1>
      <form className="input-container" onSubmit={addSubreddit}>
        <input
          aria-label="Subreddit name"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter subreddit"
        />
        <button className="add-btn" type="submit">
          Add lane
        </button>
      </form>
      {error && <p role="alert" className="error">{error}</p>}
      <div className="lanes">
        {subreddits.map((sub) => (
          <RedditLane key={sub} subreddit={sub} onDelete={removeSubreddit} />
        ))}
      </div>
    </div>
  );
}
