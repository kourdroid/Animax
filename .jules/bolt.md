## 2024-05-22 - Frontend N+1 Fetch Pattern
**Learning:** The application was performing N+1 API calls for list views (fetching list, then fetching details for each item to get one field). This drastically degraded performance and hit API rate limits.
**Action:** Always check if the initial list endpoint provides the necessary data before implementing secondary detailed fetches. If not, consider if the data is critical for the list view or can be loaded on interaction.
