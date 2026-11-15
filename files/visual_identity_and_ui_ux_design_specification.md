# Visual Identity, UI/UX & Component Design Specification
**Theme:** `MONOCHROME EDITORIAL × DIGITAL NOIR × CONCISE DEVELOPER GRID`  
**Structural Reference:** Inspired by the scannable hierarchy of `mantukumar.online`, executed in Harsh Kumar's custom `"404: IDENTITY NOT FOUND"` palette.

---

## 1. Color Palette & Surface Tokens

Strict monochromatic discipline with a single high-priority accent color:

| Token | HEX | Role in UI |
| :--- | :--- | :--- |
| **Obsidian** | `#0B0B0B` | Main page background (`#home`, `#projects`, `#skills`, `#lab`). |
| **Elevated Noir** | `#121212` | Project cards, Tech Stack category cards, metric boxes, and code drawers. |
| **Archive Paper** | `#E8E5DE` | Primary headlines, active filter pills, primary CTA buttons, and the inverted `#contact` section background. |
| **Signal Grey** | `#777777` | Concise 2-line project summaries, subtitles, and inactive navigation links. |
| **Muted Silver** | `#B5A99A` | Used at `20%–35%` opacity (`rgba(181, 169, 154, 0.25)`) for `1px` brutalist card borders and hairline dividers. |
| **Signal Red** | `#E34B43` | **Rare Accent:** Top scroll progress bar gradient tip, live status dot, `404` strikethrough, hero name underline, and category tags. |

---

## 2. Typography & Hierarchy

1. **Display Headline (`Space Grotesk`, Bold 700, `-0.03em` tracking):**
   - Hero Name (`H1`): `text-5xl sm:text-7xl` (`48px–72px`), uppercase, tight leading (`0.95`).
   - Section Headers (`H2`): `text-3xl sm:text-5xl` (`30px–48px`), bold.
   - Card Titles (`H3`): `text-xl sm:text-2xl` (`20px–24px`), bold.
2. **Body Copy (`DM Sans`, Regular 400 / Medium 500):**
   - Concise descriptions capped at 2–3 lines (`text-sm sm:text-base`, `#777777`) for rapid recruiter scanning.
3. **Technical Telemetry (`IBM Plex Mono`, Regular 400 / SemiBold 600):**
   - Used for the top progress percentage (`042%`), section indices (`[01 // PROJECTS]`), tech stack pills, and code snippets.

---

## 3. Component Design Specifications

### 3.1. Top Header & Scroll Progress Bar
- **Progress Track:** `3px` height pinned to the very top of the fixed header (`top: 0`).
- **Progress Fill:** `linear-gradient(90deg, #E8E5DE 0%, #E34B43 100%)` with a subtle red glow (`box-shadow: 0 0 12px rgba(227, 75, 67, 0.65)`).
- **Header Height:** `56px` (`h-14`), `backdrop-filter: blur(12px)`, `background: rgba(11, 11, 11, 0.90)`.

### 3.2. Portrait Identity Card (`avatar_2.jpg`)
- **Aspect Ratio:** `4:5` vertical editorial frame inside a `#121212` card with `12px` padding and corner crosshairs (`+`).
- **Non-Destructive B&W Layer:**
  ```css
  filter: grayscale(100%) contrast(1.12) brightness(0.96);
  mix-blend-mode: lighten;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
  ```
- **Backdrop Integration:** Radial gradient (`#000000` center to `#0B0B0B` edges) + inner vignette overlay so the black background of `avatar_2.jpg` blends invisibly into the website surface.

### 3.3. Concise Project Card (`#projects`)
- **Structure:** 3-column grid (`grid-cols-1 lg:grid-cols-3 gap-6`).
- **Header Row:** Oversized index number (`01`, `02`, `03`) on the left + Signal Red category badge (`Project Cloud Data Pipeline`) on the right.
- **Body:** Project title + 2-line summary + 3 concise bullet points bordered by a `1px` left rule.
- **Footer:** Stack pills (`Python`, `AWS S3`, `Snowflake`, `dbt`, `Apache Airflow`, `+3`) + dual action bar (`[INSPECT CODE]` toggle button and `CODE ↗` GitHub link).

### 3.4. Categorized Tech Stack Card (`#skills`)
- **Structure:** 6-card grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`).
- **Card Header:** Telemetry index (`STACK_01`) + tool count (`7 TOOLS`) + Category title (`Data Engineering & Cloud`) + 1-line subtitle.
- **Badge Matrix:** High-contrast `#0B0B0B` pills with `#B5A99A/25` borders that highlight in Signal Red (`#E34B43`) on hover.

---

## 4. Responsive Breakpoints
- **Mobile (`< 640px`):** Single-column stack, compact navigation bar, touch-friendly `44px` minimum tap targets on filter pills and code drawers.
- **Tablet (`640px – 1024px`):** 2-column Tech Stack grid, full-width Hero and Project cards.
- **Desktop (`> 1024px`):** 12-column Hero split (`7 cols` typography / `5 cols` portrait card), 3-column Project grid, and 3-column Tech Stack matrix (`max-w-6xl` container).