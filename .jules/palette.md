## 2026-01-24 - Video Overlay Interaction Patterns
**Learning:** Full-size "toggle" overlays (inset-0) on video thumbnails prevent users from interacting with the video player controls (pause/volume) once the video starts.
**Action:** When implementing video toggles, switch from a full-overlay toggle to a dedicated "Close" button (e.g., top-right corner) once the video is active, leaving the video area interactive.
