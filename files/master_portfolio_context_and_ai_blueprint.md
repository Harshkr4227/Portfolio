# MASTER CONTEXT & AI BLUEPRINT — HARSH KUMAR PORTFOLIO (`404 // HK_4227`)

> **PURPOSE OF THIS FILE:** This single master document contains 100% of the context, factual biography, design tokens, technical architecture, component specifications, portrait rendering rules, and deployment instructions for **Harsh Kumar's** personal portfolio. Any AI assistant (Cursor, Claude, ChatGPT, v0, Copilot, Windsurf) or developer reading this single file has everything needed to understand, maintain, or extend this website.

---

## 1. AI AGENT & DEVELOPER RULES (READ FIRST)

1. **Zero Fabrication Policy:** Never invent employment history, internships, fake performance percentages, client names, or awards. Only use the verified projects, skills, and academic facts documented in Section 2.
2. **Strict Color & Theme Discipline:** Preserve the **Monochrome Editorial × Digital Noir (`404: IDENTITY NOT FOUND`)** palette (`#0B0B0B`, `#121212`, `#E8E5DE`, `#777777`, `#B5A99A`, `#E34B43`). Never introduce purple/blue AI gradients, neon cyberpunk colors, or glassmorphism clutter.
3. **No Logo / No Wordmark:** Do not place a graphic logo or monogram in the header. The top-left identity marker is strictly the system status dot (`#E34B43`) + `404 // HK_4227` + live scroll percentage (`000%`–`100%`).
4. **Concise Scannable Hierarchy (Inspired by `mantukumar.online`):** Keep copy punchy and scannable (2-line project summaries, 3 concise bullet points per project, categorized Tech Stack pills). Do not add a standalone verbose Education section—keep `B.Tech CSE (Data Science)` as a clean badge on the Hero portrait card.
5. **Non-Destructive Portrait Pipeline (`avatar_2.jpg`):** Never alter, crop, or run destructive pixel manipulation on Harsh Kumar's photo. Render `avatar_2.jpg` via a standard `<img />` tag with the CSS Black & White layer (`grayscale(100%) contrast(1.12) brightness(0.96)`) and `#000000` $\rightarrow$ `#0B0B0B` background blending.

---

## 2. VERIFIED FACTUAL SOURCE OF TRUTH (IDENTITY & PROFILE)

- **Full Name:** Harsh Kumar
- **System ID:** `SYS_ID // HK_4227`
- **Primary Title:** Data Engineering, AI/ML & Analytics Developer
- **Rotating Role Pills:** `Data Engineer` · `Data Scientist` · `ML & NLP Practitioner`
- **Signature Quote:** *"Data is signal. Pipelines are symphonies."*
- **Short Bio:** *"I build cloud ETL pipelines, normalized relational database systems, and applied NLP/ML workflows that turn raw data into reliable products."*
- **Location:** Bokaro, Jharkhand, India
- **Academic Tag:** B.Tech in Computer Science Engineering (Data Science), Dr. B. C. Roy Engineering College (2023–2027 | CGPA: 7.32) | Class XII CBSE: Bokaro Ispat Sr. Secondary School 8B (84%)
- **Status:** Online // Open to entry-level Data Engineering, Data Science, and AI/ML opportunities, internships, and technical collaborations.

### Hero Quick-Scan Metrics
- **`03`** Core Systems Shipped
- **`18+`** Tech Stack
- **`04`** Engineering Domains

### Verified External Links
- **GitHub:** `https://github.com/Harshkr4227`
- **LinkedIn:** `https://linkedin.com/in/harsh-kumar-214161295`
- **X (Twitter):** `https://x.com/harshkr4227`
- **Direct Email:** `harshkr4227@gmail.com`

---

## 3. SELECTED PROJECTS (SECTION `#projects`)

