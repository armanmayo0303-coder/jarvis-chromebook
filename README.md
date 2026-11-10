# Backend setup

1. Install Node.js 18+ in a supported Linux environment or on a server.
2. `cd backend && npm install`
3. Copy `.env.example` to `.env`; add your own provider key.
4. `npm start`
5. Configure the frontend endpoint as `https://your-host/api/chat`.

For local development, serve frontend and backend behind the same origin or configure a deliberate CORS policy and HTTPS reverse proxy. This starter intentionally does not enable permissive CORS. Add authentication before exposing the endpoint publicly. Use a secrets manager in production; do not commit `.env`.

The chat endpoint integrates an OpenAI-compatible chat completion API. Optional ElevenLabs speech is available through `/api/speech`: set `ELEVENLABS_API_KEY` on the backend and enter your authorized Voice ID plus the backend `/api/chat` URL in frontend Settings. The frontend sends text and Voice ID; the API key remains server-side. The browser voice is used as fallback.
