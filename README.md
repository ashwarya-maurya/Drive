<h1 align="center">Drive - Personal Cloud Storage</h1>

<p align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/EJS-8A2BE2?style=for-the-badge" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

---

## 🟦 Overview

Drive is a full-stack server-rendered cloud file management system inspired by Google Drive. It is built using **Node.js, Express, and EJS templates**, allowing users to upload, manage, download, and view files securely with authentication and cloud storage integration using Supabase.

### Highlights

* Login & Signup authentication system
* Protected dashboard after login
* Server-side rendered UI using EJS
* File upload & download in cloud
* Drag & Drop upload support
* Supabase cloud storage integration
* Fast and lightweight web application

---

## 🟩 Tech Stack

* **Backend:** Node.js, Express.js
* **View Engine:** EJS (Embedded JavaScript Templates)
* **Database:** MongoDB
* **Cloud Storage:** Supabase Storage
* **Authentication:** JWT / Session-based auth
* **Styling:** Tailwind CSS

---

## 🟨 Features

### 🔐 Authentication System

* User login page (EJS rendered)
* User signup page (EJS rendered)
* Protected dashboard access after authentication
* Session handling using JWT / cookies

### 📁 File Management

* Upload files (images, documents, videos, etc.)
* Drag & Drop file upload support
* View uploaded files on dashboard
* Download uploaded files anytime

### ☁️ Cloud Integration (Supabase)

* Files stored securely using Supabase Storage
* Fast CDN-based file delivery
* Secure bucket-based access control
* Automatic file URL generation

### 📊 Dashboard

* Server-rendered dashboard using EJS
* Displays all uploaded files
* Simple and responsive UI
* File preview system
* Easy navigation between upload, view, and download actions

---

## 🟪 Pages

* `/user/login` → Login Page
* `/user/register` → Signup Page
* `/home` → Main file management dashboard

---

## 🟧 Project Structure

```plaintext
📦 Drive
├── views
│   ├── login.ejs
│   ├── register.ejs
│   └── home.ejs
│
├── routes
├── models
├── middleware
├── config
├── app.js
└── README.md
```

---

## 🟫 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/ashwarya-maurya/Drive.git
cd Drive
```

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_secret_key
```

---

### 4. Run Project

```bash
npm run dev
```

---
