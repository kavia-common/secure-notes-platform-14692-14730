# Secure Notes Frontend

Modern, minimalistic notes application built with Next.js App Router.
Implements:
- User authentication (client-side, localStorage demo)
- Create, read, update, delete notes
- List and search notes
- Responsive layout with sidebar, header, and main editor
- Light theme with primary #1A73E8, secondary #F1F3F4, accent #F9AB00

## Getting Started

Install and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Authentication

This demo stores users locally in the browser (no backend). Use any email/password to sign up/sign in. Replace the AuthProvider with a real provider for production.

## Data Persistence

Notes are saved to localStorage, namespaced per user.

## Structure

- src/app/page.tsx — Routing root switching between Auth and Notes views
- src/components/AuthProvider — Authentication context (sign in/up/out)
- src/components/notes/* — Notes context and UI (list and editor)
- src/components/ui/* — Header, Sidebar, Auth card
- src/lib/storage.ts — localStorage-based persistence

## Scripts

- npm run dev — Start dev server
- npm run build — Production build
- npm start — Start production server

## Notes

This app is frontend-only per the task scope.
