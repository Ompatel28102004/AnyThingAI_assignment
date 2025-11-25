# 🚀 AnyThingAI Backend Developer (Intern) Assignment

This repository contains the **complete full-stack solution** for the AnyThingAI Backend Developer Internship assignment.
It includes a fully working **Node.js backend**, **React (Vite) frontend**, **JWT authentication**, and a **Postman collection** for testing.

---

# 📦 Project Overview

### ✅ Backend – Node.js + Express + MongoDB

* User Registration & Login
* Password hashing using **bcrypt**
* JWT Authentication
* Role-based access (`user`, `admin`)
* CRUD for **Tasks**
* API versioning (`/api/v1`)
* Centralized error handling
* MongoDB Atlas / Local MongoDB support

### ✅ Frontend – React + Vite + Axios

* Register & Login pages
* JWT stored in `localStorage`
* Protected Dashboard
* CRUD UI for Tasks
* Uses Axios instance with automatic token injection

### ✅ API Documentation

* Fully setup **Postman collection** included in the project root
* Contains all Auth & Task endpoints

---

# 📁 Project Structure

```
root/
 ├── backend/        # Node.js REST API
 ├── frontend/       # React + Vite UI
 ├── AnyThingAI-assignment-postman.json
 └── README.md       # This file
```

---

# ⚙️ Quick Start Guide

## 1️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update MONGO_URI etc.
npm run dev
```

Backend runs at → **[http://localhost:5000](http://localhost:5000)**

### Sample `.env`

```env
PORT=3000
MONGO_URI=mongodb+srv://<your-url>
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d
```

---

## 2️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → **[http://localhost:5173](http://localhost:5173)**

### Optional `.env`

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Make sure backend is running before starting the frontend.

---

# 🧩 Backend Features

### 🔐 Authentication

* Register **(POST /api/v1/auth/register)**
* Login **(POST /api/v1/auth/login)**
* JWT returned upon login
* Role stored inside token

### 👤 Role-Based Access

* `user` → can manage only their tasks
* `admin` → can view & manage **all** tasks

### 📝 Tasks CRUD

* **POST /api/v1/tasks** → create task
* **GET /api/v1/tasks** → all tasks (admin) / own tasks (user)
* **GET /api/v1/tasks/:id** → get single task
* **PUT /api/v1/tasks/:id** → update task
* **DELETE /api/v1/tasks/:id** → delete task

Each task includes **user name** using Mongoose `.populate()`.

---

# 🎨 Frontend Features

* Clean UI created using **React + Vite**
* Separate **Login** and **Register** components
* Uses **React Router** for navigation
* Condition-based routes (protected routes)
* Tasks dashboard with:

  * Create Task
  * Edit Task
  * Mark Completed
  * Delete Task
* Automatic JWT injection via Axios

---

# 📬 Postman Collection

A fully ready Postman file is included:

```
AnyThingAI-assignment-postman.json
```

Import this into Postman → set `baseUrl` and `token` variables → test endpoints.

---

# 📈 Scalability Notes

The project is designed to scale easily:

### 🏗 Architecture

* Clean modular folder structure
* API versioning `/api/v1`
* Separate controllers, routes, models, utils


