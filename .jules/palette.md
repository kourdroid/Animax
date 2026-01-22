## 2024-05-22 - Icon-Only Button Accessibility Pattern
**Learning:** Several interactive elements (Scroll to Top, Video Trailer Toggle) are implemented as icon-only buttons without `aria-label` or `title` attributes, making them inaccessible to screen readers and keyboard users (missing focus styles).
**Action:** When creating or modifying icon-only buttons, always enforce:
1. `aria-label` describing the action.
2. `title` attribute for mouse hover tooltip.
3. Explicit `focus-visible` styles to ensure keyboard navigation visibility.
