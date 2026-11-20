# 24-Hour Story Feature

I built this browser-only story viewer for the [advanced roadmap.sh challenge](https://roadmap.sh/projects/stories-feature). Use **Add story** to post a photo, then open its thumbnail to browse with the arrow keys, the Previous and Next buttons, or a swipe. You can delete a photo from the viewer at any time.

Images keep their aspect ratio, fit within 1080 × 1920 pixels, and are stored as base64 JPEGs in local storage. They expire after 24 hours, including while the page is open. When the page is closed, expired stories are cleared the next time you open it.

[Open the demo](https://lefyar-roadmap-fe-projects.vercel.app/24-Story%20Feature/)

Run `npm ci` and `npm run dev` for a local Vite session.
