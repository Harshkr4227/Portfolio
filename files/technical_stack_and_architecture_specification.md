# Technical Stack & System Architecture
**Project:** Harsh Kumar Portfolio (`404 // HK_4227`)  

---

## 1. Core Frontend & Application Stack

| Layer | Technology | Role & Justification |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router) + React 18** | Server-side metadata, fast initial HTML paint, modular component architecture, and zero-config deployment on Vercel/CodeSandbox. |
| **Language** | **TypeScript / ES2023 JSX** | Type-safe data models for projects, tech stack categories, and telemetry states. |
| **Styling System** | **CSS Modules + Utility Classes + CSS Variables** | Scoped styling with strict adherence to the 6-token monochrome editorial noir palette (`#0B0B0B`, `#121212`, `#E8E5DE`, `#777777`, `#B5A99A`, `#E34B43`). |
| **Typography** | **Google Fonts (`Space Grotesk`, `DM Sans`, `IBM Plex Mono`)** | Loaded with `display=swap` for zero invisible text flash (FOIT). |
| **Icons** | **`lucide-react`** | Tree-shakable, crisp `1.5px` stroke vector icons for technical telemetry (`Terminal`, `Code2`, `ArrowUpRight`, `Copy`, `Check`). |

---

## 2. Graphics, Canvas & Motion Stack

| Module | Implementation | Performance Mechanism |
| :--- | :--- | :--- |
| **Hero Computational Void** | **HTML5 2D/3D-Projected Canvas** (`ComputationalVoidCanvas`) | Simulates 190 orbital data particles around an amber/obsidian gravitational void. Wrapped in `<Suspense>` + `IntersectionObserver` so rendering pauses completely when scrolled past the hero section. |
| **Top Scroll Progress Bar** | **RAF-Throttled Scroll Listener + CSS `scaleX`** | Uses `window.requestAnimationFrame` and GPU-accelerated `transform: scaleX()` instead of layout-thrashing `width` animations. |
| **Smooth Scrolling (Next.js Prod)** | **Lenis + GSAP ScrollTrigger** | Synchronizes inertial scrolling with scroll-triggered reveals while respecting `prefers-reduced-motion`. |
| **Portrait B&W Layer** | **CSS Filter & Blend Pipeline** | Applies `grayscale(100%) contrast(1.12) brightness(0.96)` + `mix-blend-mode: lighten` + radial edge vignette directly over `avatar_2.jpg` without altering raw image pixels. |

---

## 3. SEO, Structured Data & AI Crawler Stack

1. **`public/llms.txt` (AI Agent Discoverability):**
   - Plain-text Markdown endpoint at the site root designed for LLM web crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`) to index Harsh Kumar's verified identity, 3 core projects, and 18+ skills accurately.
2. **Embedded `application/ld+json` (`Person` Schema):**
   - Injected into the document `<head>` / root container declaring Harsh Kumar's `jobTitle` (`Data Engineering, AI/ML & Analytics Developer`), location (`Bokaro, Jharkhand, India`), `knowsAbout` array, and verified `sameAs` social links.
3. **Semantic HTML5 Hierarchy:**
   - Every project card (`<article>`), section (`<section>`), and skill badge is rendered in standard DOM text rather than trapped inside a WebGL canvas.

---

## 4. Portfolio Domain Stack (Technologies Showcased in Harsh's Work)

The portfolio itself highlights Harsh Kumar's applied engineering stack across 6 categories:
- **Data Engineering & Cloud:** Apache Airflow, dbt (data build tool), AWS S3, Snowflake, ETL/ELT Pipelines, Data Modeling, Data Quality Tests
- **Languages & Core CS:** Python, SQL, C++, JavaScript, Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP)
- **Databases & Storage:** MySQL, Snowflake Warehouse, Oracle, MongoDB, 3NF Schema Design, CTEs & Indexing
- **AI, ML & NLP:** NLTK, spaCy, Sentiment Analysis, Feature Engineering, Text Preprocessing, Classification Models
- **Data Analysis & Visualization:** Pandas, NumPy, Matplotlib, Exploratory Data Analysis (EDA), Statistical Reasoning
- **Web & Developer Tools:** HTML5, CSS3, JavaScript, Git, GitHub, VS Code, Google Colab