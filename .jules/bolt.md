## 2024-05-22 - Jikan API N+1 Optimization
**Learning:** The Jikan API's `/top/anime` endpoint (and likely others) includes `trailer.embed_url` in the primary response. The codebase was previously making a secondary fetch for each anime to get this specific field, resulting in a severe N+1 bottleneck (25+ extra requests per page).
**Action:** Always inspect the full JSON response of the primary fetch before implementing secondary fetches for details.
