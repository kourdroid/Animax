## 2024-05-23 - N+1 API Calls on List Pages

**Learning:** The Jikan API's list endpoints (e.g., `/top/anime`, `/seasons/upcoming`) already include the `trailer.embed_url` in the response object. It is redundant and highly inefficient to iterate over the list and fetch individual anime details (`/anime/{id}/full`) just to get the trailer URL. This causes an N+1 performance bottleneck (e.g., 25 extra requests per page).

**Action:** Always inspect the full response of list endpoints before implementing secondary fetches for details. Use the data already available in the initial response to minimize network requests.
