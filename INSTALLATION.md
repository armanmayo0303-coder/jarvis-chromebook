# Chromebook installation

## Recommended: hosted PWA
1. Put the repository on GitHub.
2. In GitHub, open **Settings → Pages**.
3. Select deployment from the `main` branch and `/ (root)`, then save.
4. Wait for the HTTPS Pages URL to become available.
5. Open that URL in Chrome on the Chromebook.
6. Open Chrome's three-dot menu and choose **Install app** if offered. Some Chrome versions show **Create shortcut** instead.
7. Launch J.A.R.V.I.S. from the app launcher.

GitHub Pages hosts static files only. It does not silently install software, run a backend, or provide AI API credentials.

## Local preview
In the project folder run `python3 -m http.server 8000` in the Linux terminal, then open `http://localhost:8000`. Localhost is treated as a secure context for browser permissions in modern browsers.

## Backend
The backend is separate from GitHub Pages. Deploy `backend/` to a trusted Node.js host with HTTPS, set environment variables there, and enter its `/api/chat` URL in Settings.

## Camera and microphone
Grant browser permissions only after pressing the relevant module's activation button. Use the browser site controls to revoke permission later.
