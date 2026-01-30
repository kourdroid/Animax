## 2026-01-27 - [N+1 API Fetch Pattern]
**Learning:** The application was making redundant N+1 API calls to fetch trailer data for every anime item in lists, despite the data being available in the initial list response. This caused severe performance bottlenecks and potential rate limiting.
**Action:** Always verify if the initial API response contains nested data (like trailers) before implementing secondary fetch loops. Use `curl` or `postman` to inspect full API responses.

## 2026-01-28 - [Hidden Data in List Endpoints]
**Learning:** The `top/characters` endpoint includes rich data like `nicknames` and `about` fields, rendering the subsequent N+1 fetches for each character redundant. The assumption that list endpoints are shallow led to 25 unnecessary requests per page load.
**Action:** Inspect the full payload of list endpoints using `curl` to identify available fields before implementing secondary fetch logic.
