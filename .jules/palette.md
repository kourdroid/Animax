## 2024-05-23 - Overlay Interactivity & Link Routing
**Learning:** Full-size overlay buttons (like "Click to Play") can permanently block interaction with underlying content (like video iframes) if they don't hide or pass through events after activation.
**Action:** Ensure overlay toggle buttons either disappear after activation or are positioned to not cover the entire interactive area of the underlying component.

**Learning:** Using `.toString()` on IDs for `href` props (e.g., `href={id.toString()}`) creates relative links that break when accessed from non-root pages (creating `current/path/id` instead of `/id`).
**Action:** Always construct absolute paths for resource links (e.g., `href={`/${id}`}`) to ensure consistent navigation regardless of the current route.
