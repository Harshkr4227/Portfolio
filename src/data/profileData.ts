export interface StatItem {
  value: string;
  label: string;
}

export interface ProfileLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface ProfileData {
  name: string;
  sysId: string;
  headlineTitle: string;
  rolePills: string[];
  quote: string;
  location: string;
  degreeTag: string;
  shortBio: string;
  stats: StatItem[];
  links: ProfileLinks;
}

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  extraCount: string;
  repoUrl: string;
  codeTitle: string;
  codeSnippet: string;
}

export interface TechStackCategory {
  id: string;
  category: string;
  subtitle: string;
  items: string[];
}

export interface RepoTreeFile {
  path: string;
  role: string;
  snippet: string;
}

export const PROFILE_DATA: ProfileData = {
  name: "Harsh Kumar",
  sysId: "404 // HK_4227",
  headlineTitle: "Data Engineering, AI/ML & Analytics Developer",
  rolePills: ["Data Engineer", "Data Scientist", "ML & NLP Practitioner"],
  quote: "“Data is signal. Pipelines are symphonies.”",
  location: "Bokaro, Jharkhand, India",
  degreeTag: "B.Tech CSE (Data Science)",
  shortBio:
    "I build cloud ETL pipelines, normalized relational database systems, and applied NLP/ML workflows that turn raw data into reliable products.",
  stats: [
    { value: "03", label: "Core Systems Shipped" },
    { value: "18+", label: "Tech Stack" },
    { value: "04", label: "Engineering Domains" }
  ],
  links: {
    github: "https://github.com/Harshkr4227",
    linkedin: "https://linkedin.com/in/harsh-kumar-214161295",
    twitter: "https://x.com/harshkr4227",
    email: "harshkr4227@gmail.com"
  }
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "P01",
    number: "01",
    category: "Project Cloud Data Pipeline",
    title: "Zomato : Cloud ELT Data Pipeline",
    summary:
      "End-to-end cloud data pipeline. Ingests raw food delivery logs into AWS S3, loads Snowflake via COPY INTO, and orchestrates staged dbt transformations with Apache Airflow.",
    highlights: [
      "AWS S3 data lake ingestion + Snowflake COPY INTO bulk loading",
      "Modular dbt transformations (Staging → Intermediate → Marts)",
      "Automated dbt schema quality tests orchestrated by Airflow DAGs"
    ],
    stack: ["Python", "AWS S3", "Snowflake", "dbt", "Apache Airflow", "SQL"],
    extraCount: "+3",
    repoUrl: "https://github.com/Harshkr4227",
    codeTitle: "dags/zomato_elt_pipeline_dag.py",
    codeSnippet: `from airflow import DAG
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
    ingest_s3 >> load_snowflake >> dbt_transform`
  },
  {
    id: "P02",
    number: "02",
    category: "Project Database & Web App",
    title: "Student Data Management System",
    summary:
      "Normalized MySQL relational backend paired with an analytical dashboard. Computes cohort GPA, attendance benchmarks, and performance reports in real time.",
    highlights: [
      "3NF relational schema with foreign-key constraints & composite indexing",
      "Complex SQL queries using multi-table JOINs, CTEs & aggregations",
      "Interactive HTML/CSS/JS reporting interface with visual charts"
    ],
    stack: ["MySQL", "SQL", "HTML5", "CSS3", "JavaScript"],
    extraCount: "+4",
    repoUrl: "https://github.com/Harshkr4227",
    codeTitle: "sql/student_performance_cte.sql",
    codeSnippet: `WITH StudentSemesterMetrics AS (
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
ORDER BY sgpa DESC;`
  },
  {
    id: "P03",
    number: "03",
    category: "Project NLP & ML System",
    title: "Sentimind : Text Mining & Sentiment Engine",
    summary:
      "Modular NLP pipeline that cleans unstructured text, preserves negation context, and classifies sentiment polarity into Positive, Negative, or Neutral.",
    highlights: [
      "Regex cleaning, tokenization, and negation-aware stopword filtering",
      "Stemming & lemmatization using NLTK and spaCy pipelines",
      "Modular architecture ready for downstream ML classifiers"
    ],
    stack: ["Python", "NLTK", "spaCy", "Sentiment Analysis", "Pandas"],
    extraCount: "+3",
    repoUrl: "https://github.com/Harshkr4227",
    codeTitle: "nlp_pipeline/sentiment_processor.py",
    codeSnippet: `import re, spacy
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords

nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])
stemmer = PorterStemmer()
NEGATIONS = {"not", "no", "never", "hardly"}
STOP_WORDS = set(stopwords.words("english")) - NEGATIONS

def preprocess_text(raw_text: str) -> dict:
    cleaned = re.sub(r"[^a-zA-Z\\s']", " ", raw_text.lower()).strip()
    doc = nlp(cleaned)
    tokens = [t.text for t in doc if not t.is_space and t.text not in STOP_WORDS]
    lemmas = [t.lemma_ for t in doc if t.text in tokens]
    return {"tokens": tokens, "lemmas": lemmas, "stems": [stemmer.stem(t) for t in tokens]}`
  }
];

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    id: "de",
    category: "Data Engineering & Cloud",
    subtitle: "Pipelines, warehousing & orchestration",
    items: [
      "Apache Airflow",
      "dbt (data build tool)",
      "AWS S3",
      "Snowflake",
      "ETL / ELT Pipelines",
      "Data Modeling",
      "Data Quality Tests"
    ]
  },
  {
    id: "lang",
    category: "Languages & Core CS",
    subtitle: "Systems, scripting & query logic",
    items: ["Python", "SQL", "C++", "JavaScript", "Data Structures & Algorithms", "OOP"]
  },
  {
    id: "db",
    category: "Databases & Storage",
    subtitle: "Relational & document stores",
    items: [
      "MySQL",
      "Snowflake Warehouse",
      "Oracle",
      "MongoDB",
      "3NF Schema Design",
      "CTEs & Indexing"
    ]
  },
  {
    id: "ml",
    category: "AI, ML & NLP",
    subtitle: "Text mining & predictive modeling",
    items: [
      "NLTK",
      "spaCy",
      "Sentiment Analysis",
      "Feature Engineering",
      "Text Preprocessing",
      "Classification Models"
    ]
  },
  {
    id: "analytics",
    category: "Data Analysis & Visualization",
    subtitle: "Exploration & statistical plots",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Exploratory Data Analysis (EDA)",
      "Statistical Reasoning"
    ]
  },
  {
    id: "web",
    category: "Web & Developer Tools",
    subtitle: "Interfaces & version control",
    items: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub", "VS Code", "Google Colab"]
  }
];

