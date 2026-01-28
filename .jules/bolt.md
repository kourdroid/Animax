## 2026-01-27 - [N+1 API Fetch Pattern]
**Learning:** The application was making redundant N+1 API calls to fetch trailer data for every anime item in lists, despite the data being available in the initial list response. This caused severe performance bottlenecks and potential rate limiting.
**Action:** Always verify if the initial API response contains nested data (like trailers) before implementing secondary fetch loops. Use `curl` or `postman` to inspect full API responses.

## 2026-01-28 - [List Item Memoization & Image Optimization]
**Learning:** Rendering large lists with inline mapping functions prevents React from optimizing re-renders, causing the entire list to update when parent state changes. Extracting list items to memoized components ensures only affected items re-render. Additionally, using standard `<img>` tags in long lists negatively impacts LCP; `next/image` handles optimization automatically.
**Action:** When building lists where items have interactive state (like toggles), always extract the item to a memoized component (`React.memo`) and use `useCallback` for event handlers passed from the parent.
