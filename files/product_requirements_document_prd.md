# Product Requirements Document (PRD)
**Project Name:** Harsh Kumar — Personal Portfolio (`404 // HK_4227`)  
**Concept:** `"404: IDENTITY NOT FOUND — Data is signal. Pipelines are symphonies."`  
**Owner:** Harsh Kumar (`harshkr4227@gmail.com`)  
**Status:** Production Specification  

---

## 1. Executive Summary & Vision
Build a high-performance, editorial-noir personal portfolio for **Harsh Kumar**, positioned as a **Data Engineering, AI/ML & Analytics Developer**. 

Inspired by the concise, high-impact developer presentation of `mantukumar.online` while maintaining a strict **Monochrome Editorial × Digital Noir (`404`)** visual identity, the portfolio avoids bloated biographical essays and focuses on what technical recruiters and hiring engineers evaluate first:
1. **Immediate Identity & Positioning** (Who Harsh is, what he builds, and his real studio portrait).
2. **Selected Work / Projects** (Concise 3-project showcase with inspectable Airflow/dbt, SQL CTE, and Python NLP code).
3. **Categorized Tech Stack** (18+ verified tools across 6 filterable engineering domains).
4. **Live System Sandbox** (Interactive client-side Cloud ELT & NLP Sentiment testers).
5. **Frictionless Outreach & AI Discoverability** (1-click email copy, social links, JSON-LD, and `/llms.txt`).

---

## 2. Target Audience & User Personas
1. **Technical Recruiters & Hiring Managers:** Scan the page in `< 30 seconds`. Need immediate role clarity (`Data Engineer` / `Data Scientist` / `ML & NLP Practitioner`), location (`Bokaro, Jharkhand, India`), stack tags, and direct contact links.
2. **Senior Data / ML Engineers:** Evaluate technical depth. Want to inspect actual DAG workflows (`AWS S3 -> Snowflake -> dbt -> Airflow`), normalized `3NF` SQL queries, and modular Python NLP code.
3. **AI Search Engines & LLM Agents (ChatGPT, Perplexity, Claude):** Crawl `/llms.txt` and `application/ld+json` (`Person` schema) to answer recruiter prompts accurately without hallucinating credentials.

---

## 3. Core Product Principles & Guardrails
- **Zero Fabrication Policy:** Only verified projects (`Zomato Cloud ELT Pipeline`, `Student Data Management System`, `Sentimind NLP Engine`), real skills, and real credentials (`B.Tech CSE - Data Science`) are displayed.
- **Concise over Verbose:** Every project and skill section uses scannable badges, 2-line summaries, and 3-bullet impact highlights rather than walls of text.
- **No Education Section Clutter:** Education is condensed into a subtle `B.Tech CSE (Data Science)` badge inside the hero portrait card so the page flows directly from **Hero → Projects → Tech Stack → Lab → Contact**.
- **Permanent Owner Portrait (`avatar_2.jpg`):** Displays Harsh Kumar's real studio portrait with a non-destructive CSS Black & White editorial layer and seamless `#000000` to `#0B0B0B` background blending. Public visitors cannot overwrite the deployed portrait.

---

## 4. Functional Requirements (Section-by-Section)

### 4.1. Fixed Header & Top Scroll Progress Bar
- **Scroll Progress Indicator:** A `3px` top-edge bar (`role="progressbar"`) driven by `requestAnimationFrame` (`scaleX(0)` to `scaleX(1)`) in an Archive Paper (`#E8E5DE`) to Signal Red (`#E34B43`) gradient, paired with a live `000%–100%` numeric readout.
- **No Brand Logo:** Uses the system badge `404 // HK_4227` with a pulsing Signal Red indicator dot.
- **Section Jumpers:** Smooth-scroll navigation buttons for `Home`, `Projects`, `Skills`, `Lab`, and `Contact`, plus quick toggles for `[B&W: ON/OFF]` and `[LLMS.TXT]`.

