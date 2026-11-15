"use client";

import React from "react";

export default function Section02TimeSkip() {
  return (
    <section
      aria-label="System Transition Telemetry"
      className="relative w-full border-b select-none py-8 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-obsidian)",
        borderColor: "rgba(181, 169, 154, 0.2)"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div
          className="border p-4 sm:p-5 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono-tech text-xs"
          style={{
            backgroundColor: "var(--surface-elevated)",
            borderColor: "rgba(181, 169, 154, 0.25)"
          }}
        >
          {/* Corner Crop Marks */}
          <span
            aria-hidden="true"
            className="absolute -top-1.5 -left-1.5 text-xs"
            style={{ color: "var(--text-accent)" }}
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute -top-1.5 -right-1.5 text-xs"
            style={{ color: "var(--text-accent)" }}
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 -left-1.5 text-xs"
            style={{ color: "var(--text-accent)" }}
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 -right-1.5 text-xs"
            style={{ color: "var(--text-accent)" }}
          >
            +
          </span>

          {/* Left Telemetry Track */}
          <div className="flex items-center gap-3">
            <span
              className="px-2 py-0.5 border text-[10px] tracking-wider uppercase font-semibold"
              style={{
                backgroundColor: "var(--bg-obsidian)",
                borderColor: "rgba(227, 75, 67, 0.6)",
                color: "var(--text-accent)"
              }}
            >
              TIME SKIP // 02
            </span>
            <span style={{ color: "var(--text-secondary)" }}>
              TRANSFORMATION PROTOCOL &bull; 200_BECOMING
            </span>
          </div>

          {/* Center Coordinates & Hash */}
          <div
            className="text-[11px] tracking-wider hidden lg:block"
            style={{ color: "var(--text-telemetry)" }}
          >
            LAT 23.6693&deg; N // LON 86.1511&deg; E &bull; BUFFER: 120FPS
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--text-accent)" }}
            />
            <span
              className="tracking-wider uppercase text-[11px]"
              style={{ color: "var(--text-primary)" }}
            >
              SYS_TRANSITION // IDENTITY &rarr; SYSTEM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
