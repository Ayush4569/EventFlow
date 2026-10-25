# Event Requirement Posting Flow

A full-stack event requirement wizard that helps organizers create and submit staffing and talent requirements for **Event Planners, Performers, and Event Crew**.

## Features
- Four-step guided form for event details, category requirements, additional preferences, and final review.
- Dynamic forms based on the selected category.
- Client-side and server-side validation.
- Confirmation screen with a reference ID and event summary.
- REST API for creating and retrieving requirements.

## Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express 5, TypeScript, Mongoose, Zod
- **Database:** MongoDB

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB local instance or MongoDB Atlas

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Configure `.env`:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/event_requirements
FRONTEND_URL=http://localhost:3000
```

Backend runs at `http://localhost:5001`.

### 2. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Configure `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Frontend runs at `http://localhost:3000`.


```bash
# Backend
cd backend && npm run typecheck

# Frontend
cd frontend && npx tsc --noEmit && npm run lint
```
