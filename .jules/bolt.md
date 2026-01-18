## 2024-05-22 - Jikan API N+1 Fetching
**Learning:** The Jikan API includes `trailer.embed_url` in list endpoints (like `/top/anime` and `/seasons/upcoming`). There is no need to make a subsequent request to `/anime/{id}/full` for each item to get the trailer.
**Action:** Always check the initial API response schema for required fields before implementing secondary fetches. Avoid N+1 fetch patterns with Jikan API.
