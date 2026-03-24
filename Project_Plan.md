# Portfolio & Admin Panel Development Plan

**Objective:** Build a visually stunning, premium portfolio website engineered for maximum user engagement.

**Core Requirements:**

- **Scroll Snapping:** Implement seamless Full-Page Scroll Snapping (e.g., using CSS scroll-snap or GSAP ScrollTrigger). As the user scrolls, each project section must automatically and smoothly lock into the viewport, providing a perfectly framed and guided experience.
- **Dynamic & Fluid UI:** The website must not feel static. Integrate continuous, beautiful micro-interactions, smooth hover states, and scroll-triggered reveal animations.
- **The "Wow" Factor:** Incorporate an advanced, highly interactive element to serve as the site's centerpiece. This should include an interactive WebGL/Three.js background, a dynamic custom cursor, or rich parallax depth effects that respond to the user's mouse movements and scrolling, creating a state-of-the-art first impression.

## Tech Stack

- **Frontend:** React, TypeScript
- **Routing:** React Router DOM
- **Backend/BaaS:** Firebase (Authentication, Firestore, Storage)
- **Hosting:** Firebase Hosting

## Step-by-Step Implementation Guide

### Phase 1: Initial Repository & App Setup

- [ ] Initialize React + TypeScript project (e.g., using Vite: `npm create vite@latest . -- --template react-ts`)
- [ ] Clean up default boilerplate files and create standard folder structure (`/src/components`, `/src/pages`, `/src/hooks`, `/src/types`, `/src/services`).
- [ ] Set up routing using `react-router-dom`.
- [ ] Configure global styles and a SCSS framework (e.g., Bootstrap standard SCSS).
- [ ] Make sure to have separate scss module files for each component.

### Phase 2: Firebase Configuration

- [ ] Create required tables and schemas in Firebase in project names 'PortfolioAG'.

### Phase 3: Public Portfolio Development

#### Main Page

- [ ] Will contain all the sections like Home, About, Projects, case study, expereince, testimonials, contact etc.
- [ ] We can visit these sections by scrolling down.

- [ ] **Home Section:** Hero section with introduction and call-to-action.
- [ ] **About Section:** Personal bio, skills list, and a download link for the resume. Also, include link for github, leetcode, linkedin.
  - skills list can be fetched dynamically from Firestore
  - skills will be separated by its type like frontend, backend etc.
- [ ] **Projects Section:** Grid/List of projects dynamically fetched from Firestore.
  - Create TypeScript interfaces for the `Project` data model.
  - Project section will contain further details of each project (title, description, features, tech stack used, GitHub link, Live link).
- [ ] **Case Studies Section:** Grid/List of case studies dynamically fetched from Firestore.
  - Create TypeScript interfaces for the `CaseStudy` data model.
  - Case Studies section will contain link for the case study page and will open the specific case study when clicked.
- [ ] **Experience Section:** Grid/List of experience dynamically fetched from Firestore.
  - Create TypeScript interfaces for the `Experience` data model.
  - Experience section will contain further details (company name, logo of company, time period, role, achievements, link to the company website).
- [ ] **Testimonials Section:** Grid/List of testimonials dynamically fetched from Firestore.
  - Create TypeScript interfaces for the `Testimonial` data model.
  - Testimonials section will contain further details of testimonial (person name, link to linkedin page, profile pic, their position, company, date when they recommended me).
- [ ] **Contact Section:** Form to capture user messages. connect this with Email JS.
- [ ] **Shared Components:** Navbar, Footer, UI elements (Buttons, Cards, Modals).

#### Case Studies Page

- [ ] Will contain 2 sections i.e. list of case studies and content of case studies
- [ ] User can click any one case study in the list and the content of that case study will be displayed in the content section.
- [ ] The content of the case study will contain text , images and gifs.
- [ ] Generate required schemas and tables in Firestore for case studies.

### Phase 4: Authentication & Protected Routes

- [ ] Create a `/login` page with a simple email and password form.
- [ ] Implement a custom React hook (e.g., `useAuth`) to listen to Firebase Auth state changes.
- [ ] Create a `<ProtectedRoute>` component wrapper that checks for the authenticated user and redirects unauthorized users back to `/login` or `/`.

### Phase 5: Admin Panel (CMS) Development

- [ ] **Admin Layout:** Create a dedicated dashboard layout with a sidebar/navbar.
- [ ] **Manage Skills (CRUD):**
  - List all existing skills with edit/delete options.
  - Form to add a new skill and type of skill i.e. frontend/backend
- [ ] **Manage Projects (CRUD):**
  - List all existing projects with edit/delete options.
  - Form to add a new project (title, description, features, tech stack used, GitHub link, Live link).
  - Image upload integration with url link.
- [ ] **Manage Case Studies (CRUD):**
  - List all existing case studies with edit/delete options.
  - Form to add a new case study (title and content).
  - Input field to add url link of the image.
  - Include a text editor which can add text, images, gifs and various fonts.
- [ ] **Manage Experience (CRUD):**
  - List all existing experience with edit/delete options.
  - Form to add a experience (company name, logo of company, time period, role, achievements, link to the company website).
- [ ] **Manage Testimonials (CRUD):**
  - List all existing Testimonials with edit/delete options.
  - Form to add a new testimonial (person name, link to linkedin page, link of profile pic image, their position, company, date when they recommended me).
- [ ] Make sure to add forms to upload url links of pictures.
- [ ] Add required succes, error messages and all standard form expectations.
- [ ] Make all fields in all forms as required fields.

### Phase 6: Polish & Optimization

- [ ] Review UI/UX: Ensure full responsive design across Mobile, Tablet, and Desktop.
- [ ] Implement loading spinners and error states (especially for Firebase calls).
- [ ] ensure the wesite is secure and response time is less.
- [ ] Review SEO best practices (Title tags, metadata, semantic HTML).

### Phase 7: Deployment

- [ ] Secure Firestore and Storage rules so that only the admin UID can write/delete, while the public can read projects.
- [ ] Build the production app (`npm run build`).
- [ ] Deploy using Firebase Hosting (`firebase init hosting` -> `firebase deploy`). but make sure to ask before deploying.
