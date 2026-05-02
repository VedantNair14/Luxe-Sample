# Luxe Clothing E-Commerce Template

A "top 0.01%" premium clothing e-commerce website template built with Next.js 15, FastAPI, and Tailwind CSS.

## ✨ Features

- **Premium Design System**: Minimalistic luxury aesthetic with zero-radius components and a high-contrast palette.
- **Cinematic Animations**: Smooth transitions and scroll effects using Framer Motion.
- **High Performance**: Built with Next.js App Router and optimized for speed.
- **E-Commerce Ready**: Full cart management (Zustand), product listing, detail pages, and checkout UI.
- **FastAPI Backend**: Robust asynchronous API with PostgreSQL (ready) and SQLite (demo).
- **Admin Dashboard**: Modern interface for inventory and order management.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, ShadCN UI, Framer Motion, Zustand.
- **Backend**: FastAPI, SQLAlchemy, SQLite/PostgreSQL, JWT Auth.
- **Animations**: Framer Motion.
- **Icons**: Lucide React.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.9+

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Seed the database:
   ```bash
   python seed.py
   ```
5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy
The design follows a "Less is More" approach, inspired by high-end fashion houses. It uses bold typography, generous whitespace, and subtle micro-interactions to create a feeling of exclusivity and luxury.

---
Created by Antigravity - Senior Full-Stack Developer & Product Strategist.
