## 2024-01-01 - [Accessibility Gaps in Interactive Elements]
**Learning:** Key interactive elements (icon-only buttons, loading spinners) consistently lack accessible attributes (`aria-label`, `role="status"`), reducing usability for screen reader users.
**Action:** When touching any component, explicitly verify `aria-label` for icon buttons and `role="status"` for loading states.
