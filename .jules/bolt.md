# Bolt's Journal

## 2024-02-09 - API Schema Verification
**Learning:** Standard API endpoints (like Jikan's `top/anime`) often provide nested data (like trailers) that prevents the need for N+1 fetches. Always verify the full response schema with `curl` or docs before assuming secondary fetches are needed.
**Action:** Manually inspect JSON responses for required fields before implementing item-by-item fetch loops.
