# Multi-Lane Reddit Client

Build a browser-local collection of subreddit lanes. The Pages demo uses labeled sample posts, and every lane links to its subreddit.

[Open the demo](https://lefyar.github.io/roadmap.sh-fe-projects/19-Reddit%20Client/)

Run `npm ci` and `npm run dev` for a local Vite session.

## Live feeds

Reddit requires an approved OAuth integration. Point `VITE_REDDIT_FEED_URL` locally or the `REDDIT_FEED_URL` repository variable in Pages at a browser-accessible HTTPS feed endpoint. Keep Reddit credentials on that backend. [Reddit Data API requirements](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki)

The endpoint accepts `subreddit`, `limit`, and an optional `after` cursor as query parameters. It returns a listing with `data.children` containing `data` objects with `id`, `permalink`, `title`, `author`, `ups`, and `num_comments`. Return `data.after` as the next cursor, or `null` when the listing ends.
