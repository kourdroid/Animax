## 2024-05-23 - [Jikan API N+1 Optimization]
**Learning:** The Jikan API's `/top/anime` endpoint (and likely others) includes nested `trailer` data in the resource list.
**Action:** Always check the full response structure of list endpoints before implementing secondary fetches for details. This avoids expensive N+1 query patterns.
