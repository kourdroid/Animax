## 2024-05-23 - [Invisible Overlays Block Media Interaction]
**Learning:** Placing a "Close" toggle as a full-size transparent overlay on top of active media (like a video iframe) effectively blocks all user interaction with the media controls (play, pause, volume), creating a frustrating experience.
**Action:** When designing media toggles, separate the "Play" state (which can be a full overlay) from the "Active/Close" state. The "Close" button should be a small, distinct element (e.g., top-right corner) that sits *above* the media but does not occlude the interactive area.
