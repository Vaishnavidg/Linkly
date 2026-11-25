# Linkly — Project Instructions for Claude

> **Purpose:** This file is the working guide for AI-assisted development in Linkly. Read it before making changes. Prefer small, focused, production-minded changes that fit the existing codebase.

---

## 1. Project Overview

**Linkly** is a URL-shortening and link-analytics web application. Users can create short links, redirect visitors to the original URL, and view click/activity analytics. The app supports anonymous link creation and authenticated users who can manage their links from a dashboard.

### Main capabilities
- Create a short URL from a valid destination URL.
- Redirect a short-link ID to its original destination.
- Record visit/click history for analytics.
- Sign up, sign in, and sign out.
- JWT-protected user-specific endpoints.
- Anonymous shortening where the API supports it.
- Dashboard summary statistics and link-management actions.
- Copy short links, delete links, and view link activity.

**Do not claim a feature exists merely because it is listed here.** Check the current source before implementing or describing it; this document describes intended product scope.

---

## 2. Technology Stack

### Frontend
- React
- TypeScript
- Vite
- React Router (`react-router-dom`)
- Material UI (MUI) for UI components and styling
- React hooks for state and lifecycle
- Fetch or the existing HTTP client wrapper for API communication

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT-based authentication
- Zod (where already used) for input validation
- bcrypt (where already used) for password hashing

Do not add another framework, state-management library, validation library, or UI library without a clear need and approval/confirmation from the project owner.


## 3. Repository Structure and Boundaries

Inspect the actual repository structure before assuming paths. The project has historically used a frontend and backend folder, but their exact current contents may vary.

Expected separation:

- **Frontend:** UI, routing, forms, client-side validation, loading/error/empty states, and API calls.
- **Backend:** routes, controllers, services (if the existing architecture uses them), validation, auth middleware, models, database access, and centralized error handling.

Keep the existing folder structure and naming conventions. Do not reorganize folders, rename files, or introduce architecture changes as part of an unrelated feature.

### Backend request flow
Follow the existing pattern. Where the project uses a layered flow, keep responsibilities separated:

`Route → Middleware (validation/auth as needed) → Controller → Service/business logic → Model/Database`

- **Routes:** define HTTP methods and paths; attach middleware.
- **Controllers:** parse request context, call business logic, and return HTTP responses. Avoid embedding large business rules here.
- **Services:** contain reusable business logic when the existing codebase uses this layer.
- **Models:** define MongoDB/Mongoose schemas and persistence behavior.
- **Middleware:** authentication, validation, and request/error handling.

Do not create a service layer everywhere if the existing project does not use one consistently. Match the codebase first.


## 4. Coding Principles

- TypeScript first. Avoid `any`; use `unknown` and narrow types when appropriate.
- Keep functions and components small, readable, and focused.
- Prefer clear names over clever or overly abbreviated names.
- Reuse existing utilities, components, hooks, and patterns before adding new ones.
- Avoid duplicated logic, but do not over-engineer abstractions for one-off code.
- Do not leave dead code, debug logs, commented-out experiments, or unused imports.
- Do not suppress TypeScript errors with `@ts-ignore` or broad casts unless there is a documented reason.
- Do not change unrelated files or behavior while fixing a specific issue.
- Avoid adding dependencies unless they are necessary; explain why before adding one.
- Keep code formatted consistently with the repository's existing style.


## 5. Frontend Guidelines

### React
- Use function components and React hooks.
- Keep components focused; extract reusable UI only when it genuinely improves maintainability.
- Avoid unnecessary state. Derive values from existing state when possible.
- Avoid effect hooks for calculations that can be computed during render.
- Use stable and meaningful keys for mapped lists.
- Handle component loading, success, empty, and failure states.
- Avoid unnecessary re-renders; use memoization only when profiling or complexity justifies it.

### Routing
- Use the project's existing `react-router-dom` setup.
- Preserve existing route paths and navigation behavior unless the task explicitly requests route changes.
- Do not replace the router or add another routing library.

### UI and design system
- Use Material UI components for UI where the project is using MUI.
- Maintain Linkly's visual identity: clean, modern SaaS UI, white/light surfaces, restrained gray text, and purple/violet accents.
- Use consistent spacing, typography, border radii, colors, hover/focus states, and responsive breakpoints.
- Prefer responsive layouts that work on mobile, tablet, and desktop.
- Avoid excessive gradients, shadows, decorative animations, or visual clutter.
- Use accessible labels, semantic structure, keyboard-friendly interactions, and visible focus states.
- Use existing theme/tokens when available; do not scatter hard-coded styles unnecessarily.
- Do not use fake dashboard metrics or fake user data in production UI. Mock data is acceptable only for clearly labeled previews, demos, or tests.