### 4.2. Hero Section (`#home`)
- **Left Column (7 Cols):**
  - Crossed-out `404: IDENTITY NOT FOUND` tag paired with `Data Engineering, AI/ML & Analytics Developer`.
  - Headline: `"I am Harsh Kumar"` with Signal Red underline accent.
  - Interactive rotating role pills: `Data Engineer`, `Data Scientist`, `ML & NLP Practitioner`.
  - Quote: *"Data is signal. Pipelines are symphonies."* + 2-line bio.
  - 3 Metric Counters: `03 Core Systems Shipped`, `18+ Tech Stack`, `04 Engineering Domains`.
  - Primary CTAs: `VIEW PROJECTS`, `CONTACT`, and `GITHUB`.
- **Right Column (5 Cols):**
  - Framed `4:5` developer portrait card rendering `avatar_2.jpg` with a toggleable B&W layer (`grayscale(100%) contrast(1.12) brightness(0.96)`), status indicator (`ONLINE`), location (`Bokaro, Jharkhand, India`), and degree tag (`B.Tech CSE (Data Science)`).

### 4.3. Selected Projects Section (`#projects`)
- **3-Column Responsive Card Grid:**
  1. **`01` Zomato : Cloud ELT Data Pipeline** (`Project Cloud Data Pipeline`) — Python, AWS S3, Snowflake, dbt, Apache Airflow, SQL (`+3`).
  2. **`02` Student Data Management System** (`Project Database & Web App`) — MySQL, SQL, HTML5, CSS3, JavaScript (`+4`).
  3. **`03` Sentimind : Text Mining & Sentiment Engine** (`Project NLP & ML System`) — Python, NLTK, spaCy, Sentiment Analysis, Pandas (`+3`).
- **Interactive Code Drawer (`[INSPECT CODE]`):** Each card includes a collapsible syntax drawer allowing engineers to inspect and copy the real Airflow DAG, SQL CTE query, or Python NLP script without leaving the page.

### 4.4. Categorized Tech Stack Section (`#skills`)
- **Interactive Domain Filter:** Instant filter tabs (`All (18+)`, `Data Eng`, `Languages`, `Databases`, `AI & NLP`).
- **6-Card Categorized Matrix:**
  1. `STACK_01` Data Engineering & Cloud (7 tools)
  2. `STACK_02` Languages & Core CS (6 tools)
  3. `STACK_03` Databases & Storage (6 tools)
  4. `STACK_04` AI, ML & NLP (6 tools)
  5. `STACK_05` Data Analysis & Visualization (5 tools)
  6. `STACK_06` Web & Developer Tools (7 tools)

### 4.5. Interactive Lab Section (`#lab`)
- **Tab 01 (`[01. CLOUD ELT DAG]`):** Simulates a 4-stage batch execution (`01 S3 Lake` → `02 Snowflake` → `03 dbt Test` → `04 BI Mart`).
- **Tab 02 (`[02. NLP SENTIMENT]`):** Live text input evaluating negation-aware sentiment polarity (`POSITIVE`, `NEGATIVE`, `NEUTRAL`) and token extraction in real time.

### 4.6. Contact & AI Discoverability Section (`#contact`)
- High-contrast Archive Paper (`#E8E5DE`) surface inversion.
- 1-click email copy (`harshkr4227@gmail.com`) + direct external links to GitHub, LinkedIn, and X (Twitter).
- Modal inspector for `/llms.txt` and `JSON-LD` Person schema.

---

## 5. Non-Functional & Performance Requirements (Core Web Vitals)
- **LCP (Largest Contentful Paint):** `< 1.8s` via eager loading on `avatar_2.jpg` and deferred `<Suspense>` initialization on the background particle canvas.
- **CLS (Cumulative Layout Shift):** `0.000` via explicit aspect-ratio containers (`aspect-[4/5]`) and GPU-composited `transform: scaleX()` on the scroll progress bar.
- **CPU/GPU Efficiency:** Automatic `IntersectionObserver` pause on the hero particle canvas when scrolled out of view (`0% GPU` when off-screen).
- **Accessibility:** Full keyboard navigation, semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), WCAG AAA text contrast, and `prefers-reduced-motion` support.