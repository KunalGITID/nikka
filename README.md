# Nikka

React + Vite frontend for the summer roadmap project.

## What is built

- Kraken-inspired responsive frontend
- Week-by-week roadmap dashboard
- Course completion tracking with local storage
- Supabase email/password auth wiring
- Supabase cloud progress sync
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

1. Create a Supabase project at https://supabase.com/dashboard
2. Go to Project Settings > API
3. Copy the Project URL and anon public key
4. Create a `.env.local` file:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Open SQL Editor in Supabase
6. Run the SQL in `supabase/schema.sql`
7. Go to Authentication > Providers and make sure Email is enabled

The app uses local storage when Supabase is not configured. After you add the keys and run the schema, signing in will sync completed courses across devices.

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
