🎬 Favorite Media – Frontend

This is the frontend for the “Favorite Movies & TV Shows” web app.
It’s a responsive, interactive UI built with React, Vite, TypeScript, TailwindCSS, and Shadcn/UI.

You can add, edit, delete, and search through your favorite movies and TV shows — all in a modern, polished interface with live toast feedback and validation.

**Key Features**

Add, Edit, Delete entries in both Table and Card views

Poster URL preview that fits perfectly inside each card

Search movies or TV shows by title or director

Fully responsive layout for mobile & desktop

Built with Shadcn/UI + TailwindCSS for a modern look

Validation with red highlights for required fields

\***_Tech Stack_**
Layer Tech
Framework React (Vite + TypeScript)
Styling TailwindCSS + Shadcn/UI
UI Feedback Sonner (toast notifications)
HTTP Client Axios
Form Handling React Hooks
Build Tool Vite
⚙️ Local Setup
Prerequisites

Node.js v22.18.0 or newer

Backend API running (default: http://localhost:4000)

**Installation**

Open a terminal in the frontend directory:

cd frontend
npm install

Run Development Server
npm run dev

The app will start on:

http://localhost:5173

Make sure your backend server (Express API) is running at:

http://localhost:4000

If you’ve deployed your backend (for example, on Render),
update the file src/lib/api.ts or set an environment variable:

VITE_API_BASE=https://favorite-media-backend.onrender.com/api

Folder Structure
frontend/
│
├── src/
│ ├── components/ # UI components and reusable elements
│ ├── pages/ # Main pages (Home.tsx)
│ ├── lib/ # API and utils
│ ├── types.ts # Shared TypeScript types
│ └── index.css # Tailwind + custom theme styles
│
├── public/ # Static assets
├── package.json
├── vite.config.ts
└── tailwind.config.cjs

**Deployment (Vercel)**

This app is fully Vercel-ready.

Push your repo to GitHub

Go to https://vercel.com

Import the repository

Set the Root Directory → frontend

Add environment variable:

VITE_API_BASE=https://favorite-media-backend.onrender.com/api

Build Command:

npm run build

Output Directory:

dist

Click Deploy

You’ll get your live frontend link like:

https://favorite-media.vercel.app

Integration with Backend

The frontend expects the backend API to expose these endpoints:

GET /api/entries
POST /api/entries
PUT /api/entries/:id
DELETE /api/entries/:id

Each entry object follows this structure:

{
id: number;
title: string;
type: string;
director: string;
budget: string;
location: string;
duration: string;
year_time: string;
poster_url?: string;
}

**Developer Notes**

The UI uses Shadcn/UI components and Tailwind utility classes.

The EntryForm automatically validates required fields and shows red borders.

Axios handles API calls; base URL is configurable via .env.

**Author**

Sham Sundar
Frontend Developer | Bangalore, India
🔗 GitHub
