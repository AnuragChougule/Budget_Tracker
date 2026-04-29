# MERN Expense Tracker

Full-stack Expense Tracker built with MongoDB Atlas, Express.js, React, and Node.js.

## Tech Stack

- Backend: Node.js, Express, Mongoose, JWT, bcryptjs
- Frontend: React (functional components), React Router, Axios, Recharts
- Database: MongoDB Atlas

## Project Structure

```text
Budget_Tracker/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    src/
      components/
      pages/
      services/
```

## Environment Setup

### Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Fill in real values:
   - `MONGO_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (long random string)
   - `CLIENT_URL` (frontend URL, default `http://localhost:3000`)

### Frontend

1. Copy `frontend/.env.example` to `frontend/.env`
2. Optionally set:
   - `REACT_APP_API_URL=http://localhost:5000`

## Install Dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run the App

### Start Backend (port 5000)

```bash
cd backend
npm run dev
```

### Start Frontend (port 3000)

```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Expenses (JWT protected)

- `POST /api/expenses` - add expense
- `GET /api/expenses` - list logged-in user's expenses
- `DELETE /api/expenses/:id` - delete one expense owned by user

## Features Implemented

- User registration and login with hashed passwords
- JWT token authentication and protected routes
- Expense add/list/delete APIs scoped by user
- React login/register flow with validation and redirects
- Dashboard with:
  - Add expense form
  - Category filter
  - Expense list and delete action
  - Dynamic category-wise pie chart
- Axios API layer with automatic JWT header injection
- Error and loading states for API operations
- Responsive and clean UI
