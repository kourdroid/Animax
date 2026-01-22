## 2024-05-22 - [Jikan API N+1 Trailers]
**Learning:** The Jikan API includes nested resource data (like `trailer.embed_url`) in list endpoints (e.g., `/top/anime`), eliminating the need for separate fetches. This common N+1 pattern was causing ~25 extra requests per page load.
**Action:** Always inspect the full JSON response of a list endpoint before implementing secondary fetches. Verify API capabilities with `curl` to avoid premature optimization/fetching.
