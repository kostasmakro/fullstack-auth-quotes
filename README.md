# KM Labs – Full Stack Authentication & Quotes App

A full-stack web application built with:

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** SQLite
- **Authentication:** JWT stored in HttpOnly cookies
- **External API:** ZenQuotes

---

## 🚀 Features

- User registration (email + password)
- Secure password hashing using bcrypt
- Login & logout
- JWT authentication stored in HttpOnly cookies
- Protected routes
- Random quote fetching from ZenQuotes API
- Graceful fallback if external API fails
- Clean, consistent KM Labs UI design

---

## 🏗 Tech Stack

### Backend
- Node.js
- Express
- better-sqlite3
- bcrypt
- jsonwebtoken
- cookie-parser
- cors
- dotenv

### Frontend
- React (Vite)
- React Router
- Fetch API
- Vite proxy (to avoid CORS issues in development)

---

## 📂 Project Structure

fullstack-auth-quotes/
│
├── backend/
│ ├── routes/
│ ├── middleware/
│ ├── db.js
│ ├── crud.js
│ ├── index.js
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── vite.config.js
│ └── package.json
│
└── README.md

---

## ⚙️ Installation & Setup

## Backend Setup
cd backend
npm install

Create a .env file inside backend/:
PORT=3001
JWT_SECRET=your_random_secret_here
CLIENT_ORIGIN=http://localhost:5173

Generate a secure JWT secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Start the backend:
npm run dev

Runs at: http://localhost:3001

## 🌐 Frontend Setup
cd ../frontend
npm install
npm run dev

Runs at: http://localhost:5173

---

## 🔐 Authentication Flow

1.User registers → password is hashed using bcrypt.

2.User logs in → password is verified.

3.Backend generates a JWT.

4.JWT is stored in an HttpOnly cookie.

5.Protected routes verify JWT before returning data.

---

## 📡 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
POST	/auth/logout	Logout user
GET	/auth/me	Get current user
Quotes
Method	Endpoint	Description
GET	/quotes/random	Get a random quote (protected)

--- 

## 🛡 Security Practices

Passwords hashed with bcrypt

JWT signed with secret key

Tokens expire after 1 hour

Stored in HttpOnly cookies

Email uniqueness enforced in SQLite

Protected routes require authentication

---

## 📌 Future Improvements

Password strength validation

Refresh tokens

Rate limiting

Unit tests

Production deployment (Render / Railway / Vercel)

--

## 👤 Author

Kostas Makropoulos