export const REPO_TREE_FILES: RepoTreeFile[] = [
  {
    path: "public/images/avatar.png",
    role: "Harsh Kumar's original studio portrait (rendered unmodified with B&W CSS layer)",
    snippet: `// Place your portrait file at:
// portfolio/public/images/avatar.png
// Referenced in PortraitShader.tsx via src="/images/avatar.png"`
  },
  {
    path: "public/llms.txt",
    role: "Markdown profile for AI agents & LLM crawlers (mirrored at public/ai.txt)",
    snippet: `# Harsh Kumar — Data Engineering, AI/ML & Analytics Developer
> "404: IDENTITY NOT FOUND — Data is signal. Pipelines are symphonies."
- Title: Data Engineering, AI/ML & Analytics Developer
- Location: Bokaro, Jharkhand, India
- GitHub: https://github.com/Harshkr4227`
  },
  {
    path: "src/data/profileData.ts",
    role: "Single source of truth for copy, skills & projects",
    snippet: `export const PROFILE_DATA = ${JSON.stringify(PROFILE_DATA, null, 2)};`
  },
  {
    path: "src/app/globals.css",
    role: "CSS custom properties, resets, moving grain & grid utilities",
    snippet: `:root {
  --bg-obsidian: #0B0B0B;
  --surface-elevated: #121212;
  --surface-paper: #E8E5DE;
  --text-primary: #E8E5DE;
  --text-secondary: #777777;
  --text-accent: #E34B43;
}`
  },
  {
    path: "src/app/layout.tsx",
    role: "Fonts, OpenGraph, JSON-LD Person schema & AnimationController",
    snippet: `import "./globals.css";
import { Space_Grotesk, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { AnimationController } from "@/context/AnimationController";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0B0B] text-[#E8E5DE] antialiased">
        <AnimationController>{children}</AnimationController>
      </body>
    </html>
  );
}`
  },
  {
    path: "src/app/page.tsx",
    role: "Master narrative page assembling HUD, Canvas & Sections",
    snippet: `import SystemHudNav from "@/components/hud/SystemHudNav";
import Section00Signal from "@/components/sections/Section00Signal";
import Section01Identity from "@/components/sections/Section01Identity";
import Section02TimeSkip from "@/components/sections/Section02TimeSkip";
import Section03System from "@/components/sections/Section03System";
import Section04Projects from "@/components/sections/Section04Projects";
import Section05Contact from "@/components/sections/Section05Contact";

export default function PortfolioPage() {
  return (
    <main id="main-content">
      <SystemHudNav />
      <Section00Signal />
      <Section01Identity />
      <Section02TimeSkip />
      <Section03System />
      <Section04Projects />
      <Section05Contact />
    </main>
  );
}`
  },
  {
    path: "src/context/AnimationController.tsx",
    role: "Lenis smooth scroll + GSAP ScrollTrigger + Progressive Scroll Blur + Moving Grain",
    snippet: `"use client";
// Synchronizes Lenis smooth scrolling, 120fps ref-driven progress bar,
// MovingBackgroundGrain, and ProgressiveScrollBlur.`
  },
  {
    path: "src/components/canvas/PortraitShader.tsx",
    role: "Non-destructive B&W layer + #000000 to #0B0B0B Obsidian blend for /images/avatar.png",
    snippet: `"use client";
import Image from "next/image";
export default function PortraitShader({ bwLayerActive = true }) {
  return (
    <Image
      src="/images/avatar.png"
      alt="Harsh Kumar"
      width={800}
      height={1000}
      priority
      style={{
        filter: bwLayerActive ? "grayscale(100%) contrast(1.12) brightness(0.96)" : "none",
        mixBlendMode: "lighten"
      }}
    />
  );
}`
  }
];

