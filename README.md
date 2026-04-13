# Brickyard Architects - Frontend

Professional architectural visualization frontend built with Next.js (App Router), React, and TypeScript.

## Stack

- Next.js `16.1.6`
- React `19.2.3`
- TypeScript
- Tailwind CSS `v4`
- Three.js `0.181.1` (for 3D model integration)

## Prerequisites

- Node.js `20+`
- npm

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Current Routes

- `/` - Home
- `/work` - Work listing page
- `/work/[category]` - Work category page
- `/work/[category]/[project]` - Work detail page
- `/studio` - Studio details and philosophy
- `/contact` - Project inquiry page
- `/login` - Client Portal access
- `/signup` - Create account for collaboration

## Project Structure

```text
src/
  app/
    (auth)/           # Authentication routes (Login/Signup)
    work/             # Portfolio navigation & category pages
    studio/           # Studio philosophy & approach
    contact/          # Inquiry form
    layout.tsx
    page.tsx          # Home page
  components/
    layout/           # Shared UI (Navbar, Footer)
    sections/         # Home page sectional components
```

## Status

The project is now branded as **Brickyard Architects**. Recent updates include a fixed client portal login image and consistent branding across all Work, Studio, and Authentication pages.
