## 2024-05-23 - Accessible Loading States
**Learning:** Loading spinners often lack accessibility attributes, making them invisible to screen readers. This leaves users relying on assistive technology unaware that content is loading.
**Action:** Always wrap visual spinners in a container with `role="status"` and include a screen-reader-only text element (e.g., `<span className="sr-only">Loading...</span>`) to provide context.
