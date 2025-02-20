import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

function RedditLane({ subreddit, onDelete }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}.json`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setPosts(data.data.children.map((post) => post.data));
    } catch (error) {
      setError("Failed to load subreddit");
      console.log(error.message);
    }
    setLoading(false);
  }, [subreddit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="lane">
      <div className="lane-header">
        <h2>{`r/${subreddit}`}</h2>
        <div className="lane-actions">
          <button className="refresh-btn" onClick={fetchPosts}>
            ↻
          </button>
          <button className="delete-btn" onClick={() => onDelete(subreddit)}>
            ✖
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <a
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="post-link"
              >
                <h3 className="post-title">
                  {post.title.length > 80
                    ? `${post.title.slice(0, 80)}...`
                    : post.title}
                </h3>
              </a>
              <div className="post-info">
                <p>Posted by {post.author}</p>
                <div className="post-meta">
                  <span>⬆ {post.ups}</span>
                  <span>💬 {post.num_comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

RedditLane.propTypes = {
  subreddit: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RedditLane;
