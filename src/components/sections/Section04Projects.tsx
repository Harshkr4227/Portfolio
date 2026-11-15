"use client";

import React, { useState } from "react";
import { Code2, ArrowUpRight, Terminal } from "lucide-react";
import { PROFILE_DATA, PROJECTS_DATA } from "@/data/profileData";

export default function Section04Projects() {
  const [expandedProjectCode, setExpandedProjectCode] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  return (
    <section
      id="projects"
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
              [01 // PROJECTS]
            </div>
            <h2
              className="font-display text-3xl sm:text-5xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Selected Work
            </h2>
            <p
              className="text-sm sm:text-base mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Selected work spanning cloud ELT pipelines, relational databases, and NLP systems.
            </p>
          </div>
          <a
            href={PROFILE_DATA.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs px-4 py-2.5 border hover:border-[#E34B43] flex items-center gap-2 transition-colors"
            style={{
              backgroundColor: "var(--surface-elevated)",
              borderColor: "rgba(181, 169, 154, 0.3)",
              color: "var(--text-primary)"
            }}
          >
            <span>VIEW ALL ON GITHUB</span>
            <span
              className="px-1.5 py-0.5"
              style={{
                backgroundColor: "var(--bg-obsidian)",
                color: "var(--text-accent)"
              }}
            >
              03
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => {
            const isCodeOpen = expandedProjectCode === project.id;
            return (
              <article
                key={project.id}
                className="border hover:border-[#E8E5DE]/60 transition-colors flex flex-col justify-between p-6"
                style={{
                  backgroundColor: "var(--surface-elevated)",
                  borderColor: "rgba(181, 169, 154, 0.3)"
                }}
              >
                <div>
                  <div
                    className="flex items-center justify-between gap-2 pb-4 mb-4 border-b font-mono-tech text-xs"
                    style={{ borderColor: "rgba(181, 169, 154, 0.15)" }}
                  >
                    <span
                      className="text-2xl font-display font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.number}
                    </span>
                    <span
                      className="px-2.5 py-1 border text-[11px]"
                      style={{
                        backgroundColor: "var(--bg-obsidian)",
                        borderColor: "rgba(181, 169, 154, 0.25)",
                        color: "var(--text-accent)"
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    className="font-display text-xl sm:text-2xl font-bold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.summary}
                  </p>

                  <ul
                    className="space-y-1.5 mb-6 border-l pl-3"
                    style={{ borderColor: "rgba(181, 169, 154, 0.25)" }}
                  >
                    {project.highlights.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-xs leading-snug"
                        style={{ color: "var(--text-body-soft)" }}
                      >
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-5 font-mono-tech text-[11px]">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 border"
                        style={{
                          backgroundColor: "var(--bg-obsidian)",
                          borderColor: "rgba(181, 169, 154, 0.25)",
                          color: "var(--text-primary)"
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    <span
                      className="px-2 py-1 border"
                      style={{
                        backgroundColor: "var(--bg-obsidian)",
                        borderColor: "rgba(181, 169, 154, 0.15)",
                        color: "var(--text-secondary)"
                      }}
                    >
                      {project.extraCount}
                    </span>
                  </div>

                  <div
                    className="pt-4 border-t flex items-center justify-between gap-2 font-mono-tech text-xs"
                    style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
                  >
                    <button
                      onClick={() =>
                        setExpandedProjectCode(isCodeOpen ? null : project.id)
                      }
                      className="px-3 py-2 border transition-colors cursor-pointer flex items-center gap-1.5"
                      style={{
                        backgroundColor: isCodeOpen
                          ? "var(--surface-paper)"
                          : "var(--bg-obsidian)",
                        color: isCodeOpen ? "var(--text-on-light)" : "var(--text-primary)",
                        borderColor: isCodeOpen
                          ? "var(--surface-paper)"
                          : "rgba(181, 169, 154, 0.3)",
                        fontWeight: isCodeOpen ? 600 : 400
                      }}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{isCodeOpen ? "HIDE CODE" : "INSPECT CODE"}</span>
                    </button>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border hover:border-[#E34B43] flex items-center gap-1.5 transition-colors"
                      style={{
                        backgroundColor: "var(--bg-obsidian)",
                        borderColor: "rgba(181, 169, 154, 0.3)",
                        color: "var(--text-primary)"
                      }}
                    >
                      <span>CODE</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        style={{ color: "var(--text-accent)" }}
                      />
                    </a>
                  </div>

                  {isCodeOpen && (
                    <div
                      className="mt-4 border p-3 font-mono-tech text-[11px]"
                      style={{
                        backgroundColor: "var(--bg-obsidian)",
                        borderColor: "rgba(181, 169, 154, 0.3)"
                      }}
                    >
                      <div
                        className="flex items-center justify-between pb-2 mb-2 border-b text-[10px]"
                        style={{
                          borderColor: "rgba(181, 169, 154, 0.15)",
                          color: "var(--text-secondary)"
                        }}
                      >
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3 h-3" style={{ color: "var(--text-accent)" }} />
                          <span>{project.codeTitle}</span>
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(project.codeSnippet);
                            setCopiedCodeId(project.id);
                            setTimeout(() => setCopiedCodeId(null), 1500);
                          }}
                          className="hover:text-[#E34B43] cursor-pointer"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {copiedCodeId === project.id ? "[COPIED]" : "[COPY]"}
                        </button>
                      </div>
                      <pre
                        className="overflow-x-auto leading-relaxed max-h-56"
                        style={{ color: "var(--text-body-soft)" }}
                      >
                        <code>{project.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
