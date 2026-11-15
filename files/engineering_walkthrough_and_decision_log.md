# Engineering Walkthrough & Decision Log
**Project:** Harsh Kumar Portfolio (`404 // HK_4227`)  

This document explains **what was built**, **how each problem was solved**, and **why specific architectural decisions were made** during the evolution of this portfolio.

---

## 1. Evolution of the Portfolio Architecture

### Decision 1: Combining "404 Digital Noir" with Concise Scannability
- **Initial State:** The initial creative direction established a rich 7-section narrative (`00 The Signal` through `06 The Next Version`) with deep biographical prose and an academic timeline.
- **Refinement (Inspired by `mantukumar.online`):** Technical recruiters scan developer portfolios in under 30 seconds. We kept the exact **Monochrome Editorial × Digital Noir (`#0B0B0B`, `#E8E5DE`, `#E34B43`)** color system and `"404: IDENTITY NOT FOUND"` motif, but streamlined the page into 5 high-impact sections:
  1. **`#home` (Hero & Portrait Card):** Title updated to **"Data Engineering, AI/ML & Analytics Developer"**, paired with rotating role pills (`Data Engineer`, `Data Scientist`, `ML & NLP Practitioner`), the quote *"Data is signal. Pipelines are symphonies."*, and 3 scannable stat counters (`03 Core Systems Shipped`, `18+ Tech Stack`, `04 Engineering Domains`).
  2. **`#projects` (Selected Work):** Concise 3-card grid with category badges, 2-line summaries, stack pills with `+3`/`+4` counters, and collapsible `[INSPECT CODE]` drawers.
  3. **`#skills` (Tech Stack):** Clean 6-category badge matrix with domain filter tabs.
  4. **`#lab` (Interactive System Sandbox):** 2-tab live simulator for Cloud ELT and NLP Sentiment.
  5. **`#contact` (Archive Paper Contrast Footer):** Direct 1-click email copy and social links.
- **Why Education Was Condensed:** Removing the standalone Education section prevents the portfolio from reading like a student assignment and immediately positions Harsh Kumar around his shipped systems and technical stack, while retaining a clean `B.Tech CSE (Data Science)` tag on his portrait card.

---

### Decision 2: Non-Destructive Portrait Rendering (`avatar_2.jpg`)
- **The Challenge:** Early iterations used pixel-level canvas manipulation and fallback SVG illustrations when the sandbox `iframe` could not read local chat attachments. Additionally, the user provided `avatar_2.jpg`—a clean cutout portrait on a pure `#000000` black background—and requested: *"Do not change the image, use a black & white layer and adjust this with web background in the image section."*
- **The Solution Implemented in `EditorialPortraitShowcase`:**
  1. **Zero Pixel Alteration:** The image is rendered via a standard HTML `<img />` tag without altering, cropping, or flood-filling any pixels.
  2. **Pure CSS B&W Editorial Layer:** Applied `filter: grayscale(100%) contrast(1.12) brightness(0.96)` (with a `[B&W: ON/OFF]` toggle in the header and portrait footer).
  3. **Seamless `#000000` to `#0B0B0B` Blending:** Because `avatar_2.jpg` has a `#000000` backdrop and the website background is `#0B0B0B` Obsidian, the container pairs a radial `#000000 -> #0B0B0B` gradient with `mix-blend-mode: lighten`, a bottom mask gradient, and an inner vignette overlay so the edges disappear seamlessly into the card.
  4. **Sandbox Hydration + Production Lock:** In isolated browser sandboxes where `public/avatar_2.jpg` is not yet mounted on disk, the owner can bind `avatar_2.jpg` once into `localStorage`. On a deployed Next.js/Vercel server with `/public/avatar_2.jpg`, the `<img />` loads automatically for all visitors with zero upload controls exposed.

---

### Decision 3: Core Web Vitals & GPU Performance Optimizations
1. **Top Edge Scroll Progress Bar (`CLS = 0.000`):**
   - Uses `window.requestAnimationFrame` to compute scroll percentage and updates `transform: scaleX(progress)` on a fixed `3px` bar rather than animating CSS `width`, avoiding layout recalculations on every scroll tick.
2. **Deferred 3D Canvas & `IntersectionObserver` Pause:**
   - `ComputationalVoidCanvas` is wrapped in React `<Suspense>` and monitored by an `IntersectionObserver` (`threshold: 0.05`). The moment a user scrolls down to `#projects` or `#skills`, the `requestAnimationFrame` loop halts completely (`0% GPU/CPU` usage while off-screen).
3. **Eager LCP Image Attributes:**
   - The portrait `<img />` specifies explicit `width={800}` and `height={1000}` inside an `aspect-[4/5]` frame (`CLS = 0.000`), alongside `loading="eager"` and `decoding="async"`.

---

### Decision 4: AI & LLM Crawler Discoverability (`/llms.txt` + `JSON-LD`)
- Modern technical hiring pipelines and AI search engines (Perplexity, ChatGPT Search, Claude) parse structured metadata and `/llms.txt` files.
- We embedded a complete `application/ld+json` `Person` schema directly in the DOM and exposed an interactive **`[LLMS.TXT]`** modal in the top header so anyone (or any crawler) can inspect and copy the clean Markdown summary of Harsh Kumar's profile.