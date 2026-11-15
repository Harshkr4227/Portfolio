# Harsh Kumar — Personal Portfolio (`404 // HK_4227`)

> **"404: IDENTITY NOT FOUND — Data is signal. Pipelines are symphonies."**  
> **Positioning:** Data Engineering, AI/ML & Analytics Developer  
> **Location:** Bokaro, Jharkhand, India  

---

## 1. Overview

This repository contains the source code, design specifications, and AI-discoverability endpoints for **Harsh Kumar's** personal engineering portfolio.

The portfolio blends two core influences:
1. **Visual Theme (`Monochrome Editorial × Digital Noir`):** Built around the `"404: IDENTITY NOT FOUND — Not lost. Still becoming."` creative concept using a strict 6-token monochrome palette (`#0B0B0B` Obsidian, `#121212` Elevated Noir, `#E8E5DE` Archive Paper, `#777777` Signal Grey, `#B5A99A` Muted Silver, and `#E34B43` Signal Red).
2. **Concise Structural Layout (Inspired by `mantukumar.online`):** Prioritizes scannable developer hierarchy—rotating role pills, 3 metric counters, concise 3-card project investigations with expandable code drawers, and a 6-category filterable Tech Stack matrix—without verbose academic clutter.

---

## 2. Key Features Built into This Website

- **Top Scroll Progress Bar & Minimalist HUD:** A 60fps `requestAnimationFrame`-driven `scaleX` progress bar pinned to the top viewport edge (`#E8E5DE` to `#E34B43` gradient) with a live `000%–100%` readout and zero brand logos.
- **Deferred 3D Computational Particle Void (`#home`):** An interactive HTML5 canvas simulating 190 orbital data particles around a central gravitational void, wrapped in `<Suspense>` and an `IntersectionObserver` that automatically pauses GPU rendering (`0% GPU`) when scrolled out of view.
- **Non-Destructive B&W Portrait Pipeline (`avatar_2.jpg`):** Renders Harsh Kumar's real studio portrait unmodified inside an `<img />` element, applying a pure CSS Black & White editorial layer (`grayscale(100%) contrast(1.12) brightness(0.96)`), `mix-blend-mode: lighten`, and a radial vignette so the black backdrop merges invisibly into `#0B0B0B` Obsidian.
- **Concise Selected Projects with Code Drawers (`#projects`):**
  1. **Zomato : Cloud ELT Data Pipeline** (`Python`, `AWS S3`, `Snowflake`, `dbt`, `Apache Airflow`, `SQL`) — includes inspectable Airflow DAG & Snowflake `COPY INTO` code.
  2. **Student Data Management System** (`MySQL`, `SQL`, `HTML5`, `CSS3`, `JavaScript`) — includes inspectable MySQL `3NF` CTE & window/aggregation query code.
  3. **Sentimind : Text Mining & Sentiment Engine** (`Python`, `NLTK`, `spaCy`, `Sentiment Analysis`, `Pandas`) — includes inspectable negation-aware NLP preprocessing code.
- **6-Category Filterable Tech Stack (`#skills`):** Organizes 18+ verified technologies across *Data Engineering & Cloud*, *Languages & Core CS*, *Databases & Storage*, *AI, ML & NLP*, *Data Analysis & Visualization*, and *Web & Developer Tools*.
- **Interactive System Sandbox (`#lab`):** Live client-side simulators for the 4-stage **Zomato Cloud ELT DAG** and **Negation-Aware NLP Sentiment Analysis**.
- **AI & Search Engine Readiness (`public/llms.txt` + `JSON-LD`):** Equipped with an embedded `schema.org/Person` JSON-LD payload and an interactive `/llms.txt` inspector modal for AI agents (ChatGPT, Perplexity, Claude).

---

## 3. Documentation Index (Context Files)

All project context is modularized into the `context/`, `docs/`, and `public/` directories:

| File Path | Purpose |
| :--- | :--- |
| **`portfolio.jsx`** | Complete interactive React application containing all sections, canvas logic, and modals. |
| **`public/llms.txt`** | Machine-readable Markdown profile at the site root for AI crawlers and LLM agents. |
| **`docs/PRD.md`** | Product Requirements Document covering personas, section specs, and Core Web Vitals budgets. |
| **`docs/TECH_STACK.md`** | Technical stack breakdown across frontend, canvas motion, SEO, and showcased domain tools. |
| **`docs/DESIGNS.md`** | Visual identity specification, color tokens, typography hierarchy, and component blueprints. |
| **`docs/PROJECT_WALKTHROUGH.md`** | Detailed engineering changelog explaining every architectural and design decision made. |
| **`docs/DEPLOYMENT_AND_SEO.md`** | Step-by-step guide for deploying to Vercel/Next.js, binding `avatar_2.jpg`, and verifying SEO. |
| **`context/01-identity-and-profile.md`** | Verified biographical source of truth, education, skills, and project details. |
| **`context/02-creative-direction-and-design-system.md`** | Original `"404: IDENTITY NOT FOUND"` creative direction and narrative manifesto. |
| **`context/03-technical-and-animation-architecture.md`** | Next.js App Router folder blueprint and animation lifecycle guidelines. |

---

## 4. Quickstart & Local Development

### Using Next.js / Vite / CodeSandbox
1. Clone or import this repository into **CodeSandbox**, **Cursor**, or your local machine.
2. Place your portrait file at **`public/avatar_2.jpg`** (or `public/images/avatar_2.jpg`).
3. Install dependencies:
   ```bash
   npm install react react-dom lucide-react
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 5. Contact & Verified Profiles
- **GitHub:** [https://github.com/Harshkr4227](https://github.com/Harshkr4227)
- **LinkedIn:** [https://linkedin.com/in/harsh-kumar-214161295](https://linkedin.com/in/harsh-kumar-214161295)
- **X (Twitter):** [https://x.com/harshkr4227](https://x.com/harshkr4227)
- **Direct Email:** `harshkr4227@gmail.com`