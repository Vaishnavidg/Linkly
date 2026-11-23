# Linkly – URL Shortener & Analytics Platform

Linkly is a full-stack URL shortening application that converts long URLs into short, shareable links and provides basic click analytics.

## 🚀 Features

- **URL Shortening:** Generate unique short URLs from long URLs.
- **URL Redirection:** Redirect users to the original URL using a short ID.
- **Link Analytics:** Track clicks on shortened URLs.
- **Authentication:** User registration, login, and logout.
- **Dashboard:** Manage shortened URLs and view total links, clicks, and active links.
- **Link Management:** Copy and delete shortened URLs.

## 🛠️ Tech Stack

| Category      | Technologies         |
| ------------- | -------------------- |
| Frontend      | React.js, TypeScript |
| UI            | Material UI (MUI)    |
| Routing       | React Router DOM     |
| Data Fetching | TanStack React Query |
| Backend       | Node.js, Express.js  |
| Database      | MongoDB, Mongoose    |
| API           | REST APIs            |

## 🏗️ Application Workflow

1. User enters a long URL.
2. Frontend sends a request to the backend.
3. Backend generates a unique short ID and stores the URL mapping in MongoDB.
4. Short URL is returned to the frontend.
5. When accessed, the backend retrieves the original URL and redirects the visitor.
6. Click analytics are updated and displayed on the dashboard.

## 🔌 Core API Functionality

- Generate shortened URLs.
- Redirect short URLs to original destinations.
- Retrieve link analytics.
- Fetch and delete user-specific URLs.
- Handle user authentication.

## 💡 Key Learnings

- Building and integrating REST APIs.
- Implementing authentication and protected routes.
- Designing reusable React components.
- Handling URL validation, redirection, and click tracking.
- Understanding frontend-backend communication and database operations.

## 🔮 Future Enhancements

- QR code generation.
- Custom short URL aliases.
- Advanced analytics and click history.
- Link expiration.
- Geographic and device-based analytics.

---

**Built with React.js, TypeScript, Material UI, Node.js, Express.js, and MongoDB.**

## Task for future

-> create authentication hook for authentication.