### Project 01 // Zomato : Cloud ELT Data Pipeline
- **Category Badge:** `Project Cloud Data Pipeline`
- **Concise Summary:** End-to-end cloud data pipeline. Ingests raw food delivery logs into AWS S3, loads Snowflake via `COPY INTO`, and orchestrates staged dbt transformations with Apache Airflow.
- **3 Key Highlights:**
  - AWS S3 data lake ingestion + Snowflake `COPY INTO` bulk loading
  - Modular dbt transformations (`Staging` $\rightarrow$ `Intermediate` $\rightarrow$ `Marts`)
  - Automated dbt schema quality tests orchestrated by Airflow DAGs
- **Stack Pills:** `Python`, `AWS S3`, `Snowflake`, `dbt`, `Apache Airflow`, `SQL` (`+3`)
- **Inspectable Code Drawer (`dags/zomato_elt_pipeline_dag.py`):**
  ```python
  from airflow import DAG
  from airflow.operators.python import PythonOperator
  from airflow.operators.bash import BashOperator
  from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
  from datetime import datetime

  with DAG(
      dag_id="zomato_cloud_elt_pipeline",
      schedule_interval="@daily",
      start_date=datetime(2025, 1, 1),
      catchup=False,
  ) as dag:
      ingest_s3 = PythonOperator(
          task_id="ingest_raw_to_s3",
          python_callable=upload_zomato_batch_to_s3,
      )
      load_snowflake = SnowflakeOperator(
          task_id="snowflake_copy_into",
          sql="COPY INTO RAW.ZOMATO_ORDERS FROM @RAW.S3_STAGE FILE_FORMAT=(TYPE='CSV' SKIP_HEADER=1);",
      )
      dbt_transform = BashOperator(
          task_id="dbt_run_layers",
          bash_command="dbt run --select staging intermediate marts && dbt test",
      )
      ingest_s3 >> load_snowflake >> dbt_transform
  ```

### Project 02 // Student Data Management System
- **Category Badge:** `Project Database & Web App`
- **Concise Summary:** Normalized MySQL relational backend paired with an analytical dashboard. Computes cohort GPA, attendance benchmarks, and performance reports in real time.
- **3 Key Highlights:**
  - 3NF relational schema with foreign-key constraints & composite indexing
  - Complex SQL queries using multi-table `JOIN`s, `CTE`s & aggregations
  - Interactive HTML/CSS/JS reporting interface with visual charts
- **Stack Pills:** `MySQL`, `SQL`, `HTML5`, `CSS3`, `JavaScript` (`+4`)
- **Inspectable Code Drawer (`sql/student_performance_cte.sql`):**
  ```sql
  WITH StudentSemesterMetrics AS (
      SELECT 
          s.student_id, s.full_name, d.department_name, e.semester,
          ROUND(SUM(g.grade_points * c.credits) / NULLIF(SUM(c.credits), 0), 2) AS sgpa,
          ROUND(AVG(e.attendance_pct), 1) AS attendance_pct
      FROM students s
      JOIN departments d ON s.department_id = d.department_id
      JOIN enrollments e ON s.student_id = e.student_id
      JOIN courses c ON e.course_id = c.course_id
      LEFT JOIN grades g ON e.enrollment_id = g.enrollment_id
      GROUP BY s.student_id, s.full_name, d.department_name, e.semester
  )
  SELECT *,
      CASE 
          WHEN sgpa >= 8.0 AND attendance_pct >= 85 THEN 'DISTINCTION'
          WHEN sgpa < 6.0 OR attendance_pct < 75 THEN 'INTERVENTION_REQUIRED'
          ELSE 'ON_TRACK'
      END AS standing
  FROM StudentSemesterMetrics
  ORDER BY sgpa DESC;
  ```

### Project 03 // Sentimind : Text Mining & Sentiment Engine
- **Category Badge:** `Project NLP & ML System`
- **Concise Summary:** Modular NLP pipeline that cleans unstructured text, preserves negation context, and classifies sentiment polarity into Positive, Negative, or Neutral.
- **3 Key Highlights:**
  - Regex cleaning, tokenization, and negation-aware stopword filtering
  - Stemming & lemmatization using NLTK and spaCy pipelines
  - Modular architecture ready for downstream ML classifiers
