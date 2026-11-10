# Smoke test checklist

Run in ChromeOS Chrome over HTTPS or localhost.

- [ ] Welcome screen and responsive dashboard load.
- [ ] Start and Continue reveal dashboard.
- [ ] Navigation switches among four views.
- [ ] Local demo chat labels responses as DEMO.
- [ ] Clear history clears messages.
- [ ] Camera prompts only after Activate Camera; Stop releases tracks.
- [ ] Push-to-talk reports unsupported browsers and recovers from recognition errors.
- [ ] English speech test and stop control work when system voices exist.
- [ ] Settings persist locally after reload.
- [ ] Service worker installs and app shell reloads offline after first visit.
- [ ] Missing backend key returns a clear 503 from backend.
- [ ] Test at 320px viewport and with reduced-motion preference.

This is a test plan, not a claim that every device-specific check has been executed. Hardware permission and offline-install tests must be run on the actual Chromebook.
