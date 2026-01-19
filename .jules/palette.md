## 2024-05-23 - Accessibility Patterns
**Learning:** Icon-only buttons (like Play or Scroll-to-top) are a common pattern here but often miss `aria-label`, making them inaccessible.
**Action:** Always verify `aria-label` presence on icon-only buttons during code review.

## 2024-05-23 - Interactive Overlays
**Learning:** Buttons overlaying other content (like video players) need careful state management. If the button is removed when the content plays, the ARIA label should reflect the initial action (e.g., "Play trailer") rather than a toggle state that becomes inaccessible.
**Action:** Use static labels for one-way transition buttons.
