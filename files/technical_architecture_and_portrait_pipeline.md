# Technical, Animation & Portrait Matting Architecture

## 1. Recommended Next.js App Router Folder Structure

```text
portfolio/
├── public/
│   ├── images/
│   │   └── avatar.png                  # Harsh Kumar's original studio portrait
│   ├── llms.txt                       # Markdown profile for AI agents & LLM crawlers
│   └── ai.txt                         # Mirror of llms.txt for AI indexers
├── src/
│   ├── app/
│   │   ├── globals.css                # CSS custom properties, resets & grid utilities
│   │   ├── layout.tsx                 # Fonts, OpenGraph, JSON-LD Person schema
│   │   ├── page.tsx                   # Master narrative page assembling Sections 00–06
│   │   ├── robots.ts                  # Crawler allowances (GPTBot, ClaudeBot, PerplexityBot)
│   │   └── sitemap.ts                 # Dynamic XML sitemap generation
│   ├── context/
│   │   └── AnimationController.tsx    # Lenis smooth scroll + GSAP ScrollTrigger sync
│   ├── components/
│   │   ├── hud/
│   │   │   ├── Preloader.tsx
│   │   │   └── SystemHudNav.tsx
│   │   ├── canvas/
│   │   │   ├── ComputationalVoid.tsx  # 3D orbital particle field with amber glow
│   │   │   └── PortraitShader.tsx     # BFS studio background removal + monochrome grade
│   │   └── sections/
│   │       ├── Section00Signal.tsx
│   │       ├── Section01Identity.tsx
│   │       ├── Section02TimeSkip.tsx
│   │       ├── Section03System.tsx
│   │       ├── Section04Projects.tsx
│   │       ├── Section05Lab.tsx
│   │       └── Section06Contact.tsx
│   └── data/
│       └── profileData.ts             # Single source of truth for copy, skills & projects
└── package.json
```

---

## 2. Portrait Background Removal & Editorial Grading Pipeline (`harsh.png`)

### Why Naive Brightness Thresholding Fails
In `harsh.png`, Harsh is wearing a **white collared shirt with subtle purple/grey micro-dots** against a **pure white studio backdrop**. A naive luma cutoff (`if (luma > 0.9) alpha = 0`) erases the white shirt along with the backdrop.

### The 4-Stage Solution Implemented in the Portfolio
1. **Stage 1 — Edge-Seeded Breadth-First Search (BFS) Flood-Fill:**
   - Seeds a queue from the outer top, left, and right border pixels of the image (`y = 0`, `x = 0`, `x = width - 1`).
   - Flood-fills inward across contiguous studio-white pixels (`luma > threshold` and `chroma < 26`), stopping at the dark hair, skin tones, and the outer shoulder/collar seam.
   - Because the flood-fill cannot cross the collar/shoulder boundary, the interior of the white patterned shirt remains 100% opaque.
2. **Stage 2 — 2px Anti-Aliased Boundary Feathering:**
   - Applies a `5x5` separable alpha convolution along boundary pixels where background meets hair/shoulders, eliminating harsh jagged white halos.
3. **Stage 3 — High-Contrast Monochrome Editorial Grading:**
   - Converts RGB to perceptual luminance (`0.299R + 0.587G + 0.114B`) and applies an editorial S-curve (`contrast: 1.18x`), mapping shadows to `#0B0B0B` (Obsidian) and highlights to `#E8E5DE` (Archive Paper).
4. **Stage 4 — Studio Lighting Wrap on Lower Torso:**
   - Applies a subtle vertical lighting gradient across the bottom torso so the bright white shirt integrates seamlessly into the dark `#0B0B0B` architectural grid.

---

## 3. Animation Orchestration & Smooth Scroll Rules

- **Lenis + GSAP ScrollTrigger Synchronization:**
  - Use **Lenis** exclusively for inertial smooth scrolling (never combine Lenis and Locomotive Scroll in the same bundle).
  - Bind `lenis.on('scroll', ScrollTrigger.update)` and drive Lenis via `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- **Clean Lifecycle Management:**
  - Wrap all section animations in `gsap.context(() => { ... }, sectionRef)` and call `ctx.revert()` on component unmount.
- **Accessibility (`prefers-reduced-motion`):**
  - Automatically detect `window.matchMedia('(prefers-reduced-motion: reduce)')` and provide a manual `[MOTION: FULL / REDUCED]` toggle in the footer. When reduced motion is active, bypass the preloader, stop particle rotation, and disable scanline jitter.

---

## 4. Core Web Vitals & Performance Targets

- **Largest Contentful Paint (LCP < 1.8s):** Preload `Space Grotesk` and `IBM Plex Mono` fonts; lazy-load heavy below-the-fold interactive sandboxes.
- **Cumulative Layout Shift (CLS < 0.02):** Reserve explicit `aspect-[4/5]` containers for portrait canvases so image processing never shifts surrounding layout blocks.
- **Total Blocking Time (TBT < 150ms):** Pause the Section `00` particle canvas via `IntersectionObserver` when scrolled out of view.