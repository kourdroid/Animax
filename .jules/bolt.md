## 2026-01-27 - [N+1 API Fetch Pattern]
**Learning:** The application was making redundant N+1 API calls to fetch trailer data for every anime item in lists, despite the data being available in the initial list response. This caused severe performance bottlenecks and potential rate limiting.
**Action:** Always verify if the initial API response contains nested data (like trailers) before implementing secondary fetch loops. Use `curl` or `postman` to inspect full API responses.

## 2026-01-27 - [Next.js Image Optimization]
**Learning:** Native `<img>` tags on image-heavy pages (like infinite scroll lists) cause significant performance overhead. Switching to `next/image` with proper `fill` and `sizes` attributes drastically improves LCP and bandwidth usage, but requires `next.config.js` to whitelist external domains.
**Action:** Always verify `next.config.js` `remotePatterns` when implementing `next/image` for external sources. Use `fill` for responsive containers to maintain aspect ratio without layout shifts.
