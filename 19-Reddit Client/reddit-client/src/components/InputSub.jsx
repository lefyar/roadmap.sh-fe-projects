import { useState, useEffect } from "react";
import RedditLane from "./RedditLane";
import { DEMO_LANES, feedUrl } from "../feed";

const STORAGE_KEY = "subreddits";
const VALID_NAME = /^\w{1,21}$/;

function loadSubreddits() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return [];
    return [...new Set(saved.filter(name => typeof name === "string" && VALID_NAME.test(name))
      .map(name => name.toLowerCase()))];
  } catch {
    return [];
  }
}

export default function InputSub() {
  const [subreddits, setSubreddits] = useState(loadSubreddits);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [storageNotice, setStorageNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subreddits));
    } catch {
      setStorageNotice("Browser storage is unavailable. Lanes will last for this session.");
    }
  }, [subreddits]);

  const addSubreddit = (event) => {
    event.preventDefault();
    const name = input.trim().replace(/^r\//i, "").toLowerCase();
    if (!VALID_NAME.test(name)) {
      setError("Enter a subreddit name using letters, numbers, or underscores.");
      return;
    }
    if (subreddits.some((sub) => sub.toLowerCase() === name)) {
      setError("That subreddit already has a lane.");
      return;
    }
    setSubreddits((prev) => [...prev, name]);
    setInput("");
    setError("");
  };

  const removeSubreddit = (subreddit) => {
    setSubreddits((prev) => prev.filter((sub) => sub !== subreddit));
  };

  return (
    <main className="app">
      <h1>Multi-Lane Reddit Client</h1>
      <p>{feedUrl ? "Add subreddits to build your reader." : "Demo mode uses sample posts. Open a subreddit on Reddit to see its live feed."}</p>
      <form className="input-container" onSubmit={addSubreddit}>
        <label htmlFor="subreddit">Subreddit</label>
        <input
          id="subreddit"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. r/webdev"
          required
        />
        <button className="add-btn" type="submit">
          Add lane
        </button>
      </form>
      {error && <p role="alert" className="error">{error}</p>}
      {storageNotice && <p role="status">{storageNotice}</p>}
      {!feedUrl && subreddits.length === 0 && <button className="add-btn" onClick={() => setSubreddits(Object.keys(DEMO_LANES))}>
        Add demo lanes
      </button>}
      <div className="lanes">
        {subreddits.map((sub) => (
          <RedditLane key={sub} subreddit={sub} onDelete={removeSubreddit} />
        ))}
      </div>
    </main>
  );
}