- **Stack Pills:** `Python`, `NLTK`, `spaCy`, `Sentiment Analysis`, `Pandas` (`+3`)
- **Inspectable Code Drawer (`nlp_pipeline/sentiment_processor.py`):**
  ```python
  import re, spacy
  from nltk.stem import PorterStemmer
  from nltk.corpus import stopwords

  nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
  stemmer = PorterStemmer()
  NEGATIONS = {"not", "no", "never", "hardly"}
  STOP_WORDS = set(stopwords.words("english")) - NEGATIONS

  def preprocess_text(raw_text: str) -> dict:
      cleaned = re.sub(r"[^a-zA-Z\s']", " ", raw_text.lower()).strip()
      doc = nlp(cleaned)
      tokens = [t.text for t in doc if not t.is_space and t.text not in STOP_WORDS]
      lemmas = [t.lemma_ for t in doc if t.text in tokens]
      return {"tokens": tokens, "lemmas": lemmas, "stems": [stemmer.stem(t) for t in tokens]}
  ```

---

## 4. CATEGORIZED TECH STACK MATRIX (SECTION `#skills`)

Filterable by domain tabs (`All (18+)`, `Data Eng`, `Languages`, `Databases`, `AI & NLP`):

1. **`STACK_01` // Data Engineering & Cloud** (*Pipelines, warehousing & orchestration*):
   - `Apache Airflow`, `dbt (data build tool)`, `AWS S3`, `Snowflake`, `ETL / ELT Pipelines`, `Data Modeling`, `Data Quality Tests`
2. **`STACK_02` // Languages & Core CS** (*Systems, scripting & query logic*):
   - `Python`, `SQL`, `C++`, `JavaScript`, `Data Structures & Algorithms`, `OOP`
3. **`STACK_03` // Databases & Storage** (*Relational & document stores*):
   - `MySQL`, `Snowflake Warehouse`, `Oracle`, `MongoDB`, `3NF Schema Design`, `CTEs & Indexing`
4. **`STACK_04` // AI, ML & NLP** (*Text mining & predictive modeling*):
   - `NLTK`, `spaCy`, `Sentiment Analysis`, `Feature Engineering`, `Text Preprocessing`, `Classification Models`
5. **`STACK_05` // Data Analysis & Visualization** (*Exploration & statistical plots*):
   - `Pandas`, `NumPy`, `Matplotlib`, `Exploratory Data Analysis (EDA)`, `Statistical Reasoning`
6. **`STACK_06` // Web & Developer Tools** (*Interfaces & version control*):
   - `HTML5`, `CSS3`, `JavaScript`, `Git`, `GitHub`, `VS Code`, `Google Colab`

---

## 5. DESIGN SYSTEM, COLOR TOKENS & TYPOGRAPHY

### 5.1. Color Palette
| Token | HEX | RGB | Role & Rules |
| :--- | :--- | :--- | :--- |
| **Obsidian** | `#0B0B0B` | `11, 11, 11` | Primary background across `#home`, `#projects`, `#skills`, and `#lab`. |
| **Elevated Noir** | `#121212` | `18, 18, 18` | Project cards, Tech Stack cards, metric boxes, and code drawers. |
| **Archive Paper** | `#E8E5DE` | `232, 229, 222` | Primary headlines, active filter pills, primary CTAs, and inverted `#contact` background. |
| **Signal Grey** | `#777777` | `119, 119, 119` | Secondary descriptions, subtitles, and inactive tabs. |
| **Muted Silver** | `#B5A99A` | `181, 169, 154` | Used at `20%–35%` opacity for `1px` structural grid borders and dividers. |
| **Signal Red** | `#E34B43` | `227, 75, 67` | **Rare Accent:** Top scroll progress bar gradient tip, status dot, `404` strikethrough, hero name underline, and category badges. |
| **Amber Glow** | `#D97706` | `217, 119, 6` | Restrained warmth used inside the Hero 3D particle void canvas. |

### 5.2. Typography (`display=swap`)
- **Display / Headlines (`Space Grotesk`, Bold 700, `-0.03em` tracking):**
  - Hero `H1`: `text-5xl sm:text-7xl`, uppercase, line-height `0.95`.
  - Section `H2`: `text-3xl sm:text-5xl`, bold.
  - Card `H3`: `text-xl sm:text-2xl`, bold.
