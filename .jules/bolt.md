## 2026-01-27 - [N+1 API Fetch Pattern]
**Learning:** The application was making redundant N+1 API calls to fetch trailer data for every anime item in lists, despite the data being available in the initial list response. This caused severe performance bottlenecks and potential rate limiting.
**Action:** Always verify if the initial API response contains nested data (like trailers) before implementing secondary fetch loops. Use `curl` or `postman` to inspect full API responses.

## 2026-01-27 - [Missing Next.js Image Optimization]
**Learning:** The application was using native `<img>` tags in critical lists (like the Home page), missing out on Next.js automatic image optimization (lazy loading, resizing, WebP/AVIF).
**Action:** Always check for `next/image` usage in list views. Replace `<img>` with `<Image />` using `fill` and `sizes` for responsive performance.
