export const feedUrl = import.meta.env.VITE_REDDIT_FEED_URL;

export const DEMO_LANES = {
  webdev: [
    { id: "wd-1", title: "How do you organize CSS in a small project?", ups: 42, num_comments: 9 },
    { id: "wd-2", title: "What do you check before shipping a new website?", ups: 26, num_comments: 7 },
  ],
  javascript: [
    { id: "js-1", title: "When do you use a Map instead of an object?", ups: 51, num_comments: 12 },
    { id: "js-2", title: "What's your approach to debugging async code?", ups: 19, num_comments: 5 },
  ],
  css: [
    { id: "css-1", title: "Show us a layout you built with CSS Grid", ups: 30, num_comments: 7 },
    { id: "css-2", title: "When are container queries useful?", ups: 18, num_comments: 4 },
  ],
};

export async function fetchPosts(subreddit, cursor, signal) {
  const url = new URL(feedUrl, window.location.href);
  url.searchParams.set("subreddit", subreddit);
  url.searchParams.set("limit", "25");
  if (cursor) url.searchParams.set("after", cursor);
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
  });
  if (response.status === 404) throw new Error("Subreddit not found.");
  if (!response.ok) throw new Error("Could not load this feed. Try refreshing the lane.");

  const { data } = await response.json();
  if (!Array.isArray(data?.children)) throw new Error("The feed returned an invalid response.");
  return {
    posts: data.children.map(({ data: post }) => post).filter(post =>
      typeof post?.id === "string" && typeof post.title === "string" &&
      /^\/r\/[\w]+\/comments\/[\w]+(?:\/|$)/.test(post.permalink)),
    after: typeof data.after === "string" ? data.after : null,
  };
}
