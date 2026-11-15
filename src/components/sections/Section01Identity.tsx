"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROFILE_DATA, STORAGE_KEY_PORTRAIT } from "@/data/profileData";
import PortraitShader from "@/components/canvas/PortraitShader";
import { useAnimationController } from "@/context/AnimationController";

export interface Section01IdentityProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Section01Identity({ onNavigate }: Section01IdentityProps) {
  const { reducedMotion } = useAnimationController();

  const [roleIndex, setRoleIndex] = useState(0);

  // Portrait State & Local Storage Persistence
  const [customPhotoDataUrl, setCustomPhotoDataUrl] = useState<string | null>(null);
  const [visitorLockMode, setVisitorLockMode] = useState(false);
  const [bwLayerActive, setBwLayerActive] = useState(true);

  // Rotating Role Pills
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE_DATA.rolePills.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Load bound portrait from localStorage
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY_PORTRAIT);
      if (saved && saved.startsWith("data:image/")) {
        setCustomPhotoDataUrl(saved);
        setVisitorLockMode(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleBindPhotoFile = useCallback((file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === "string") {
        setCustomPhotoDataUrl(dataUrl);
        setVisitorLockMode(true);
        try {
          window.localStorage.setItem(STORAGE_KEY_PORTRAIT, dataUrl);
        } catch {
          // Ignore quota error
        }
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleScrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Identity, Narrative & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
            <span
              className="px-2.5 py-1 border line-through decoration-2"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.3)",
                color: "var(--text-accent)"
              }}
            >
              404: IDENTITY NOT FOUND
            </span>
            <span
              className="px-2.5 py-1 border"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.3)",
                color: "var(--text-primary)"
              }}
            >
              {PROFILE_DATA.headlineTitle}
            </span>
          </div>

          <div className="space-y-2">
            <div
              className="font-mono-tech text-xs uppercase tracking-widest"
              style={{ color: "var(--text-secondary)" }}
            >
              NOT LOST. STILL BECOMING.
            </div>
            <h1
              className="font-display text-5xl sm:text-7xl font-bold uppercase tracking-tight leading-[0.95]"
              style={{ color: "var(--text-primary)" }}
            >
              I am{" "}
              <span className="underline decoration-[#EF5B53] decoration-4 underline-offset-8">
                Harsh Kumar
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
            {PROFILE_DATA.rolePills.map((role, idx) => {
              const active = idx === roleIndex;
              return (
                <span
                  key={role}
                  onClick={() => setRoleIndex(idx)}
                  className="px-3 py-1.5 border cursor-pointer select-none"
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
                  {role}
                </span>
              );
            })}
          </div>

          <div
            className="space-y-2 border-l-2 pl-4 max-w-xl"
            style={{ borderColor: "var(--text-accent)" }}
          >
            <p
              className="font-display text-lg sm:text-xl italic"
              style={{ color: "var(--text-primary)" }}
            >
              {PROFILE_DATA.quote}
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {PROFILE_DATA.shortBio}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md pt-1">
            {PROFILE_DATA.stats.map((st) => (
              <div
                key={st.label}
                className="border p-3.5"
                style={{
                  backgroundColor: "var(--surface-elevated)",
                  borderColor: "rgba(181, 169, 154, 0.25)"
                }}
              >
                <div
                  className="font-display text-2xl sm:text-3xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {st.value}
                </div>
                <div
                  className="font-mono-tech text-[11px] mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono-tech text-xs">
            <button
              onClick={() => handleScrollTo("projects")}
              className="px-5 py-3 font-semibold hover:bg-[#EF5B53] hover:text-[#E8E5DE] transition-colors flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: "var(--surface-paper)",
                color: "var(--text-on-light)"
              }}
            >
              <span>VIEW PROJECTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="px-5 py-3 border hover:border-[#EF5B53] transition-colors cursor-pointer"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.35)",
                color: "var(--text-primary)"
              }}
            >
              CONTACT
            </button>
            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 hover:text-[#E8E5DE] transition-colors flex items-center gap-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Editorial Portrait Frame */}
        <div className="lg:col-span-5">
          <div
            className="border p-3"
            style={{
              backgroundColor: "var(--surface-elevated)",
              borderColor: "rgba(181, 169, 154, 0.3)"
            }}
          >
            <div className="aspect-[4/5] w-full">
              <PortraitShader
                customPhotoDataUrl={customPhotoDataUrl}
                onBindPhotoFile={handleBindPhotoFile}
                isLockedByOwner={visitorLockMode}
                bwLayerActive={bwLayerActive}
              />
            </div>

            <div
              className="mt-3 pt-3 border-t flex items-center justify-between font-mono-tech text-xs"
              style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
            >
              <div>
                <div className="font-bold" style={{ color: "var(--text-primary)" }}>
                  {PROFILE_DATA.name}
                </div>
                <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                  {PROFILE_DATA.location}
                </div>
              </div>
              <button
                onClick={() => setBwLayerActive((p) => !p)}
                className="px-2.5 py-1 border text-[10px] hover:border-[#EF5B53] transition-colors cursor-pointer"
                style={{
                  backgroundColor: "var(--bg-obsidian)",
                  borderColor: "rgba(181, 169, 154, 0.3)",
                  color: "var(--text-primary)"
                }}
              >
                {bwLayerActive ? "B&W LAYER" : "ORIGINAL"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
