# OctoFit Tracker frontend

The presentation tier is a React 19 and Vite application. It uses the backend
API on port 8000 and React Router for navigation.

## Configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then calls `https://your-codespace-name-8000.app.github.dev`.
When `VITE_CODESPACE_NAME` is not set, the app safely falls back to
`http://localhost:8000`.

## Development

```bash
npm run dev
```
