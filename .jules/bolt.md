## 2024-05-22 - Redundant N+1 API fetching on Home Page
**Learning:** The application was fetching full anime details for every item in the `top/anime` list just to get the trailer URL, creating a massive N+1 performance bottleneck. However, the Jikan API `top/anime` endpoint already includes the `trailer` object in its response.
**Action:** Always inspect the full response schema of list endpoints before assuming subsequent individual fetches are necessary. Reducing N requests to 1 significantly improves load time and reduces API rate limiting risks.
