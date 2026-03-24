# PortfolioAG — Full-Stack Portfolio Website

A visually premium portfolio website built with React, TypeScript, Vite, and Firebase.

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | React 18, TypeScript                |
| Routing      | React Router DOM v6                 |
| Styling      | Bootstrap 5 + SCSS Modules          |
| Backend/BaaS | Firebase (Auth, Firestore, Storage) |
| Build Tool   | Vite                                |

## Project Structure

```
src/
├── components/
│   ├── sections/        # Public page sections (Hero, About, Projects, etc.)
│   ├── Navbar.tsx
│   ├── ToastContainer.tsx
│   └── ProtectedRoute.tsx
├── context/
│   ├── AuthContext.tsx  # Firebase Auth state
│   └── useToast.ts     # Toast notification hook
├── pages/
│   ├── admin/           # Protected admin CMS (Skills, Projects, CaseStudies, Experience, Testimonials)
│   ├── Home.tsx
│   ├── CaseStudies.tsx
│   ├── CaseStudyDetail.tsx
│   └── Login.tsx
├── services/
│   └── firebase.ts     # Firebase config & exports
├── styles/
│   ├── global.scss
│   └── variables.scss  # Shared SCSS tokens
└── types/
    └── index.ts        # TypeScript interfaces
```

## Features

### Public Portfolio

- **Hero** — Introduction and call-to-action
- **About** — Personal bio, skills (grouped by category), resume download, social links (GitHub, LinkedIn, LeetCode)
- **Projects** — Dynamically fetched from Firestore; includes title, description, features, tech stack, GitHub & live links, cover image
- **Case Studies** — Clickable cards linking to dedicated detail pages with full HTML content
- **Experience** — Timeline with company, role, time period, achievements
- **Testimonials** — Cards with avatar, name, quote, position and recommended date
- **Contact** — Form powered by EmailJS

### Admin Panel (`/admin`) — Protected Route

- Full CRUD for Skills, Projects, Case Studies, Experience, and Testimonials
- Image upload to Firebase Storage (with 2MB size validation)
- Toast notifications (success/error/info) with auto-dismiss
- Confirmation modals for all delete actions
- Loading spinners during data fetch
- Character counters on text fields

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server                     |
| `npm run build`   | Production build (TypeScript + Vite) |
| `npm run lint`    | Run ESLint                           |
| `npm run preview` | Preview production build locally     |

## Environment Variables

Create a `.env` file at the root with your Firebase config:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> **Never commit `.env` to version control.**

## Code Style

- Separate SCSS module file per component
- Custom hooks extracted into `src/context/`
- TypeScript strict mode throughout
- ESLint + Prettier for formatting (run `/linting` workflow)