### Forms and UX
- Validate input before submitting and show useful, concise validation feedback.
- Disable submit actions while a request is pending where appropriate.
- Prevent accidental duplicate submissions.
- Show clear success/failure feedback (e.g. Snackbar/Alert if the app already uses MUI feedback components).
- Preserve entered form data when reasonable after a failed request.
- Never expose server stack traces or sensitive internal errors to users.

### API calls
- Use the existing API client/helper if one exists.
- Keep the backend base URL in the existing environment configuration; do not hard-code deployment URLs in components.
- Read environment variables through Vite's `import.meta.env` conventions (e.g. the existing `VITE_BACKEND_API_URL` setting).
- Handle non-2xx responses and JSON parsing errors safely.
- Do not assume a response is successful simply because `fetch()` resolved; inspect `response.ok` and the response body.
- Avoid duplicating API endpoint strings across many components if an existing API layer is available.

### Authentication on the frontend
- Follow the existing auth context/hook and token-storage pattern. Inspect it before modifying auth.
- Send the JWT using the backend's expected Authorization header format (typically `Authorization: Bearer <token>`), but verify current middleware and API contract.
- Do not store passwords or other credentials in local storage/session storage.
- Avoid logging JWTs, passwords, or private user data.
- Keep protected routes and auth-state behavior consistent with the current application.
- Do not alter token storage, login flow, or auth architecture while working on an unrelated UI task.


## 6. Backend Guidelines

### Express and TypeScript
- Use the existing Express setup and middleware ordering.
- Keep route handlers focused; use the project's existing controller/service structure.
- Type request inputs, route parameters, query parameters, and response shapes where practical.
- Validate untrusted input before business logic or database operations.
- Use async/await and handle rejected promises consistently.
- Avoid leaking implementation details in API error messages.

