# 2024-05-23 - Accessibility Improvements
**Learning:** Loading spinners and icon-only buttons were major accessibility gaps. Adding `role="status"` and `aria-label` provides immediate context to screen reader users without visual clutter.
**Action:** Always check interactive elements for `aria-label` if they lack visible text. Ensure loading states announce themselves.
