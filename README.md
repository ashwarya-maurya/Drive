# Drive — Personal Cloud Storage

A web app that allows users to securely upload, manage and download files from cloud storage.
Built with Node.js and Express on the backend, MongoDB for user data, and Supabase for file storage.
Users can register, log in, and access their own private file storage from anywhere.

---

## Features

- User Registration & Login
- JWT Authentication
- Password Hashing with Bcrypt
- File Upload & Download via Supabase
- Protected Routes
- Clean Dark Theme UI

---

## Tech Stack

- Node.js, Express.js
- MongoDB, Mongoose
- Supabase Storage
- EJS, Tailwind CSS, Font Awesome

---

## Setup

### 1 — Clone the repository
```bash
git clone https://github.com/ashwarya-maurya/Drive.git
cd Drive
```

### 2 — Install dependencies
```bash
npm install
```

### 3 — Create a `.env` file
```env
MONGO_URI=your_mongodb_uri
JWT_KEY=your_jwt_secret_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

### 4 — Run
```bash
node app.js
```

### 5 — Open in browser
```
http://localhost:3000/user/register
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_KEY` | Secret key for JWT signing |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |