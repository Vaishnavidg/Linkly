# Linkly — Backend

Node.js + Express + TypeScript + MongoDB (Mongoose).

## Getting started

```bash
cp .env.example .env   # fill in MONGO_URI (and JWT_SECRET)
npm install
npm run dev            # tsx watch
```

Scripts: `npm run dev`, `npm run build`, `npm start` (runs `dist/`), `npm run typecheck`.

## Structure

```
src/
  server.ts        Entry point: validates env, connects to MongoDB, starts listening
  app.ts           Express app: CORS, body parsing, routes, error handling
  config/          env.ts (typed env vars), database.ts (Mongo connection)
  routes/          URL paths -> middleware -> controller (index.ts mounts them)
  controllers/     HTTP layer: read the request, call a service, send the response
  services/        Business logic and database access
  models/          Mongoose schemas
  middleware/      auth (JWT), validate (Zod), error handling
  validators/      Zod schemas for request bodies
  utils/           jwt, url normalising, pagination, HttpError
  types/           Shared TypeScript types
```

Request flow: `Route -> Middleware (auth / validation) -> Controller -> Service -> Model`.
Services throw `HttpError`; the error middleware turns it into a JSON response.

## API

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/user/signup` | – | Create an account, returns a JWT |
| POST | `/user/login` | – | Log in, returns a JWT |
| GET | `/user/me` | Bearer | Current user |
| POST | `/urls` | – | Create an anonymous short URL |
| POST | `/url` | Bearer | Create a short URL owned by the user |
| GET | `/user-urls?page=&limit=` | Bearer | The user's URLs (paginated, newest first) |
| GET | `/url/analytics/:shortId` | – | Click count and visit history |
| GET | `/:shortId` | – | Redirect to the original URL (records a visit) |

Errors are always `{ "message": string }` (validation errors also include `errors[]`).
