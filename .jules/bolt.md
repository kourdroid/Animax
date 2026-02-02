## 2026-01-27 - [N+1 API Fetch Pattern]
**Learning:** The application was making redundant N+1 API calls to fetch trailer data for every anime item in lists, despite the data being available in the initial list response. This caused severe performance bottlenecks and potential rate limiting.
**Action:** Always verify if the initial API response contains nested data (like trailers) before implementing secondary fetch loops. Use `curl` or `postman` to inspect full API responses.

## 2026-01-27 - [Image Optimization with Next.js]
**Learning:** Replacing `<img>` with `next/image` in a Next.js app provides significant performance benefits (lazy loading, resizing), but requires `next.config.js` to whitelist external domains. Verification with Playwright requires mocking the API response to avoid rate limits and ensuring the image source is reachable or allowed.
**Action:** When optimizing images, always check `next.config.js` for `remotePatterns` and use Playwright with `page.route` to mock API responses for stable verification.
