# AnyThingAI Assignment – Frontend (React + Vite + Axios)

Simple React UI built using **Vite** to interact with the backend APIs.

## 🚀 Features

* User Registration (with role `user` or `admin`)
* User Login (JWT stored in `localStorage`)
* Protected Dashboard (requires authentication)
* CRUD operations for **Tasks**
* Displays success/error messages based on API responses
* Axios instance with automatic token attachment

---

## 📁 Project Structure

```
frontend/
 ├── src/
 │    ├── api/axios.js
 │    ├── components/
 │    │      ├── Login.jsx
 │    │      ├── Register.jsx
 │    │      └── TasksDashboard.jsx
 │    ├── App.jsx
 │    └── main.jsx
 ├── public/
 ├── index.html
 └── vite.config.js
```

---

## 🔧 Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create a `.env` file to configure the API URL:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

3. Start the Vite dev server:

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

> ⚠️ Ensure your backend server is running at the URL configured in `VITE_API_URL`.

---

## 🔗 API Integration

All Axios requests use a centralized Axios instance (`src/api/axios.js`).

This instance:

* Uses `VITE_API_URL` as the base URL
* Automatically attaches `Authorization: Bearer <token>` if present

---

## 📝 Notes

* Make sure **CORS** is enabled in your backend (it is already configured in your setup).
* When deployed, simply update the `VITE_API_URL` environment variable.

---

