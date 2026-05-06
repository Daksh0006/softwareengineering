# CampusGrid Frontend

React + Tailwind CSS frontend for CampusGrid: Campus Collaboration and Team Formation System.

## Run Locally

```bash
npm install
npm run dev
```

Demo users in the mock auth flow:

- Student: `student@campusgrid.dev`
- Club Executive: `club@campusgrid.dev`
- Faculty Coordinator: `faculty@campusgrid.dev`

Any password with at least 6 characters works in the frontend-only mock flow.

## Deployment

This project is ready for Vercel. `vercel.json` rewrites all routes to `index.html` for React Router.
