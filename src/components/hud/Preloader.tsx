"use client";

import React, { useState, useEffect } from "react";

export interface PreloaderProps {
  onComplete?: () => void;
  reducedMotion?: boolean;
}

export default function Preloader({ onComplete, reducedMotion = false }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      setIsDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 8;
        const next = Math.min(prev + increment, 100);
        if (next > 25 && next <= 55) setBootStep(1);
        else if (next > 55 && next <= 85) setBootStep(2);
        else if (next > 85) setBootStep(3);
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [reducedMotion, onComplete]);

  useEffect(() => {
    if (progress === 100) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 200);

      const dismissTimer = setTimeout(() => {
        setIsDismissed(true);
        if (onComplete) onComplete();
      }, 650);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(dismissTimer);
      };
    }
  }, [progress, onComplete]);

  if (isDismissed) return null;

  const bootMessages = [
    "SYS_BOOT // INITIALIZING MONOCHROME NOIR ENGINE...",
    "CALIBRATING COMPUTATIONAL ORBITAL VOID...",
    "MOUNTING DATA PIPELINES // S3 · SNOWFLAKE · AIRFLOW...",
    "IDENTITY STATUS: RESOLVED // 200_BECOMING"
  ];

  return (
    <aside
      aria-label="System Boot Preloader"
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: "var(--bg-obsidian)",
        color: "var(--text-primary)"
      }}
    >
      {/* Corner Crop Marks */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-4 font-mono-tech text-xs select-none"
        style={{ color: "var(--text-telemetry)" }}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 font-mono-tech text-xs select-none"
        style={{ color: "var(--text-telemetry)" }}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-4 font-mono-tech text-xs select-none"
        style={{ color: "var(--text-telemetry)" }}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-4 font-mono-tech text-xs select-none"
        style={{ color: "var(--text-telemetry)" }}
      >
        +
      </span>

      {/* Top Header Telemetry */}
      <div className="flex items-center justify-between font-mono-tech text-xs border-b pb-4 border-[#B5A99A]/20">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--text-accent)" }}
          />
          <span className="font-semibold tracking-wider">SYS_BOOT // 404_HK_4227</span>
        </div>
        <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
          INITIALIZING REPOSITORY
        </div>
      </div>

      {/* Center Boot Log & Progress Gauge */}
      <div className="max-w-xl mx-auto w-full my-auto space-y-6">
        <div className="space-y-2">
          <div
            className="font-mono-tech text-[10px] uppercase tracking-widest"
            style={{ color: "var(--text-accent)" }}
          >
            [SYSTEM BOOT SEQUENCE]
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight">
            Harsh Kumar
          </div>
          <div className="font-mono-tech text-xs" style={{ color: "var(--text-secondary)" }}>
            Data Engineering, AI/ML &amp; Analytics Developer
          </div>
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono-tech text-xs">
            <span style={{ color: "var(--text-secondary)" }}>
              {bootMessages[bootStep]}
            </span>
            <span className="font-bold tabular-nums" style={{ color: "var(--text-accent)" }}>
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          <div
            className="w-full h-1 overflow-hidden"
            style={{ backgroundColor: "var(--surface-elevated)" }}
          >
            <div
              className="h-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #E8E5DE 0%, #E34B43 100%)",
                boxShadow: "0 0 10px rgba(227, 75, 67, 0.6)"
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[11px] border-t pt-4 border-[#B5A99A]/20" style={{ color: "var(--text-secondary)" }}>
        <span>LAT 23.6693° N // LON 86.1511° E</span>
        <span>NOIR EDITORIAL SYSTEM // 120FPS VSYNC</span>
      </div>
    </aside>
  );
}
