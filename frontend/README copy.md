# Bajarangs Assignment – Frontend (React + Axios)

Simple React UI to interact with the backend APIs.

## Features

- Register new users (with role `user` or `admin`)
- Log in and store JWT in `localStorage`
- Access protected dashboard
- Perform CRUD operations on `Task` entity
- Show success/error messages from API responses

## Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create `.env` if you want to override API URL (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

3. Start the dev server:

```bash
npm start
```

App runs on `http://localhost:3000`.

Make sure the backend (`http://localhost:5000`) is running and CORS is enabled (it is, in the provided backend).
