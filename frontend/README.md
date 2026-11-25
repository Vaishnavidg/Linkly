# Linkly — Frontend

React + TypeScript + Vite + Material UI.

## Getting started

```bash
cp .env.example .env   # set VITE_BACKEND_API_URL
npm install
npm run dev
```

Scripts: `npm run dev`, `npm run build` (type-check + bundle), `npm run lint`, `npm run preview`.

## Structure

```
src/
  api/          Backend calls (config.ts = base URL, urls.ts, user.ts)
  components/
    auth/       Login and signup forms
    dashboard/  Sidebar, header, stat cards, create-link and my-links UI
  hooks/        useAuth, useUserUrls
  lib/          Pure helpers (url normalizing, link formatting, clipboard)
  pages/        Route-level screens (LinklyLanding, SignIn, SignUp, Dashboard)
  theme/        MUI theme (index.ts) and shared style tokens (tokens.ts)
  types/        Shared TypeScript types
  validators/   Zod form schemas
```