### Validation
- Validate request body, params, and query values (using the project's existing Zod validation pattern where present).
- Reject malformed inputs with a suitable 4xx response.
- Do not rely on frontend validation for security or correctness.
- Trim/normalize user inputs where appropriate, without silently changing URL meaning.

### HTTP/API conventions
- Keep REST conventions and current endpoint names stable unless the task explicitly asks for an API change.
- Use appropriate HTTP status codes and consistent response formats.
- Do not change the response contract without checking frontend usage and existing tests.
- Ensure redirects use the correct redirect status and destination handling.
- Treat destination URLs as untrusted input; allow only valid HTTP/HTTPS URLs unless the current product requirements explicitly permit more.
- Do not create open-redirect or unsafe redirect behavior beyond the intended short-link feature.

### Error handling
- Use the existing centralized error-handling approach if present.
- Do not silently swallow errors.
- Return safe, actionable error messages to the client and log server-side details appropriately.
- Do not send stack traces, database errors, secrets, or infrastructure details to clients.
- Ensure async controller errors reach the Express error handler.

### Security
- Never commit secrets, tokens, private keys, credentials, or `.env` contents.
- Keep secrets in environment variables and ensure `.env` files are gitignored.
- Hash passwords using the existing bcrypt implementation; never store plaintext passwords.
- Verify JWTs on protected endpoints and handle missing, malformed, and expired tokens.
- Enforce authorization at the backend: a user may access or delete only resources they are permitted to own.
- Avoid mass-assignment vulnerabilities: explicitly select/validate writable fields.
- Consider rate limiting for URL creation and authentication endpoints before exposing production traffic.
- Protect against XSS by not rendering untrusted content as raw HTML.
- Keep CORS origins explicit for deployed environments; do not use wildcard origins with credentialed requests.
- Do not change CORS settings blindly. Check the frontend's exact deployed Origin and preflight behavior.

### MongoDB and Mongoose
- Use the existing Mongoose models and schema conventions.
- Avoid unnecessary database queries; use projection/population carefully.
- Add indexes only when supported by query patterns and with consideration for uniqueness.
- Handle missing documents explicitly.
- Avoid unbounded arrays for analytics/history if the data could grow substantially; consider a scalable schema strategy before changing it.
- Use pagination for potentially large user-link lists.
- Never trust client-supplied user IDs for ownership checks; derive authenticated identity from verified server-side auth context.
- Be cautious when using `populate`; avoid returning sensitive user fields.


## 7. Linkly Domain Rules

- A short ID must be unique.
- Short-link creation must validate the destination URL.
- Redirect lookup must handle unknown short IDs cleanly (not found or the project's intended fallback).
- Record a visit/click only when the redirect behavior successfully reaches the intended flow, following the existing implementation.
- Analytics should derive counts from persisted data, not hard-coded values.
- Anonymous links must not accidentally be assigned to an authenticated user or vice versa.
- Logged-in link ownership must be enforced on read, delete, and analytics endpoints as applicable.
- Delete behavior should be explicit and consistent (e.g. not found vs forbidden) and must not permit deleting another user's link.
- If short IDs are generated randomly, handle collision/retry safely rather than assuming uniqueness without checking the database constraint.


## 8. Environment Variables and Deployment

- Never invent, print, or commit secret values.
- Read `.env.example` or existing config to identify required variables.
- Keep local, preview, and production configuration separate.
- Frontend environment variables exposed through Vite are public at build time; never put secrets in `VITE_*` variables.
- Verify the exact deployed frontend origin before editing backend CORS allowlists.
- Keep deployment configuration changes focused and explain what environment variable or dashboard setting must be updated.
- Do not assume a deployment has succeeded. Confirm build/deployment logs or a verified live request before saying it is deployed.


## 9. Testing and Verification

Before completing a task:
1. Inspect the affected files and existing conventions.
2. Make the smallest sensible change.
3. Run relevant lint/typecheck/build/test commands available in `package.json`.
4. If a command cannot be run, state that clearly and do not claim the change is verified.
5. For API changes, verify status codes, validation, success, failure, and auth/ownership paths where feasible.
6. For UI changes, verify responsive layout and loading/empty/error states when feasible.
7. Review the diff and ensure no unrelated changes or secrets were introduced.

Do not fabricate test results or claim commands passed if they were not executed.


## 10. API Contract and Compatibility

Before modifying an endpoint:
- Locate its route, controller, service (if any), model, validation, and middleware.
- Search frontend callers and check how response data is consumed.
- Preserve endpoint and response compatibility unless the task explicitly requires a breaking change.
- If an API contract must change, update all affected callers and types together.
- Document new endpoints or changed response fields in the project README/API notes if the repository has them.


## 11. Git and Change Discipline

- Do not run destructive commands (reset, force-push, delete branches, wipe data, drop collections) without explicit approval.
- Do not automatically commit, push, or deploy unless the user explicitly asks.
- Do not overwrite user changes.
- Before editing, inspect git status/diff when available.
- Keep each task focused and summarize changed files.


## 12. Working with Claude: Required Workflow

For each request, follow this process:

1. **Understand:** Restate the intended outcome briefly only when useful; identify constraints.
2. **Inspect:** Read the relevant files, package scripts, types, and existing implementation before editing.
3. **Plan:** For multi-file or risky tasks, provide a short plan before making changes.
4. **Implement:** Make the smallest complete change that fits existing architecture.
5. **Verify:** Run appropriate checks. If not possible, report what remains unverified.
6. **Report:** Summarize what changed, files touched, verification performed, and any follow-up needed.

### Before making changes, Claude must
- Avoid guessing the repository structure, endpoint paths, schema fields, response shapes, or package versions.
- Ask a concise clarification only if a critical requirement cannot be inferred from the code or user request.
- If the user says “only UI,” do not change backend behavior, API contracts, auth, database schemas, or unrelated files.
- If the user says “fix this bug,” reproduce/trace the bug from actual code/logs before proposing unrelated refactors.
- Never replace the whole project with a generated starter app when the task is a feature, fix, or redesign.


## 13. Definition of Done

A task is complete when:
- The requested change is implemented without unrelated modifications.
- Existing Linkly behavior and API contracts are preserved unless intentionally changed.
- Input validation, error handling, and authorization are considered where relevant.
- The UI is responsive and accessible where UI changes are involved.
- Appropriate checks have been run, or limitations are clearly reported.
- No secrets, fake production data, debug code, or unexplained dependencies were added.
- The final response clearly states what was changed and what was verified.


## 14. Product Context and URLs

Use these deployment details only when they are still valid; confirm them from environment/configuration before changing deployment or CORS settings.

- Backend deployment previously used: `https://linkly-galg.onrender.com`
- Frontend deployment previously used one of these Vercel aliases: `https://linkly-olive.vercel.app` or `https://linkly-live.vercel.app`
- These frontend aliases may differ by deployment. **Do not assume either is the current canonical Origin.** Verify the actual deployed URL before changing CORS.


## 15. How to Respond to the Project Owner

Keep explanations straightforward and practical.
- Explain unfamiliar technical decisions briefly and in simple language when asked.
- Prefer step-by-step debugging and concrete evidence (logs, request/response, code locations) over speculative fixes.
- For code changes, include the exact files changed and relevant commands to run.
- Mention trade-offs when there are meaningful alternatives.
- Do not overwhelm the owner with unrelated suggestions or an unnecessary rewrite.

---

**Primary rule:** Understand Linkly's current code before changing it. Preserve working features and architecture. Make targeted, secure, testable changes.
