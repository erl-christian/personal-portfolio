# Erl Christian L. Albuena Portfolio

A one-page personal portfolio built with React, Vite, and Tailwind CSS.

This project presents Erl Christian L. Albuena's profile, skills, experience, and featured work in a single scrolling layout with animated sections, parallax-style motion, and project modals for deeper previews.

## Features

- One-page portfolio layout
- Animated hero and scroll-based visual motion
- Project cards with modal previews
- Image gallery with button-triggered transitions
- Responsive design for desktop and mobile
- Contact section with direct email and phone actions

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build locally

```bash
npm run preview
```

## Project Structure

```text
src/
  assets/                 Images and static assets
  components/             Reusable UI components
    AnimationSlideshow.jsx
    ProjectModal.jsx
  data/
    projects.js           Portfolio project data
  hooks/
    useGalleryImage.js    Loads project gallery images
  App.jsx                 Main one-page portfolio layout
  index.css               Global styles and animations
```

## Main Sections

- Hero
- About
- Experience
- Skills
- Projects
- Contact

## Deployment

This project can be deployed easily on Vercel.

### Deploy with GitHub and Vercel

1. Push this project to a GitHub repository.
2. Go to `https://vercel.com/new`
3. Import the repository.
4. Let Vercel detect the project as a Vite app.
5. If needed, use these settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

After deployment, Vercel will provide a live URL.

### Updating the deployed site

After making changes locally:

```bash
git add .
git commit -m "Update portfolio"
git push
```

If the repository is connected to Vercel, every push will trigger a new deployment automatically.

## Notes

- Project details are managed in `src/data/projects.js`
- Modal gallery behavior is handled in `src/components/ProjectModal.jsx`
- Slideshow transition behavior is handled in `src/components/AnimationSlideshow.jsx`
- Global visual styling and animation utilities are in `src/index.css`

## Author

Erl Christian L. Albuena

- Email: `albuenaerlchristian@gmail.com`
- GitHub: `https://github.com/erl-christian`
