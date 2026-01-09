## 2024-05-22 - Jikan API Data Redundancy
**Learning:** The Jikan API `/top/anime` endpoint (and likely others) includes full `trailer` objects with `embed_url`, making subsequent calls to `/anime/{id}/full` redundant for this data.
**Action:** Always check if the summary endpoint provides the necessary data before fetching detailed endpoints. This avoids N+1 request patterns and massive API overhead.
