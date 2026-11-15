"use client";

import React, { useState, useMemo } from "react";
import { TECH_STACK_CATEGORIES } from "@/data/profileData";

export default function Section03System() {
  const [selectedStackCategory, setSelectedStackCategory] = useState<string>("ALL");

  const filteredTechCategories = useMemo(() => {
    if (selectedStackCategory === "ALL") return TECH_STACK_CATEGORIES;
    return TECH_STACK_CATEGORIES.filter((c) => c.id === selectedStackCategory);
  }, [selectedStackCategory]);

  return (
    <section
      id="skills"
      className="py-20 border-b"
      style={{
        backgroundColor: "var(--bg-obsidian)",
        borderColor: "rgba(181, 169, 154, 0.2)"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div
          className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-10 border-b"
          style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
        >
          <div>
            <div
              className="font-mono-tech text-xs uppercase tracking-[0.12em] mb-2"
              style={{ color: "var(--text-accent)" }}
            >
              [02 // TECH STACK]
            </div>
            <h2
              className="font-display text-3xl sm:text-5xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Tech Stack
            </h2>
            <p
              className="text-sm sm:text-base mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Technologies and tools I use to build data pipelines, databases, and ML software.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 font-mono-tech text-xs">
            {[
              { id: "ALL", label: "All (18+)" },
              { id: "de", label: "Data Eng" },
              { id: "lang", label: "Languages" },
              { id: "db", label: "Databases" },
              { id: "ml", label: "AI & NLP" }
            ].map((tab) => {
              const active = selectedStackCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStackCategory(tab.id)}
                  className="px-3 py-1.5 border transition-colors cursor-pointer"
                  style={{
                    backgroundColor: active
                      ? "var(--surface-paper)"
                      : "var(--surface-elevated)",
                    color: active ? "var(--text-on-light)" : "var(--text-secondary)",
                    borderColor: active
                      ? "var(--surface-paper)"
                      : "rgba(181, 169, 154, 0.25)",
                    fontWeight: active ? 600 : 400
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTechCategories.map((group, idx) => (
            <div
              key={group.id}
              className="border p-6 flex flex-col justify-between hover:border-[#E8E5DE]/50 transition-colors"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.3)"
              }}
            >
              <div>
                <div
                  className="flex items-center justify-between font-mono-tech text-[11px] mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span>STACK_0{idx + 1}</span>
                  <span style={{ color: "var(--text-accent)" }}>
                    {group.items.length} TOOLS
                  </span>
                </div>
                <h3
                  className="font-display text-xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {group.category}
                </h3>
                <p
                  className="text-xs mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {group.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 font-mono-tech text-xs">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 border hover:border-[#E34B43] transition-colors"
                    style={{
                      backgroundColor: "var(--bg-obsidian)",
                      borderColor: "rgba(181, 169, 154, 0.25)",
                      color: "var(--text-primary)"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
