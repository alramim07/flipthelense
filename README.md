# FlipTheLense — Full MERN Stack Application

A dynamic, cinematic video editor portfolio & Fiverr-style gig services platform built with MongoDB Atlas, Express.js, React 19, and Node.js.

---

## 🚀 Quick Start Guide

### 1. Backend Setup (`server/`)
```bash
cd server
npm install
```
- Open `server/.env` and insert your MongoDB Atlas URI:
  ```env
  PORT=5000
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/flipthelense?retryWrites=true&w=majority
  JWT_SECRET=flipthelense_super_secret_jwt_key_2026
  ```
- Run the backend:
  ```bash
  npm run dev
  ```
- Backend runs on `http://localhost:5000` with automatic seed data.

---

### 2. Frontend Setup (`client/`)
```bash
cd client
npm install
npm run dev
```
- Frontend will be accessible at: `http://localhost:5173`

---

## 📄 Key Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home Page** | Blueprint hero with hide/view video toggle, staggered 9:16 reels, about bio, process timeline, and portfolio |
| `/services/:slug` | **Service Gig Page** | Full Fiverr-style gig page with sticky sidebar pricing, packages comparison, reviews, and booking modal |
| `/admin` | **CMS Dashboard** | Dynamic editor to update hero stats, manage portfolio, and view client inquiries |

---

## 🗄️ MongoDB Atlas Setup Steps
1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free Shared Cluster (`M0 Free`).
3. Under **Database Access**, create a user (e.g. `admin` and generate a password).
4. Under **Network Access**, click **Add IP Address** -> Select **Allow Access from Anywhere (`0.0.0.0/0`)**.
5. Click **Connect** -> **Drivers** -> Copy the connection string.
6. Paste into `server/.env` under `MONGO_URI`.
