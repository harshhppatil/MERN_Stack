# MERN Master — Full Stack Starter

A complete, ready-to-use MERN stack foundation with authentication built in. Clone this, add your own idea on top, and you have a full stack web application without writing auth from scratch.

Built with **MongoDB, Express, React, Node.js** using **pnpm**, **Vite**, **Tailwind CSS**, and **JWT httpOnly cookies**.

---

## What This Gives You Out of the Box

### Backend
- MongoDB connection via Mongoose
- User Register / Login / Logout / Get Me APIs
- JWT stored in httpOnly cookies (secure, browser JS cannot read it)
- `protect` middleware — lock any route behind authentication
- `adminOnly` middleware — restrict routes to admin users only
- Global error handler — clean JSON error responses always
- Input validation via `express-validator`
- Security headers via `helmet`
- CORS configured for Vite dev server
- Request logging via `morgan`

### Frontend
- Vite + React project, running on port 5173
- Tailwind CSS configured and working
- Axios instance pre-configured with credentials
- `AuthContext` — global auth state available everywhere
- `useAuth()` hook — get user, login, logout, register in one line
- `ProtectedRoute` component — auto-redirects to login if not authenticated
- Register page, Login page, Home page, Dashboard page
- Navbar — shows correct links based on auth state
- Spinner — loading state while checking auth

---

## Project Structure

```
mern-master/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 ← MongoDB connection
│   │   ├── controllers/
│   │   │   └── authController.js     ← Register, Login, Logout, GetMe
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     ← protect & adminOnly
│   │   │   └── errorHandler.js      ← Global error handler
│   │   ├── models/
│   │   │   └── User.js              ← Mongoose User schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        ← /api/auth/*
│   │   │   └── userRoutes.js        ← /api/users/*
│   │   └── utils/
│   │       └── generateToken.js     ← JWT helpers
│   ├── .env                         ← Your secrets (never commit)
│   ├── .env.example                 ← Template to copy
│   ├── .gitignore
│   ├── package.json
│   └── server.js                    ← Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js             ← Pre-configured axios instance
│   │   ├── components/
│   │   │   ├── Navbar.jsx           ← Top navigation bar
│   │   │   ├── ProtectedRoute.jsx   ← Auth guard for pages
│   │   │   └── Spinner.jsx          ← Loading spinner
│   │   ├── context/
│   │   │   └── AuthContext.jsx      ← Global auth state
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx        ← Protected page
│   │   ├── App.jsx                  ← Routes defined here
│   │   ├── main.jsx                 ← React entry point
│   │   └── index.css                ← Tailwind import
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── README.md                        ← This file
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB object modelling |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT token generation and verification |
| cookie-parser | Reading httpOnly cookies on server |
| express-validator | Input validation |
| helmet | Security HTTP headers |
| morgan | HTTP request logger |
| dotenv | Environment variable management |
| nodemon | Auto-restart server in development |
| pnpm | Fast, efficient package manager |
| React 18 | Frontend UI library |
| Vite | Frontend build tool (fast!) |
| Tailwind CSS | Utility-first CSS framework |
| Axios | HTTP client for API calls |
| React Router v6 | Client-side routing |

---

## Setup From Scratch

Follow these steps in exact order. You need two terminals open — one for backend, one for frontend.

### Prerequisites

Make sure you have these installed:
- Node.js (v18 or higher) — check with `node -v`
- pnpm — install with `npm install -g pnpm`
- MongoDB — either local install or a free MongoDB Atlas account

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-master.git
cd mern-master
```

**Important — change the remote to your own GitHub repo:**
```bash
git remote set-url origin https://github.com/your-username/your-project-name.git
```

---

### 2. Backend Setup

Open your first terminal and navigate to backend:

```bash
cd backend
```

Install dependencies:
```bash
pnpm install
```

Create your environment file:
```bash
cp .env.example .env
```

Open `.env` and fill in your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=paste_your_generated_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**MONGO_URI options:**

If using local MongoDB:
```
MONGO_URI=mongodb://localhost:27017/your-db-name
```

If using MongoDB Atlas (recommended for teams):
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your-db-name
```

**Generate your JWT_SECRET** — run this in terminal and copy the output:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the backend:
```bash
pnpm dev
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: localhost
```

Visit `http://localhost:5000/api/health` to confirm it is alive.

---

### 3. Frontend Setup

Open your second terminal and navigate to frontend:

```bash
cd frontend
```

Install dependencies:
```bash
pnpm install
```

Create your environment file:
```bash
cp .env.example .env
```

Your frontend `.env` only needs one line and it is already correct:
```env
VITE_API_URL=/api
```

Start the frontend:
```bash
pnpm dev
```

You should see:
```
VITE ready in Xms
➜  Local: http://localhost:5173/
```

