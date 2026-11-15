# Text Color Template & Typography Contrast System
**Project:** Harsh Kumar Portfolio (`404 // HK_4227`)  
**Theme:** `MONOCHROME EDITORIAL × DIGITAL NOIR`

---

## 1. Master Text Color Tokens

Use these exact six text color tokens across the entire application to preserve brutalist editorial contrast and strict visual hierarchy.

| Token Name | CSS Variable | HEX | RGB | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Archive Paper** | `--text-primary` | `#E8E5DE` | `232, 229, 222` | Main `H1`–`H3` headlines, active buttons, emphasized body copy, and code snippets on dark surfaces. |
| **Archive Muted** | `--text-body-soft` | `rgba(232, 229, 222, 0.85)` | `232, 229, 222` (`85%`) | Project bullet points, readable prose blocks, and multi-line explanations. |
| **Signal Grey** | `--text-secondary` | `#777777` | `119, 119, 119` | Concise 2-line project summaries, card subtitles, inactive nav tabs, and metadata captions. |
| **Muted Silver** | `--text-telemetry` | `#B5A99A` | `181, 169, 154` | Corner crop marks (`+`), subtle coordinates, and secondary monospace indices (`70%` opacity). |
| **Signal Red** | `--text-accent` | `#E34B43` | `227, 75, 67` | **Rare Accent:** Section eyebrows (`[01 // PROJECTS]`), `404` strikethrough, tool counts, and hover states. |
| **Obsidian Ink** | `--text-on-light` | `#0B0B0B` | `11, 11, 11` | Primary text on `#E8E5DE` Archive Paper surfaces (active pills, primary CTAs, and `#contact` section). |

---

## 2. Surface-by-Surface Text Pairing Rules

### A. On Dark Surfaces (`#0B0B0B` Obsidian & `#121212` Elevated Noir)
- **Hero & Section Titles (`Space Grotesk`):** Always use `#E8E5DE` (`15.6:1` WCAG AAA contrast on `#0B0B0B`).
- **Category & Section Tags (`IBM Plex Mono`):** Use `#E34B43` for the eyebrow tag (e.g., `[02 // TECH STACK]`) and `#777777` for supporting timestamps.
- **Descriptions & Subtitles (`DM Sans`):** Use `#777777` (`4.6:1` WCAG AA contrast on `#0B0B0B`) to create clear visual separation beneath `#E8E5DE` headings.
- **Tech Stack Pills & Code Drawers:** `#E8E5DE` text inside a `#0B0B0B` container bordered by `rgba(181, 169, 154, 0.25)`.

### B. On Inverted Light Surfaces (`#E8E5DE` Archive Paper — Section `#contact` & Active Pills)
- **Primary Headlines & CTA Labels:** `#0B0B0B` (`15.6:1` WCAG AAA contrast).
- **Secondary Subtitles & Location Metadata:** `rgba(11, 11, 11, 0.75)` (`10.2:1` contrast).
- **Active Filter / Nav Pill State:** Background `#E8E5DE` paired with `#0B0B0B` `font-weight: 600` text.

---

## 3. Drop-In CSS Custom Properties & Utility Template

Copy this stylesheet block into `globals.css` or any component stylesheet:

```css
:root {
  /* Surface Tokens */
  --bg-obsidian: #0B0B0B;
  --surface-elevated: #121212;
  --surface-paper: #E8E5DE;

  /* Text Color Tokens */
  --text-primary: #E8E5DE;
  --text-body-soft: rgba(232, 229, 222, 0.85);
  --text-secondary: #777777;
  --text-telemetry: rgba(181, 169, 154, 0.75);
  --text-accent: #E34B43;
  --text-amber-glow: #D97706;
  --text-on-light: #0B0B0B;
  --text-on-light-muted: rgba(11, 11, 11, 0.75);
}

/* Semantic Text Classes */
.text-headline {
  color: var(--text-primary);
}

.text-prose {
  color: var(--text-body-soft);
}

.text-muted {
  color: var(--text-secondary);
}

.text-eyebrow {
  color: var(--text-accent);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.text-404-strike {
  color: var(--text-accent);
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.text-inverted {
  color: var(--text-on-light);
}

.text-link-hover {
  color: var(--text-secondary);
  transition: color 180ms ease;
}

.text-link-hover:hover {
  color: var(--text-primary);
}
```

---

## 4. Strict Color Usage Don'ts
1. **Never use `#E34B43` (Signal Red) for long paragraphs:** Reserve Signal Red strictly for short labels (`< 4 words`), underlines, strikethroughs, or hover states.
2. **Never use pure `#FFFFFF` white for text:** Always use `#E8E5DE` (Archive Paper) to maintain the warm editorial print aesthetic and prevent harsh screen glare.
3. **Never introduce external accent colors:** Avoid blue hyperlinks (`#0000EE`), neon greens, or purple gradients anywhere in typography.