- **Body Copy (`DM Sans`, 400 / 500):**
  - Concise 2-line project summaries and bio copy (`text-sm sm:text-base`).
- **Technical / Telemetry (`IBM Plex Mono`, 400 / 600):**
  - Scroll progress readout (`042%`), section tags (`[01 // PROJECTS]`), stack pills, and inspectable code blocks.

---

## 6. TECHNICAL & PERFORMANCE ARCHITECTURE

### 6.1. Top Scroll Progress Bar (`CLS = 0.000`)
- Pinned to the very top edge (`height: 3px`) of the fixed header (`<header role="banner">`).
- Driven by a passive scroll listener throttled with `window.requestAnimationFrame`.
- Uses GPU-composited `transform: scaleX(scrollProgress / 100)` with `transform-origin: left` and `background: linear-gradient(90deg, #E8E5DE 0%, #E34B43 100%)`.

### 6.2. Deferred 3D Computational Particle Void (`ComputationalVoidCanvas`)
- Renders 190 orbital particles (`70` when `prefers-reduced-motion` is enabled) around a central gravitational void in `#home`.
- Wrapped in `<Suspense>` and monitored by an `IntersectionObserver` (`threshold: 0.05`) that automatically pauses the `requestAnimationFrame` loop (`0% GPU`) the moment the visitor scrolls past `#home`.

### 6.3. Portrait Rendering & Blending Pipeline (`avatar_2.jpg`)
- **Source File:** `public/avatar_2.jpg` (Harsh Kumar's studio portrait on a `#000000` black backdrop).
- **Non-Destructive CSS Styling:**
  ```css
  filter: grayscale(100%) contrast(1.12) brightness(0.96);
  mix-blend-mode: lighten;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
  ```
- **Web Background Integration:** Container uses `radial-gradient(circle at 50% 42%, #000000 48%, #050505 74%, #0B0B0B 100%)` plus an inner radial vignette overlay so the `#000000` image background merges seamlessly into the `#0B0B0B` website surface.
- **Interactive B&W Toggle:** Visitors or Harsh can toggle `[B&W: ON/OFF]` in the header or portrait card footer to switch between the monochrome editorial grade and original color.

### 6.4. Interactive System Sandbox (`#lab`)
- **Tab 01 (`[01. CLOUD ELT DAG]`):** Interactive 4-stage batch simulator (`01 S3 Lake` $\rightarrow$ `02 Snowflake` $\rightarrow$ `03 dbt Test` $\rightarrow$ `04 BI Mart`).
- **Tab 02 (`[02. NLP SENTIMENT]`):** Real-time negation-aware sentiment evaluator that tokenizes user input and computes live polarity scores (`POSITIVE`, `NEGATIVE`, `NEUTRAL`).

---

## 7. AI & SEARCH ENGINE DISCOVERABILITY (`/llms.txt` + `JSON-LD`)

1. **Embedded `application/ld+json` (`Person` Schema):** Injected in the root component declaring Harsh Kumar's name, job title (`Data Engineering, AI/ML & Analytics Developer`), location (`Bokaro, Jharkhand, India`), `knowsAbout` array, and social profile URLs.
2. **`public/llms.txt` Endpoint & Inspector Modal:** Clicking `[LLMS.TXT]` in the top header opens a modal displaying the exact `/llms.txt` Markdown and `JSON-LD` schema with a 1-click `[COPY]` button.

---

## 8. PRODUCTION DEPLOYMENT QUICKSTART (NEXT.JS / VERCEL / CODESANDBOX)

1. Place **`avatar_2.jpg`** inside your project's **`public/avatar_2.jpg`** folder.
2. Place **`llms.txt`** inside **`public/llms.txt`**.
3. Use **`portfolio.jsx`** as your main page component (`src/app/page.tsx` or `src/App.jsx`).
4. Install `lucide-react` (`npm install lucide-react`) and run `npm run dev` or deploy directly to Vercel.