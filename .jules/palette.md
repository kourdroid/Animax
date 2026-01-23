## 2024-05-23 - Accessibility First Steps
**Learning:** Interactive elements like icon-only buttons and search inputs are missing `aria-label` attributes, making them inaccessible to screen reader users.
**Action:** Always verify that buttons without text content and form inputs have accessible names (via `aria-label`, `aria-labelledby`, or associated `<label>` elements).
