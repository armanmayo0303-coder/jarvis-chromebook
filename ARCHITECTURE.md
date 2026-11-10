# Architecture and capability boundaries

The frontend is a dependency-free JavaScript ES module PWA. It uses CSS for the orb and avoids WebGL/canvas rendering. Camera access uses `getUserMedia` only after a click; tracks stop when the camera is stopped or the page unloads. Chat uses a local demo responder unless an HTTPS backend endpoint is configured.

## Browser security boundary
A website/PWA runs in a browser sandbox. It cannot arbitrarily control the ChromeOS desktop, type into unrelated apps, execute shell commands, or listen continuously in the background. A Linux companion could offer narrowly scoped automation within Linux, but it does not automatically gain control over the ChromeOS host UI. Any future automation should use explicit user approval, an allowlist of actions, and visible execution status.

## Offline and voice
The app shell and local demo chat can work after initial caching. Browser speech synthesis depends on installed system voices. Speech recognition is browser-dependent and may require a network service. This release does not include an always-on wake word or clap detector.

## Deferred modules
MediaPipe face/hand landmarks, wake-word detection, clap detection, and ElevenLabs synthesis are not included in this first build. They should be added only after measuring memory use on the target Chromebook and reviewing dependency/model licenses.
