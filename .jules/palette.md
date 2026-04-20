## 2024-05-23 - Accessibility Pattern for Loading Spinners
**Learning:** Visual-only loading spinners leave screen reader users in the dark, unaware that content is being fetched.
**Action:** Always wrap visual spinners in a container with `role="status"` and include a hidden `<span>` with text like "Loading..." (using `.sr-only`). Ensure the loading state is triggered immediately on fetch start to provide instant feedback.
