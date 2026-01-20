# Bolt's Journal

## 2024-05-22 - Jikan API N+1 Fetching
**Learning:** The Jikan API `/top/anime` and `/seasons/upcoming` endpoints already include trailer data (`trailer.embed_url`), but the codebase was fetching each anime individually (`/anime/{id}/full`) to get this data. This caused massive N+1 fetching issues (25+ requests per page load).
**Action:** Always inspect the full response of list endpoints before assuming detail endpoints are needed. Batch or eliminate redundant requests.
