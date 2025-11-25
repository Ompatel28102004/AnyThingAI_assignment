# AnyThingAI Assignment – Backend (Node.js + Express + MongoDB)

This backend provides:

* User registration & login with **bcrypt password hashing** and **JWT authentication**
* **Role-based access control** (`user` vs `admin`)
* CRUD APIs for a `Task` entity
* API versioning using `/api/v1`
* Centralized error handling
* Postman collection for testing

## Tech Stack

* Node.js, Express
* MongoDB + Mongoose
* JWT for authentication
* Bcrypt for password hashing
* CORS

## Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create `.env` file based on `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb+srv://<your-url>
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d
```

3. Start the server:

```bash
npm run dev
# or
npm start
```

Server runs on `http://localhost:3000`.

Base path for APIs: `http://localhost:3000/api/v1`.

## API Endpoints (v1)

### Auth

* `POST /api/v1/auth/register` – register a new user
* `POST /api/v1/auth/login` – login and receive JWT

### Tasks (Protected)

All tasks routes require `Authorization: Bearer <token>`.

* `POST /api/v1/tasks` – create a task
* `GET /api/v1/tasks` – get tasks

  * If role = `user` → returns only their own tasks
  * If role = `admin` → returns **all** tasks
* `GET /api/v1/tasks/:id` – get a single task
* `PUT /api/v1/tasks/:id` – update a task
* `DELETE /api/v1/tasks/:id` – delete a task

## Security Practices

* Passwords hashed using bcrypt.
* JWT includes user ID and role.
* Role-based access ensures admins can manage everything.
* Manual validation implemented inside controllers.


