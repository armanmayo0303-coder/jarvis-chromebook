# Troubleshooting

- **Install option missing:** use HTTPS, open the root page, ensure `manifest.json` and service worker load, then try Chrome's menu → Create shortcut.
- **Camera unavailable:** confirm HTTPS/localhost, check Chrome site permissions, close other camera apps, and reload.
- **No English voice:** install/enable a ChromeOS voice in accessibility/text-to-speech settings. Browser voices vary by device.
- **Speech recognition unavailable:** use text chat. Web Speech recognition is not supported consistently and may send audio to a browser service.
- **Offline page blank:** load once while online so the service worker can cache the app shell. Clear site data and reload if a stale cache persists.
- **Cloud chat errors:** check backend URL, HTTPS, server logs, rate limits, and server-side environment variables.
- **Slow performance:** close other tabs, choose 320×240 camera mode, and avoid optional vision libraries on this 2 GB device.