export const LLMS_TXT_CONTENT = `# Harsh Kumar — Data Engineering, AI/ML & Analytics Developer

> 404: IDENTITY NOT FOUND — Data is signal. Pipelines are symphonies. Harsh Kumar is a Data Engineering, AI/ML & Analytics Developer specializing in cloud ETL/ELT pipelines (AWS S3, Snowflake, dbt, Apache Airflow), relational database architectures (MySQL), and natural language processing systems.

## Primary Profiles & Identity

- [GitHub Profile](https://github.com/Harshkr4227): Central code repository housing all pipeline DAGs, SQL analytics, and NLP repositories.
- [LinkedIn Profile](https://linkedin.com/in/harsh-kumar-214161295): Professional trajectory, academic credentials, and career milestones.
- [X / Twitter](https://x.com/harshkr4227): Technical insights, telemetry updates, and industry discourse.
- [Direct Email Contact](mailto:harshkr4227@gmail.com): Direct engineering communication channel for opportunities and collaborations.
- [Interactive Portfolio](https://harshkumar.dev): Full interactive editorial web application featuring real-time telemetry, 3D particle void, and live system architectures.

## Selected Engineering Projects

- [Zomato : Cloud ELT Data Pipeline](https://github.com/Harshkr4227): End-to-end cloud pipeline ingesting raw delivery data into AWS S3, loading Snowflake via COPY INTO, and orchestrating staged dbt transformations with Apache Airflow DAGs.
- [Student Data Management System](https://github.com/Harshkr4227): 3NF normalized MySQL database backend paired with an analytical query engine computing cohort GPAs, attendance benchmarks, and academic standing via CTEs.
- [Sentimind : Text Mining & Sentiment Engine](https://github.com/Harshkr4227): Modular NLP pipeline utilizing NLTK and spaCy for negation-aware text cleaning, lemmatization, and multi-class sentiment polarity classification.

## Tech Stack & Capabilities

- [Apache Airflow](https://airflow.apache.org): Orchestration of multi-stage ETL/ELT workflows, dependency management, and automated dbt execution DAGs.
- [dbt (data build tool)](https://www.getdbt.com): Layered SQL transformation modeling across Staging, Intermediate, and Mart schemas with referential integrity tests.
- [Snowflake Data Cloud](https://www.snowflake.com): Scalable cloud data warehousing, stage creation, and high-throughput COPY INTO ingestion.
- [Amazon Web Services (AWS S3)](https://aws.amazon.com/s3/): Object storage lake architecture for raw semi-structured and batch payload ingestion.
- [Python & Applied NLP](https://www.python.org): Core scripting language driving pipeline operations, spaCy tokenization, NLTK stemming, and Pandas/NumPy analytics.
- [Relational Databases & SQL](https://www.mysql.com): Advanced relational modeling, 3NF normalization, window functions, and complex CTE query optimization in MySQL and Snowflake.`;

export const JSON_LD_SCHEMA = JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harsh Kumar",
    jobTitle: "Data Engineering, AI/ML & Analytics Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bokaro",
      addressRegion: "Jharkhand",
      addressCountry: "IN"
    },
    knowsAbout: [
      "Python",
      "SQL",
      "C++",
      "Data Engineering",
      "AWS S3",
      "Snowflake",
      "dbt",
      "Apache Airflow",
      "MySQL",
      "Machine Learning",
      "Natural Language Processing",
      "NLTK",
      "spaCy"
    ],
    url: "https://github.com/Harshkr4227",
    sameAs: [
      "https://github.com/Harshkr4227",
      "https://linkedin.com/in/harsh-kumar-214161295",
      "https://x.com/harshkr4227"
    ]
  },
  null,
  2
);

export const DEFAULT_PORTRAIT_PATHS: string[] = [
  "/images/avatar.png",
  "images/avatar.png",
  "avatar.png",
  "/avatar.png",
  "avatar_2.jpg",
  "/avatar_2.jpg",
  "/images/avatar_2.jpg",
  "avatar.jpg"
];

export const STORAGE_KEY_PORTRAIT = "hk_portfolio_bound_avatar_2_v1";
