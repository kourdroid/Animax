## 2024-05-23 - N+1 Fetches with Jikan API
**Learning:** Jikan API `/top/anime` endpoint already includes `trailer` data (including embed_url). Fetching individual anime details for trailers caused massive N+1 performance issues (25 extra requests per page) and likely hit rate limits.
**Action:** Always inspect the full JSON response of list endpoints before implementing detail fetches. Use `trailer.embed_url` directly from the list response.
