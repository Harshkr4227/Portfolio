# Production Deployment, Asset Binding & SEO Checklist
**Project:** Harsh Kumar Portfolio (`404 // HK_4227`)  

Follow this checklist when moving `portfolio.jsx` and the Markdown context files into a live **Next.js (App Router)** repository on GitHub and deploying to **Vercel**, **Netlify**, or **CodeSandbox**.

---

## 1. Placing Your Portrait (`avatar_2.jpg`) in Production

To ensure every visitor on the internet immediately sees your exact portrait with the B&W editorial layer and zero file-binding prompts:

1. Copy your image file **`avatar_2.jpg`** into the Next.js **`public/`** directory at the root of your project:
   ```text
   your-nextjs-repo/
   └── public/
       ├── avatar_2.jpg          <-- Primary lookup path
       ├── llms.txt              <-- AI crawler profile
       └── robots.txt
   ```
2. Because `DEFAULT_PORTRAIT_PATHS` in `portfolio.jsx` checks `"avatar_2.jpg"` and `"/avatar_2.jpg"` first, the `<img />` tag will resolve `public/avatar_2.jpg` immediately on initial page load (`200 OK`) for all visitors across desktop and mobile.

---

## 2. Publishing `llms.txt` and `robots.txt` for AI & Search Crawlers

1. Copy the contents of **`public/llms.txt`** into `/public/llms.txt` in your Next.js repository so it is publicly reachable at:
   ```text
   https://your-domain.com/llms.txt
   ```
2. Create **`public/robots.txt`** (or `src/app/robots.ts`) with explicit allowances for both traditional search engines and AI agents:
   ```txt
   User-agent: *
   Allow: /

   User-agent: GPTBot
   Allow: /
   Allow: /llms.txt

   User-agent: ClaudeBot
   Allow: /
   Allow: /llms.txt

   User-agent: PerplexityBot
   Allow: /
   Allow: /llms.txt

   Sitemap: https://your-domain.com/sitemap.xml
   ```

---

## 3. Next.js `layout.tsx` Metadata Template

Drop this metadata configuration into `src/app/layout.tsx` when deploying your Next.js App Router build:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harsh Kumar — Data Engineering, AI/ML & Analytics Developer",
  description:
    "Portfolio of Harsh Kumar — Data Engineering, AI/ML & Analytics Developer building cloud ELT pipelines (AWS S3, Snowflake, dbt, Airflow), MySQL systems, and NLP workflows.",
  keywords: [
    "Harsh Kumar",
    "Data Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Python",
    "SQL",
    "AWS S3",
    "Snowflake",
    "dbt",
    "Apache Airflow",
    "NLP",
    "Bokaro"
  ],
  authors: [{ name: "Harsh Kumar", url: "https://github.com/Harshkr4227" }],
  openGraph: {
    title: "Harsh Kumar — Data Engineering, AI/ML & Analytics Developer",
    description:
      "Data is signal. Pipelines are symphonies. Explore cloud ELT pipelines, relational database systems, and NLP engines built by Harsh Kumar.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/avatar_2.jpg",
        width: 800,
        height: 1000,
        alt: "Harsh Kumar — Data Engineering, AI/ML & Analytics Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kumar — Data Engineering, AI/ML & Analytics Developer",
    description:
      "Cloud ELT pipelines, relational databases, and applied NLP systems.",
    creator: "@harshkr4227",
    images: ["/avatar_2.jpg"]
  }
};
```

---

## 4. Pre-Launch Verification Checklist

- [ ] **Portrait Resolution:** Verify `/avatar_2.jpg` returns HTTP `200` and toggles smoothly between `[B&W: ON]` and `[B&W: OFF]`.
- [ ] **Top Scroll Progress Bar:** Scroll from top (`000%`) to bottom (`100%`) and confirm smooth 60fps progress bar tracking.
- [ ] **Project Code Drawers:** Click `[INSPECT CODE]` on all 3 projects (*Zomato Cloud ELT*, *Student SQL System*, *Sentimind NLP*) and verify syntax display + `[COPY]` button functionality.
- [ ] **Tech Stack Filter Pills:** Click `All (18+)`, `Data Eng`, `Languages`, `Databases`, and `AI & NLP` in `#skills` to verify instant category filtering.
- [ ] **AI Discoverability:** Click `[LLMS.TXT]` in the top header and verify both `/llms.txt` and `JSON-LD Schema` tabs copy cleanly.