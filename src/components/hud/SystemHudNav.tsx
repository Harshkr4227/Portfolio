"use client";

import React, { useState, useEffect, useRef } from "react";
import { FolderTree, X, FileCode } from "lucide-react";
import {
  PROFILE_DATA,
  REPO_TREE_FILES,
  LLMS_TXT_CONTENT,
  JSON_LD_SCHEMA,
  RepoTreeFile
} from "@/data/profileData";
import { useAnimationController } from "@/context/AnimationController";

export interface SystemHudNavProps {
  currentActiveSection?: string;
  onSectionSelect?: (id: string) => void;
}

export default function SystemHudNav({
  currentActiveSection,
  onSectionSelect
}: SystemHudNavProps) {
  const { reducedMotion, isAtmosphereEnabled, toggleFxAtmosphere } = useAnimationController();

  const [activeSection, setActiveSection] = useState<string>("home");

  // Direct DOM Refs for 120fps Hardware-Accelerated Scroll Progress Bar
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  // Modals: Repo Structure Inspector & AI Discoverability
  const [repoModalOpen, setRepoModalOpen] = useState(false);
  const [selectedTreeFile, setSelectedTreeFile] = useState<RepoTreeFile>(REPO_TREE_FILES[0]);
  const [copiedTreeSnippet, setCopiedTreeSnippet] = useState(false);

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalTab, setAiModalTab] = useState<"llms" | "jsonld">("llms");
  const [copiedAiDoc, setCopiedAiDoc] = useState(false);

  // Sync external active section prop if provided
  useEffect(() => {
    if (currentActiveSection) {
      setActiveSection(currentActiveSection);
    }
  }, [currentActiveSection]);

  // 120fps Hardware-Accelerated Scroll Progress Bar + Active Section Spy
  useEffect(() => {
    let rafId: number | null = null;
    let currentProgress = 0;
    let targetProgress = 0;

    const getScrollTarget = () => {
      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const scrollableHeight = Math.max(1, docEl.scrollHeight - window.innerHeight);
      return Math.min(1, Math.max(0, scrollTop / scrollableHeight));
    };

    const updateActiveSection = () => {
      const ids = ["home", "projects", "skills", "contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection((prev) => (prev === ids[i] ? prev : ids[i]));
            break;
          }
        }
      }
    };

    const applyBarToDom = (ratio: number) => {
      if (progressBarFillRef.current) {
        progressBarFillRef.current.style.transform = `scaleX(${ratio.toFixed(5)})`;
      }
      const roundedPct = Math.round(ratio * 100);
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${String(roundedPct).padStart(3, "0")}%`;
      }
      if (progressBarContainerRef.current) {
        progressBarContainerRef.current.setAttribute("aria-valuenow", String(roundedPct));
      }
    };

    const animateProgress = () => {
      const diff = targetProgress - currentProgress;
      if (reducedMotion || Math.abs(diff) < 0.0005) {
        currentProgress = targetProgress;
        applyBarToDom(currentProgress);
        rafId = null;
        return;
      }
      currentProgress += diff * 0.28;
      applyBarToDom(currentProgress);
      rafId = window.requestAnimationFrame(animateProgress);
    };

    const handleScroll = () => {
      targetProgress = getScrollTarget();
      updateActiveSection();
      if (rafId === null) {
        rafId = window.requestAnimationFrame(animateProgress);
      }
    };

    targetProgress = getScrollTarget();
    currentProgress = targetProgress;
    applyBarToDom(currentProgress);
    updateActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [reducedMotion]);

  const scrollToSection = (id: string) => {
    if (onSectionSelect) {
      onSectionSelect(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(11, 11, 11, 0.92)",
          borderColor: "rgba(181, 169, 154, 0.2)"
        }}
      >
        <div
          ref={progressBarContainerRef}
          role="progressbar"
          aria-label="Page Scroll Progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          className="w-full h-[3px] overflow-hidden relative"
          style={{ backgroundColor: "var(--surface-elevated)" }}
        >
          <div
            ref={progressBarFillRef}
            className="h-full origin-left relative will-change-transform"
            style={{
              width: "100%",
              transform: "scaleX(0)",
              background: "linear-gradient(90deg, #E8E5DE 0%, #E34B43 100%)",
              boxShadow: "0 0 12px rgba(227, 75, 67, 0.65)"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4 font-mono-tech text-xs">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--text-accent)" }}
            />
            <span
              className="font-semibold tracking-wider"
              style={{ color: "var(--text-primary)" }}
            >
              {PROFILE_DATA.sysId}
            </span>
            <span
              ref={progressTextRef}
              className="hidden sm:inline-block text-[10px] border px-2 py-0.5 tabular-nums"
              style={{
                color: "var(--text-secondary)",
                borderColor: "rgba(181, 169, 154, 0.2)"
              }}
            >
              000%
            </span>
          </div>

          <nav aria-label="Primary Navigation" className="flex items-center gap-1 sm:gap-2">
            {[
              { id: "home", label: "Home" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "contact", label: "Contact" }
            ].map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-2.5 py-1 transition-colors cursor-pointer"
                  style={{
                    backgroundColor: active ? "var(--surface-paper)" : "transparent",
                    color: active ? "var(--text-on-light)" : "var(--text-secondary)",
                    fontWeight: active ? 600 : 400
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRepoModalOpen(true)}
              className="px-2.5 py-1 border text-[11px] hover:border-[#E34B43] transition-colors cursor-pointer flex items-center gap-1.5"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(227, 75, 67, 0.5)",
                color: "var(--text-primary)"
              }}
              title="Inspect Modular Next.js Directory Tree (src/ + public/)"
            >
              <FolderTree className="w-3.5 h-3.5" style={{ color: "var(--text-accent)" }} />
              <span className="hidden sm:inline">REPO TREE</span>
            </button>
            <button
              onClick={toggleFxAtmosphere}
              className="hidden lg:inline-block px-2.5 py-1 border text-[11px] hover:border-[#E34B43] transition-colors cursor-pointer"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.3)",
                color: "var(--text-primary)"
              }}
            >
              [FX: {isAtmosphereEnabled ? "ON" : "OFF"}]
            </button>
            <button
              onClick={() => setAiModalOpen(true)}
              className="px-2.5 py-1 border text-[11px] hover:border-[#E34B43] transition-colors cursor-pointer"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.3)",
                color: "var(--text-primary)"
              }}
            >
              [LLMS.TXT]
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================================
          MODAL 1: NEXT.JS MODULAR REPOSITORY TREE INSPECTOR
      =================================================================== */}
      {repoModalOpen && (
        <div
          role="dialog"
          aria-label="Next.js Repository Structure Inspector"
          className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(11, 11, 11, 0.88)" }}
        >
          <div
            className="border max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl font-mono-tech text-xs"
            style={{
              backgroundColor: "var(--surface-elevated)",
              borderColor: "rgba(181, 169, 154, 0.4)"
            }}
          >
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
            >
              <span className="font-semibold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <FolderTree className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
                <span>MODULAR NEXT.JS REPOSITORY // portfolio/ (SEE docs/NEXTJS_MODULAR_REPO.md FOR FULL CODE)</span>
              </span>
              <button
                onClick={() => setRepoModalOpen(false)}
                className="hover:text-[#E8E5DE] cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
              <div
                className="md:col-span-5 border-r p-3 overflow-y-auto space-y-1"
                style={{
                  backgroundColor: "var(--bg-obsidian)",
                  borderColor: "rgba(181, 169, 154, 0.2)"
                }}
              >
                <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--text-accent)" }}>
                  portfolio/ Directory Tree
                </div>
                {REPO_TREE_FILES.map((file) => {
                  const active = selectedTreeFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedTreeFile(file)}
                      className="w-full text-left px-2.5 py-2 border transition-colors flex items-center gap-2 cursor-pointer"
                      style={{
                        backgroundColor: active ? "var(--surface-paper)" : "transparent",
                        color: active ? "var(--text-on-light)" : "var(--text-primary)",
                        borderColor: active ? "var(--surface-paper)" : "rgba(181, 169, 154, 0.15)",
                        fontWeight: active ? 600 : 400
                      }}
                    >
                      <FileCode className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{file.path}</span>
                    </button>
                  );
                })}
              </div>

              <div className="md:col-span-7 p-4 flex flex-col overflow-y-auto">
                <div
                  className="flex items-center justify-between pb-3 mb-3 border-b"
                  style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
                >
                  <div>
                    <div className="font-bold" style={{ color: "var(--text-primary)" }}>
                      {selectedTreeFile.path}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {selectedTreeFile.role}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(selectedTreeFile.snippet);
                      setCopiedTreeSnippet(true);
                      setTimeout(() => setCopiedTreeSnippet(false), 1500);
                    }}
                    className="px-3 py-1 font-semibold cursor-pointer"
                    style={{
                      backgroundColor: "var(--surface-paper)",
                      color: "var(--text-on-light)"
                    }}
                  >
                    {copiedTreeSnippet ? "[COPIED]" : "[COPY]"}
                  </button>
                </div>
                <pre
                  className="p-3 border overflow-x-auto leading-relaxed flex-1"
                  style={{
                    backgroundColor: "var(--bg-obsidian)",
                    borderColor: "rgba(181, 169, 154, 0.2)",
                    color: "var(--text-body-soft)"
                  }}
                >
                  <code>{selectedTreeFile.snippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: LLMS.TXT & JSON-LD INSPECTOR
      =================================================================== */}
      {aiModalOpen && (
        <div
          role="dialog"
          aria-label="AI Discoverability Inspector"
          className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(11, 11, 11, 0.85)" }}
        >
          <div
            className="border max-w-2xl w-full max-h-[82vh] flex flex-col shadow-2xl font-mono-tech text-xs"
            style={{
              backgroundColor: "var(--surface-elevated)",
              borderColor: "rgba(181, 169, 154, 0.4)"
            }}
          >
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
            >
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                AI &amp; LLM DISCOVERABILITY // CONCISE PROFILE
              </span>
              <button
                onClick={() => setAiModalOpen(false)}
                className="hover:text-[#E8E5DE] cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="px-4 pt-2 border-b flex items-center justify-between"
              style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
            >
              <div className="flex gap-2">
                <button
                  onClick={() => setAiModalTab("llms")}
                  className="px-3 py-2 border-b-2 cursor-pointer"
                  style={{
                    borderColor: aiModalTab === "llms" ? "var(--text-accent)" : "transparent",
                    color: aiModalTab === "llms" ? "var(--text-primary)" : "var(--text-secondary)"
                  }}
                >
                  /llms.txt
                </button>
                <button
                  onClick={() => setAiModalTab("jsonld")}
                  className="px-3 py-2 border-b-2 cursor-pointer"
                  style={{
                    borderColor: aiModalTab === "jsonld" ? "var(--text-accent)" : "transparent",
                    color: aiModalTab === "jsonld" ? "var(--text-primary)" : "var(--text-secondary)"
                  }}
                >
                  JSON-LD Schema
                </button>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    aiModalTab === "llms" ? LLMS_TXT_CONTENT : JSON_LD_SCHEMA
                  );
                  setCopiedAiDoc(true);
                  setTimeout(() => setCopiedAiDoc(false), 1500);
                }}
                className="px-3 py-1 font-semibold cursor-pointer"
                style={{
                  backgroundColor: "var(--surface-paper)",
                  color: "var(--text-on-light)"
                }}
              >
                {copiedAiDoc ? "[COPIED]" : "[COPY]"}
              </button>
            </div>

            <div
              className="p-4 overflow-y-auto flex-1"
              style={{
                backgroundColor: "var(--bg-obsidian)",
                color: "var(--text-body-soft)"
              }}
            >
              <pre className="whitespace-pre-wrap leading-relaxed">
                {aiModalTab === "llms" ? LLMS_TXT_CONTENT : JSON_LD_SCHEMA}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
