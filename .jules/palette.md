# Palette's Journal

## 2024-05-22 - [Interaction blocking overlays]
**Learning:** Placing a toggle button with `absolute inset-0` over an interactive element (like an iframe) completely blocks interaction with the underlying content. Users could open the trailer but not play/pause/control it.
**Action:** separate the "activation" overlay from the "deactivation" control. Use a clear "Play" overlay to start, then replace it with a small, unobtrusive "Close" button to allow full interaction with the content.
