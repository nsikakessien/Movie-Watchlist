# CINE TRACK BACKEND

A simple Express + Prisma backend for managing users, movies, and personal watchlists. It includes authentication, movie browsing, and a protected watchlist API.

## Features

- User registration and login
- JWT-based session handling via auth middleware
- Paginated movie listing
- Protected watchlist CRUD operations
- PostgreSQL database access with Prisma and `@prisma/adapter-pg`
- Request validation using Zod schemas

## Tech Stack

- Node.js
- Express
- Prisma
- PostgreSQL
- Zod
- bcryptjs
- jsonwebtoken
- dotenv
- nodemon (development)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database available

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root with the following value:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL connection details.

### Run the server

```bash
npm run dev
```

The app starts on port `5001` by default.

## Database

This project uses Prisma with the following main models:

- `User`
- `Movie`
- `WatchlistItem`

The schema includes a `WatchlistStatus` enum with values:

- `PLANNED`
- `WATCHING`
- `COMPLETED`
- `DROPPED`

### Seed data

If you have seed logic in `prisma/seed.js`, run:

```bash
npm run seed:movies
```

## API Endpoints

### Auth

- `POST /auth/register`
  - Register a new user
- `POST /auth/login`
  - Log in and receive an authentication token
- `POST /auth/logout`
  - Log out the current user

### Movies

- `GET /movies/`
  - Fetch paginated movie results

### Watchlist (authenticated)

- `GET /watchlist/`
  - Get the current userâ€™s watchlist
- `POST /watchlist/`
  - Add a movie to the watchlist
- `PUT /watchlist/:id`
  - Update a watchlist item
- `DELETE /watchlist/:id`
  - Remove a watchlist item

> Note: All `/watchlist` routes are protected by `authMiddleware`.

## Project Structure

- `src/`
  - `server.js` - Express entry point
  - `config/db.js` - Prisma/Postgres database connection
  - `controllers/` - Request handlers
  - `middleware/` - Auth and validation middleware
  - `routes/` - Route definitions
  - `validators/` - Zod request schemas
- `prisma/`
  - `schema.prisma` - Prisma data model
  - `seed.js` - Seed script

## Notes

- The app is configured as an ES module via `type: "module"` in `package.json`.
- Logging level for Prisma is enabled during development.
