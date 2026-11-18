import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AnimationController } from "@/context/AnimationController";
import { JSON_LD_SCHEMA, PROFILE_DATA } from "@/data/profileData";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

const metaDescription =
  "Harsh Kumar — Data Engineering, AI/ML & Analytics Developer specializing in AWS S3, Snowflake, dbt, Apache Airflow, MySQL, and NLP systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://harshkumar.dev"),
  title: `${PROFILE_DATA.name} — ${PROFILE_DATA.headlineTitle}`,
  description: metaDescription,
  keywords: [
    "Harsh Kumar",
    "Data Engineering",
    "Data Science",
    "Machine Learning",
    "NLP",
    "Snowflake",
    "dbt",
    "Apache Airflow",
    "AWS S3",
    "Python",
    "SQL",
    "404 HK_4227"
  ],
  authors: [{ name: PROFILE_DATA.name, url: PROFILE_DATA.links.github }],
  creator: PROFILE_DATA.name,
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/images/favicon.svg",
    apple: [
      { url: "/images/favicon.svg", type: "image/svg+xml" }
    ]
  },
  openGraph: {
    title: `${PROFILE_DATA.name} — ${PROFILE_DATA.headlineTitle}`,
    description: metaDescription,
    url: "https://harshkumar.dev",
    siteName: `${PROFILE_DATA.name} Portfolio`,
    images: [
      {
        url: "/images/avatar.png",
        width: 800,
        height: 1000,
        alt: `${PROFILE_DATA.name} Portrait`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE_DATA.name} — ${PROFILE_DATA.headlineTitle}`,
    description: metaDescription,
    creator: "@harshkr4227",
    images: ["/images/avatar.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD_SCHEMA }}
        />
      </head>
      <body className="bg-[#0B0B0B] text-[#E8E5DE] antialiased selection:bg-[#EF5B53] selection:text-[#0B0B0B]">
        <AnimationController>{children}</AnimationController>
      </body>
    </html>
  );
}
