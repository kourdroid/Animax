## 2024-05-24 - Infinite Scroll State Management
**Learning:** Managing state for infinite scroll where data needs to be deduplicated against an ever-growing list can cause `useEffect` dependency cycles if the "fetched list" is used as a filter dependency.
**Action:** Use `useRef` to track set of fetched IDs (or similar metadata) that is only needed for logic/filtering and not for rendering directly. This allows accessing the current value inside `useCallback` without adding it to the dependency array, preventing infinite re-fetch loops while maintaining data integrity.

## 2024-05-24 - Accessible Interactive Overlays
**Learning:** When overlaying interactive elements (like a "Play Trailer" button) over other content (like a card link), ensuring accessibility requires careful labeling. The button needs a clear `aria-label` because it often has no text or its icon is purely visual.
**Action:** Always provide dynamic `aria-label`s for context-dependent actions (e.g., "Play trailer for [Anime Title]") and ensure decorative icons are hidden (`aria-hidden="true"`).
