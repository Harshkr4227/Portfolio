# Creative Direction & Design System — "404: IDENTITY NOT FOUND"

## 1. Central Creative Concept & Manifesto

- **Primary Theme:** `"404: IDENTITY NOT FOUND"`
- **Supporting Narrative:** `"A work in progress. Not a finished product. Not lost. Still becoming."`
- **Core Philosophy:** This portfolio represents an emerging engineer actively building the next version of himself. The initial artistic mystery (`404`) rapidly resolves into crystal-clear professional clarity (`200_BECOMING`). Visitors never have to struggle to understand who Harsh Kumar is, what he builds, or how to contact him.

### Three Narrative Layers
1. **LAYER A — IDENTITY:** Who am I beyond my résumé? (`Section 00` & `Section 01`)
2. **LAYER B — EXPLORATION:** How do I think, investigate problems, and build connected systems? (`Section 03`, `Section 04`, & `Section 05`)
3. **LAYER C — TRANSFORMATION:** How am I developing my skills, discipline, and engineering rigor over time? (`Section 02` & `Section 06`)

---

## 2. Visual Art Direction

**Aesthetic Formula:** `MONOCHROME EDITORIAL × DIGITAL NOIR × EXPERIMENTAL ENGINEERING`

### Visual Signatures
- Brutalist editorial typography paired with generous negative space.
- High-contrast black-and-white studio portrait photography with background knockout into Obsidian.
- Exposed `1px` structural grid hairlines and technical corner crop marks (`+`).
- Analog film grain (`opacity: 0.035`), subtle halftone dot patterns, and horizontal scanline textures.
- System telemetry annotations: coordinates (`LAT 23.6693° N // LON 86.1511° E`), section indices (`[00]`–`[06]`), and DAG status badges.

### Strict Anti-Patterns (What to Avoid)
- **NO Logo or Wordmark:** Never display a personal monogram, icon logo, or brand wordmark in the navigation header.
- **NO Generic AI Clichés:** No neon purple/blue gradients, no glassmorphism cards everywhere, no floating 3D technology logos, and no decorative matrix code rain.
- **NO Permanent Facial Distortion:** Glitch/scanline displacement only occurs during the initial signal resolution (`Section 00`) and resolves into a sharp, smart, recognizable portrait in `Section 01`.

---

## 3. Color System & Usage Rules

| Token Name | HEX Code | RGB | Usage & Accessibility Rule |
| :--- | :--- | :--- | :--- |
| **Obsidian** (`--bg-obsidian`) | `#0B0B0B` | `11, 11, 11` | Primary background across Sections `00`–`05`. |
| **Elevated Noir** (`--surface-elevated`) | `#121212` | `18, 18, 18` | Technical cards, code containers, and interactive sandboxes. |
| **Archive Paper** (`--text-archive`) | `#E8E5DE` | `232, 229, 222` | Primary headline/body text on Obsidian (WCAG AAA contrast `>15:1`), and inverted surface background in `Section 06`. |
| **Signal Grey** (`--text-signal-grey`) | `#777777` | `119, 119, 119` | Secondary descriptions, muted captions, and inactive tab states. |
| **Muted Silver** (`--border-muted-silver`) | `#B5A99A` | `181, 169, 154` | Used at `15%–35%` opacity for `1px` structural grid borders and dividers. |
| **Signal Red** (`--accent-signal-red`) | `#E34B43` | `227, 75, 67` | **Rare Accent Only:** Live status pulse dot, strikethrough on `404`, active node tags, and primary hover highlights. |
| **Computational Amber** (`--glow-amber`) | `#D97706` | `217, 119, 6` | Restrained warmth used exclusively inside the Section `00` central particle void. |

---

## 4. Typography System

Maximum of **3 typefaces** loaded via `next/font/google` with `display: 'swap'`:

1. **Display / Headlines (`Space Grotesk` — Weights: 500, 700)**
   - Usage: Hero titles, section headers, oversized project index numbers (`01`, `02`, `03`).
   - Tracking: `-0.03em`, uppercase editorial styling.
   - Fluid Scale:
     - Hero (`H1`): `clamp(2.75rem, 6.5vw, 6.25rem)`, line-height `0.94`
     - Section Header (`H2`): `clamp(2rem, 4.5vw, 4rem)`, line-height `1.0`
     - Card Title (`H3`): `clamp(1.25rem, 2vw, 1.75rem)`, line-height `1.2`

2. **Body / Narrative (`DM Sans` — Weights: 400, 500, 700)**
   - Usage: Biographical prose, project problem/solution descriptions, engineering trade-offs.
   - Line Height: `1.65`, comfortable reading measure capped at `60ch–68ch`.

3. **Technical / Telemetry (`IBM Plex Mono` — Weights: 400, 500, 600)**
   - Usage: Navigation indices (`[00_SIGNAL]`), timestamps, coordinates, DAG logs, SQL/Python code blocks, and skill tags.

---

## 5. Section-by-Section Narrative Storyboard

- **PRELOADER — System Initialization:** Pitch-black `#0B0B0B` boot sequence verifying credentials and compiling shaders (`00% -> 100%`), equipped with an immediate `[SKIP INTRO // ESC]` button.
- **SECTION 00 — The Signal:** Computational particle void + `"404: IDENTITY NOT FOUND"` headline + `"Not lost. Still becoming."` subline + resolving scanline portrait preview.
- **SECTION 01 — The Person Behind the Pixels:** Asymmetric 12-column layout pairing Harsh Kumar's background-removed monochrome studio portrait (`harsh.png`) on the left with his clear identity, B.Tech CSE (Data Science) credentials, and 4 technical pillars on the right.
- **SECTION 02 — The Time Skip:** Chronological progression (Bokaro Ispat Sr. Secondary School `84%` → Dr. B. C. Roy Engineering College `CGPA 7.32`), interactive **7-Step Problem-Solving Protocol**, and Product Thinking orientation.
- **SECTION 03 — Inside the System:** Interactive 5-layer architecture graph (`Programming` → `Storage/Cloud` → `Pipelines/Orchestration` → `ML/NLP` → `Interfaces`) connecting every skill directly to verified projects (`P01`, `P02`, `P03`).
- **SECTION 04 — Evidence of Work:** Deep-dive technical case studies for the **Zomato Food Delivery Data Pipeline**, **Student Data Management System (SQL)**, and **Text Mining & Sentiment Analysis**, complete with workflow stages and real Airflow/dbt, MySQL CTE, and Python NLP code tabs.
- **SECTION 05 — The Lab:** Two live client-side interactive sandboxes:
  1. *Cloud ELT & dbt Quality Gate Simulator* (simulates S3 ingestion, Snowflake `COPY INTO`, and dbt schema assertions quarantining null rows).
  2. *Negation-Aware NLP Sentiment Sandbox* (live tokenization, stopword stripping, stemming, and polarity scoring).
- **SECTION 06 — The Next Version:** High-contrast `#E8E5DE` Archive Paper surface inversion featuring `"THE WORK IS STILL IN PROGRESS."`, target roles, 1-click email copy, social links, and the `llms.txt` / JSON-LD modal inspector.