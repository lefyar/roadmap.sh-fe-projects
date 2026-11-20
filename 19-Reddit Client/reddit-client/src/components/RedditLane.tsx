import { useState, useEffect, useCallback } from "react";

export type RedditPost = {
  id: string;
  permalink: string;
  title: string;
  author: string;
  ups: number;
  num_comments: number;
};

const PAGE_SIZE = 25;

async function fetchPosts(
  subreddit: string,
  cursor: string | null
): Promise<{ posts: RedditPost[]; hasMore: boolean }> {
  const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
  if (cursor) params.set("after", cursor);

  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}.json?${params.toString()}`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "multi-lane-reddit-client",
      },
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    throw new Error("subreddit-not-found");
  }
  if (!response.ok) {
    throw new Error("network-error");
  }

  const payload = await response.json();
  const children: { data: RedditPost }[] = payload?.data?.children ?? [];
  const posts: RedditPost[] = children.map((entry) => entry.data);

  return {
    posts: posts.sort((a, b) => b.ups - a.ups),
    hasMore: Boolean(payload?.data?.after),
  };
}

function normalizePosts(posts: RedditPost[], existing: RedditPost[]): RedditPost[] {
  const seen = new Set(existing.map((post) => post.id));
  return posts.filter((post) => !seen.has(post.id));
}

type RedditLaneProps = {
  subreddit: string;
  onDelete: (subreddit: string) => void;
};

export default function RedditLane({ subreddit, onDelete }: RedditLaneProps) {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchLane = useCallback(
    async (cursor: string | null) => {
      setLoading(true);
      setError(null);
      try {
        const { posts: fresh, hasMore: next } = await fetchPosts(subreddit, cursor);
        setPosts((prev) => {
          const merged = [...prev, ...normalizePosts(fresh, prev)];
          return merged.sort((a, b) => b.ups - a.ups);
        });
        setHasMore(next);
        if (fresh.length > 0) {
          setAfter(fresh[fresh.length - 1].id);
        }
      } catch (err) {
        setError(
          (err as Error)?.message === "subreddit-not-found"
            ? "Subreddit not found."
            : "Failed to load subreddit."
        );
      } finally {
        setLoading(false);
      }
    },
    [subreddit]
  );

  useEffect(() => {
    fetchLane(null);
  }, [fetchLane]);

  return (
    <div
      className="lane"
      onKeyDown={(event) => {
        if (event.key === "Escape") onDelete(subreddit);
      }}
    >
      <div className="lane-header">
        <h2>{`r/${subreddit}`}</h2>
        <div className="lane-actions">
          <button
            className="refresh-btn"
            onClick={() => fetchLane(after)}
            disabled={loading}
          >
            Refresh
          </button>
          <button
            className="load-more-btn"
            onClick={() => fetchLane(after)}
            disabled={!hasMore || loading}
          >
            Load more
          </button>
          <button className="delete-btn" onClick={() => onDelete(subreddit)}>
            Remove
          </button>
        </div>
      </div>
      {loading && !posts.length ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts in this subreddit yet.</p>
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
                  <span>{post.ups} votes</span>
                  <span>{post.num_comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
