import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt", "/ai.txt"]
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt", "/ai.txt"]
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/ai.txt"]
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt", "/ai.txt"]
      },
      {
        userAgent: "Applebot-Extended",
        allow: ["/", "/llms.txt", "/ai.txt"]
      }
    ],
    sitemap: "https://harshkumar.dev/sitemap.xml"
  };
}
