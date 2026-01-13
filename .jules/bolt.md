## 2024-05-23 - Jikan API N+1 Request Pattern
**Learning:** The Jikan API `/top/anime` endpoint (and potentially others) includes detailed fields like `trailer` in the list response.
**Action:** Always check the initial list response for desired data before implementing secondary "detail" fetches for every item in a list. Avoid N+1 fetch patterns with Jikan API.
