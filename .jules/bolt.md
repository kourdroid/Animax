## 2024-05-23 - API Response Over-fetching
**Learning:** Jikan API V4 endpoints often include rich nested data (like `trailer.embed_url` in `/top/anime`) that might traditionally require a secondary fetch in other REST architectures. The previous implementation was triggering N+1 requests unnecessarily.
**Action:** Always `curl` and inspect the full JSON payload of a list endpoint before writing code to fetch details for individual items.
