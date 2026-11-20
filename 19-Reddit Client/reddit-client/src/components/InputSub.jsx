import { useState, useEffect } from "react";
import RedditLane from "./RedditLane";

function InputSub() {
  const [subreddits, setSubreddits] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("subreddits"));
      return Array.isArray(saved) ? saved.filter(name => typeof name === "string" && /^\w{1,21}$/.test(name)) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("subreddits", JSON.stringify(subreddits));
    } catch {
      setError("Browser storage is unavailable. Lanes will last for this session.");
    }
  }, [subreddits]);

  const addSubreddit = (event) => {
    event.preventDefault();
    const name = input.trim().replace(/^r\//i, "").toLowerCase();
    if (!/^\w{1,21}$/.test(name)) {
      setError("Enter a subreddit name using letters, numbers, or underscores.");
      return;
    }
    if (subreddits.some(sub => sub.toLowerCase() === name)) {
      setError("Subreddit already exists");
      return;
    }
    setSubreddits([...subreddits, name]);
    setInput("");
    setError(null);
  };

  const removeSubreddit = (subreddit) => {
    setSubreddits(subreddits.filter((sub) => sub !== subreddit));
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

export default InputSub;
