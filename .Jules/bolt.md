## 2024-05-22 - [Avoid Redundant API Calls]
**Learning:** The Jikan API `/top/anime` endpoint already includes `trailer` data, but the previous implementation was fetching `/anime/{id}/full` for every item to get the same data. This caused an N+1 problem.
**Action:** always inspect the full API response of list endpoints before implementing secondary fetches for details. Use `curl` or browser tools to verify data availability.
