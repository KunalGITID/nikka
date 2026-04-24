# Nikka

React + Vite frontend for the summer roadmap project.

## What is built

- Kraken-inspired responsive frontend
- Week-by-week roadmap dashboard
- Course completion tracking with local storage
- Supabase client placeholder for the backend phase
- GitHub Pages deploy script

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Supabase setup

Create a `.env.local` file:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The frontend currently stores progress locally. The next backend step is to add Supabase auth, progress tables, notes tables, and row-level security.

## GitHub Pages deploy

Update these before deploying:

The project is configured for:

```txt
https://kunalgitid.github.io/nikka/
```

Then run:

```bash
npm run deploy
```
