## 2024-05-22 - N+1 Fetch Elimination
**Learning:** The Jikan API `/top/anime` endpoint includes nested fields like `trailer`, making subsequent requests for full details redundant. Always verify API response schemas before implementing N+1 fetch patterns.
**Action:** Check API documentation or sample responses for nested data before implementing detailed fetch loops.