Open `http://localhost:5173` in your browser. You will see the home page with Register and Login links.

---

### 4. Test Everything Works

Test in this order:

1. Click **Register** — create an account
2. You should be redirected to Dashboard automatically
3. Click **Logout**
4. Click **Login** — log back in
5. Try visiting `http://localhost:5173/dashboard` while logged out — you should be redirected to Login automatically

If all of that works, your setup is complete.

---

## API Routes Reference

All backend routes are available under `/api/`

| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/health` | Public | Server health check |
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Login, receives JWT cookie |
| POST | `/api/auth/logout` | Public | Clears JWT cookie |
| GET | `/api/auth/me` | Protected | Get logged-in user info |
| GET | `/api/users/` | Admin only | Get all users |

---

## How Authentication Works

```
User fills Register or Login form
           ↓
Frontend sends request to backend via Axios
           ↓
Backend validates input and checks credentials
           ↓
Backend creates a JWT token signed with JWT_SECRET
           ↓
Token is stored in an httpOnly cookie in the browser
(JavaScript in browser cannot read this — it is secure)
           ↓
Every future request automatically sends the cookie
           ↓
Backend reads the cookie, verifies the token, identifies the user
           ↓
Protected routes allow access — unauthenticated requests are rejected with 401
```

---

## How to Add Your Own Features

This is where you build your unique idea. The master repo handles authentication — you just add your own stuff on top. Follow this exact pattern every time.

### Backend — Add a New Feature

**Step 1 — Create your Model** in `backend/src/models/`

Example for a Task Manager app:
```js
// backend/src/models/Task.js
import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',      // links each task to the user who created it
      required: true,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)
export default Task
```

**Step 2 — Create your Controller** in `backend/src/controllers/`

```js
// backend/src/controllers/taskController.js
import Task from '../models/Task.js'

// Get all tasks for logged-in user
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

// Create a task
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body
    const task = await Task.create({
      title,
      description,
      user: req.user._id,   // req.user is available from protect middleware
    })
    res.status(201).json(task)
  } catch (error) {
    next(error)
  }
}

// Update a task
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
  } catch (error) {
    next(error)
  }
}

// Delete a task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json({ message: 'Task deleted' })
  } catch (error) {
    next(error)
  }
}
```

**Step 3 — Create your Route file** in `backend/src/routes/`

```js
// backend/src/routes/taskRoutes.js
import express from 'express'
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// All task routes are protected — user must be logged in
router.get('/', protect, getTasks)
router.post('/', protect, createTask)
router.put('/:id', protect, updateTask)
router.delete('/:id', protect, deleteTask)

export default router
```

**Step 4 — Register in server.js**

Open `backend/server.js` and add two lines:

```js
// Add with other imports at the top
import taskRoutes from './src/routes/taskRoutes.js'

// Add with other app.use() lines
app.use('/api/tasks', taskRoutes)
```

Your new API is now live at `http://localhost:5000/api/tasks`

---

### Frontend — Add a New Feature

**Step 1 — Create a new page** in `frontend/src/pages/`

