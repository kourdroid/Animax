## 2026-01-24 - Jikan API N+1 Optimization
**Learning:** Jikan API list endpoints (e.g., `/top/anime`, `/seasons/upcoming`) provide `trailer.embed_url` directly, rendering secondary fetch loops for trailer data redundant.
**Action:** Inspect full API response payloads for list endpoints to identify opportunities to eliminate N+1 fetch patterns.
