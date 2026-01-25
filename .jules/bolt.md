## 2024-05-23 - N+1 Fetching for Trailers
**Learning:** The Jikan API list endpoints (`/top/anime`, `/seasons/upcoming`) already include `trailer.embed_url`. Fetching individual anime details for each item in a list just to get the trailer URL creates a massive N+1 bottleneck (25 extra requests per page), causing slow loading and potential rate limiting.
**Action:** Always inspect the full response of list endpoints before implementing secondary fetches. Use the embedded `trailer` data directly.
