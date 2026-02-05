## 2026-02-05 - Search Accessibility Patterns
**Learning:** Search interfaces require multiple accessibility considerations beyond just input labels. While `aria-label` fixes the input, dynamic updates (loading, no results) are invisible to screen readers without `role="status"` or `aria-live` regions.
**Action:** For all search interfaces, implement a triad of accessibility: Label the input, announce loading state, and announce results/empty state.
