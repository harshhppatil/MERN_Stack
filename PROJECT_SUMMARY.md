# CinemaStack - Project Summary

## Overview
CinemaStack is a full-stack web application designed to act as a movie suggestion and tracking platform. It allows users to browse a library of movies, filter them by specific genres, search for specific titles, and manage personal movie lists. Registered users can interact with the platform by saving favorites, managing their watchlists, and writing detailed reviews with ratings.

## Key Features
- **User Authentication**: Secure signup and login using JSON Web Tokens (JWT).
- **Movie Browsing & Details**: Detailed views for each movie including synopsis, poster/backdrop imagery, director, cast, release info, and aggregated reviews.
- **Search & Filtering**: Dynamic backend-driven search bar and frontend genre filtering (Sci-Fi, Horror, Rom-Com).
- **User Engagement (Interactive)**: 
  - Ability to add movies to personal "Favorites" and "Watchlist" via a dashboard.
  - Leave 1-5 star ratings and textual reviews on individual movies (preventing duplicate reviews per user).
- **Responsive UI**: A sleek, dark-themed, and responsive design built for both desktop and mobile viewing.

## Technology Stack

**Frontend (Client)**
- **Framework**: React (Scaffolded with Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router (react-router-dom)
- **API Client**: Axios (with interceptors for auth headers)
- **State Management**: React Context API (AuthContext)

**Backend (REST API)**
- **Runtime & Framework**: Node.js & Express.js
- **Database**: MongoDB (NoSQL)
- **ODM**: Mongoose 
- **Security**: JWT for protected routes, bcryptjs for password hashing.
- **Architecture**: MVC-inspired (Models, Controllers, Routes structure).

## Database Schema Highlights
- **User Schema**: Stores credentials, hashed passwords, and profile details.
- **Movie Schema**: Stores movie metadata, poster links, favorites/watchlist associations (referencing User IDs), and an embedded **Review Schema** (containing user ref, name, rating, and comment).

## Folder Structure
MERN_Stack/
├── README.md
├── backend/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── seeder.js                # Updated to import all seeds
│   ├── server.js
│   └── src/
│       ├── config/
│       │   └── db.js            # MongoDB connection
│       ├── controllers/
│       │   ├── authController.js
│       │   └── movieController.js # Added search, genre filters, and review logic
│       ├── data/
│       │   ├── movies.js        # Original Sci-Fi movies seed
│       │   └── otherMovies.js   # New Horror & Rom-Com movies seed
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── errorHandler.js
│       ├── models/
│       │   ├── Movie.js         # Added nested reviewSchema
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── movieRoutes.js   # Added POST /:id/reviews route
│       │   └── userRoutes.js
│       └── utils/
│           └── generateToken.js
│
└── frontend/
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── pnpm-lock.yaml
    ├── README.md
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── api/
        │   └── axios.jsx        # Axios interceptors/config
        ├── assets/
        ├── components/
        │   ├── Footer.jsx
        │   ├── MovieCard.jsx
        │   ├── Navbar.jsx       # Added search bar input
        │   ├── ProtectedRoute.jsx
        │   └── Spinner.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── MovieDetail.jsx  # Added Reviews UI & submission form
        │   ├── Movies.jsx       # Added genre pills & search handling
        │   └── Register.jsx
        └── services/
            ├── movieService.js  # Added search/genre params and addReview API
            └── userService.js