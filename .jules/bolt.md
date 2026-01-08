## 2024-05-23 - API Response Inspection
**Learning:** Always verify the structure of the initial API response before assuming additional fetches are needed. In this case, Jikan API provides `trailer.embed_url` in the `/top/anime` list response, making the subsequent N+1 calls to `/anime/{id}/full` completely redundant.
**Action:** Inspect full API response objects in the browser console or with a script before implementing detail fetches.