```jsx
// frontend/src/pages/Tasks.jsx
import { useEffect, useState } from 'react'
import api from '../api/axios.js'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  // Fetch all tasks when page loads
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await api.get('/tasks')
      setTasks(data)
    }
    fetchTasks()
  }, [])

  // Create a new task
  const handleCreate = async (e) => {
    e.preventDefault()
    const { data } = await api.post('/tasks', { title })
    setTasks([...tasks, data])
    setTitle('')
  }

  // Delete a task
  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`)
    setTasks(tasks.filter(t => t._id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map(task => (
          <li
            key={task._id}
            className="flex items-center justify-between bg-white border border-gray-200 rounded px-4 py-3"
          >
            <span className="text-sm text-gray-700">{task.title}</span>
            <button
              onClick={() => handleDelete(task._id)}
              className="text-red-500 text-xs hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks
```

**Step 2 — Add route in App.jsx**

Open `frontend/src/App.jsx` and add your new page:

```jsx
// Add import at top
import Tasks from './pages/Tasks.jsx'

// Add route inside <Routes>
<Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <Tasks />
    </ProtectedRoute>
  }
/>
```

**Step 3 — Add link in Navbar**

Open `frontend/src/components/Navbar.jsx` and add a link inside the logged-in section:

```jsx
<Link to="/tasks" className="text-sm text-gray-700 hover:text-blue-600">
  Tasks
</Link>
```

That is it. Your feature is live on the frontend.

---

### Using the `useAuth` Hook

Inside any component or page, get auth info in one line:

```jsx
import { useAuth } from '../context/AuthContext.jsx'

const MyComponent = () => {
  const { user, login, logout, register, loading } = useAuth()

  // user       → the logged-in user object (null if not logged in)
  // loading    → true while checking if user is logged in on app load
  // login()    → call to log in
  // logout()   → call to log out
  // register() → call to register
}
```

---

### Using Axios for API Calls

The axios instance is pre-configured. Just import and use — cookies are sent automatically:

```jsx
import api from '../api/axios.js'

// GET
const { data } = await api.get('/tasks')

// POST
const { data } = await api.post('/tasks', { title: 'My task' })

// PUT
const { data } = await api.put(`/tasks/${id}`, { completed: true })

// DELETE
await api.delete(`/tasks/${id}`)
```

No need to set base URL, headers, or cookies manually — it is all handled.

---

## Customizing the User Model

Want extra fields in registration? Add them to `backend/src/models/User.js`:

```js
// Add any of these fields inside userSchema
phone:      { type: String },
bio:        { type: String },
avatar:     { type: String, default: '' },
age:        { type: Number },
address:    { type: String },
college:    { type: String },
department: { type: String },
```

Then send those fields from your Register page form. Mongoose saves them automatically.

---

## Customizing the Design

Every page is a plain React component with Tailwind classes. You can change anything freely:

- **Colors** — change `bg-blue-600` to any color like `bg-purple-600`, `bg-green-500` etc.
- **Layout** — rearrange components however you want
- **Fonts** — add Google Fonts link in `index.html`
- **New components** — create any new files in `src/components/`
- **Redesign pages** — rewrite any page completely, the logic inside stays the same

The only files you should not touch unless you know what you are doing:
- `src/context/AuthContext.jsx` — auth logic lives here
- `src/api/axios.js` — API config lives here
- `src/components/ProtectedRoute.jsx` — auth guard lives here

---

## Environment Variables Reference

### Backend `.env`

| Variable | Example | Description |
|---|---|---|
| PORT | 5000 | Port the server runs on |
| MONGO_URI | mongodb://localhost:27017/mydb | MongoDB connection string |
| JWT_SECRET | random64charstring | Secret key for signing tokens — never share |
| JWT_EXPIRES_IN | 7d | How long JWT tokens stay valid |
| NODE_ENV | development | Switches dev and production behaviour |
| CLIENT_URL | http://localhost:5173 | Frontend URL allowed by CORS |

### Frontend `.env`

| Variable | Example | Description |
|---|---|---|
| VITE_API_URL | /api | Base API path — proxied to backend by Vite |

---

## Running Both Servers

You need two terminals running at the same time:

**Terminal 1 — Backend:**
```bash
cd backend
pnpm dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
pnpm dev
```

Then open `http://localhost:5173` in your browser.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| `MongoDB connection failed` | Wrong MONGO_URI or MongoDB not running | Check `.env` and run `sudo systemctl start mongod` |
| `JWT_SECRET is undefined` | `.env` not created or not filled | Run `cp .env.example .env` and fill values |
| `Cannot find module` | Wrong filename casing — Linux is case-sensitive | Make sure filenames match imports exactly |
| `Route not found` | Wrong HTTP method used | Double check GET / POST / PUT / DELETE |
| `Not authorized, no token` | Hitting protected route without logging in | Login first — cookie is set automatically |
| `CORS error` | Frontend URL not matching CLIENT_URL | Make sure `CLIENT_URL=http://localhost:5173` in backend `.env` |
| `JSX syntax error in .js file` | File has JSX but wrong extension | Rename file from `.js` to `.jsx` |
| Blank page in browser | Import path wrong or file not found | Check browser console (F12) for exact error |

---

## Important Rules

- **Never commit `.env`** — it is in `.gitignore` already. Every person creates their own.
- **Never share your JWT_SECRET** — it is your server's private signing key.
- **Never commit `node_modules/`** — always run `pnpm install` after cloning.
- Always use `.jsx` extension for files that contain JSX (React components).
- Always import files with their correct extension — `.js` for plain JS, `.jsx` for React components.
- All async controller functions use `try/catch` and pass errors to `next(error)`.
- The Vite proxy forwards all `/api` requests to `http://localhost:5000` automatically — no need to write the full backend URL anywhere in frontend code.

---

## Adding a Feature — Quick Reference

Every new feature follows this same pattern every single time:

```
BACKEND
  1. backend/src/models/YourModel.js             ← define data structure
  2. backend/src/controllers/yourController.js   ← write the logic
  3. backend/src/routes/yourRoutes.js            ← define API endpoints
  4. backend/server.js                           ← register with app.use()

FRONTEND
  1. frontend/src/pages/YourPage.jsx             ← build the UI
  2. frontend/src/App.jsx                        ← add the route
  3. frontend/src/components/Navbar.jsx          ← add nav link (optional)
```

---

*Built for R.N.G. Patel Institute of Technology — Advanced Web Technologies (1CS403)*
