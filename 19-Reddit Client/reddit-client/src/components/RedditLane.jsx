import { useState, useEffect, useCallback, useRef } from "react";
import { DEMO_LANES, feedUrl, fetchPosts } from "../feed";

export default function RedditLane({ subreddit, onDelete }) {
  const [posts, setPosts] = useState(() => !feedUrl && Object.hasOwn(DEMO_LANES, subreddit)
    ? DEMO_LANES[subreddit] : []);
  const [after, setAfter] = useState(null);
  const [loading, setLoading] = useState(Boolean(feedUrl));
  const [error, setError] = useState("");
  const request = useRef(null);

  const fetchLane = useCallback(async (cursor = null) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError("");
    try {
      const { posts: fresh, after: next } = await fetchPosts(subreddit, cursor, controller.signal);
      if (controller.signal.aborted) return;
      setPosts(previous => [...new Map(
        [...(cursor ? previous : []), ...fresh].map(post => [post.id, post])
      ).values()].sort((a, b) => b.ups - a.ups));
      setAfter(next === cursor ? null : next);
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error.name === "Error" ? error.message : "Could not reach the feed. Try again.");
      }
    } finally {
      if (request.current === controller) setLoading(false);
    }
  }, [subreddit]);

  useEffect(() => {
    if (feedUrl) void fetchLane();
    return () => request.current?.abort();
  }, [fetchLane]);

  return (
    <section className="lane" aria-labelledby={`lane-${subreddit}`}>
      <div className="lane-header">
        <h2 id={`lane-${subreddit}`}>r/{subreddit}</h2>
        <div className="lane-actions">
          <a href={`https://www.reddit.com/r/${subreddit}/`}>Open on Reddit</a>
          <button className="delete-btn" aria-label={`Remove r/${subreddit}`} onClick={() => onDelete(subreddit)}>Remove</button>
        </div>
      </div>
      {feedUrl && <div className="lane-actions">
        <button className="refresh-btn" onClick={() => fetchLane()} disabled={loading}>Refresh</button>
        <button className="load-more-btn" onClick={() => fetchLane(after)} disabled={!after || loading}>Load more</button>
      </div>}
      {loading && <p role="status">Loading posts…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && posts.length === 0 && <p>{feedUrl ? "No posts to display." : "No sample posts for this lane."}</p>}
      {posts.length > 0 && <ul className="posts">
        {posts.map(post => <li key={post.id} className="post">
          <h3 className="post-title">
            {feedUrl ? <a className="post-link" href={`https://www.reddit.com${post.permalink}`}>{post.title}</a> : post.title}
          </h3>
          <div className="post-meta">
            {post.author && <span>Posted by {post.author}</span>}
            <span>{post.ups} votes</span>
            <span>{post.num_comments} comments</span>
          </div>
        </li>)}
      </ul>}
    </section>
  );
}
