## 2024-05-22 - Search Card Interactions
**Learning:** Users expect search result cards to be fully clickable, not just the text. Additionally, relative links in search results were resolving incorrectly (e.g., `/search_anime/123`), requiring absolute paths (`/123`) to function correctly with the app's routing structure.
**Action:** When implementing card-based lists, wrap the entire card content in the `Link` component and verify that `href` paths are absolute to ensure robust navigation and better usability.
