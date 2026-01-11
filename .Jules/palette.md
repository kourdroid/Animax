## 2024-05-23 - Accessibility Improvements on Home Page
**Learning:** Icon-only buttons (like scroll-to-top and play) are common in this design system but often miss `aria-label`, making them invisible to screen readers.
**Action:** Always check for `aria-label` when using icon libraries like `react-icons` inside buttons. Add `role="status"` to loading spinners for better state communication.
