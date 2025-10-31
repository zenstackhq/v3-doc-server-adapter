# ZenStack V3 Quick Start Project

The project demonstrates a minimum TypeScript application that uses ZenStack with Sql.js (a WASM port of SQLite) and Express.js as a backend server.

## Setup

To run the project:

- `npm install`
- `npm run generate`
- `npm run dev`

The server will start on `http://localhost:3000`.

## API Endpoints

- `GET /` - Welcome message
- `GET /api/users` - Get all users with their posts
- `GET /api/posts` - Get all posts with author information
- `GET /api/posts/:id` - Get a specific post by ID with author information

## Example Usage

```bash
# Get all users
curl http://localhost:3000/api/users

# Get all posts
curl http://localhost:3000/api/posts

# Get a specific post
curl http://localhost:3000/api/posts/1
```
