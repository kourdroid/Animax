## 2026-01-21 - Jikan API N+1 Bottleneck
**Learning:** Jikan API's `/top/characters` endpoint does not provide anime/manga counts, leading to a tempting N+1 fetch pattern (`/characters/{id}/full`) for every item. This causes severe performance degradation (25+ extra requests).
**Action:** When using Jikan API, always verify if "detail" fields (like counts) are critical. If not, omit them to avoid N+1 fetches. For lists, rely strictly on the list endpoint data.
