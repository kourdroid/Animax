## 2024-05-23 - Accessibility Improvements
**Learning:** Icon-only buttons (like "Scroll to Top" or "Play") are completely invisible to screen readers without explicit `aria-label` attributes.
**Action:** Always add `aria-label` to buttons that rely solely on icons for meaning.

**Learning:** Loading indicators (spinners) need semantic markup to be announced by screen readers.
**Action:** Use `role="status"` on the spinner container and include a visually hidden text element (e.g., `<span className="sr-only">Loading...</span>`) to provide context.
