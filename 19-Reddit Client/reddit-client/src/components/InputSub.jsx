import { useState, useEffect } from "react";
import RedditLane from "./RedditLane";

function InputSub() {
  const [subreddits, setSubreddits] = useState(() => {
    return JSON.parse(localStorage.getItem("subreddits")) || [];
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("subreddits", JSON.stringify(subreddits));
  }, [subreddits]);

  const addSubreddit = () => {
    if (!input.trim()) return;
    if (subreddits.includes(input)) {
      setError("Subreddit already exists");
      return;
    }
    setSubreddits([...subreddits, input]);
    setInput("");
    setError(null);
  };

  const removeSubreddit = (subreddit) => {
    setSubreddits(subreddits.filter((sub) => sub !== subreddit));
  };

  return (
    <div className="app dark-theme">
      <h1>Multi-Lane Reddit Client</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter subreddit"
        />
        <button className="add-btn" onClick={addSubreddit}>
          +
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="lanes">
        {subreddits.map((sub) => (
          <RedditLane key={sub} subreddit={sub} onDelete={removeSubreddit} />
        ))}
      </div>
    </div>
  );
}

export default InputSub;
