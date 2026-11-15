"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useAnimationController } from "@/context/AnimationController";

const ComputationalVoid = dynamic(
  () => import("@/components/canvas/ComputationalVoid"),
  { ssr: false }
);

export interface Section00SignalProps {
  reducedMotion?: boolean;
}

export default function Section00Signal({ reducedMotion: customReducedMotion }: Section00SignalProps) {
  const { reducedMotion: contextReducedMotion } = useAnimationController();
  const reducedMotion = customReducedMotion !== undefined ? customReducedMotion : contextReducedMotion;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
    >
      {/* 3D Computational Particle Field dynamically loaded */}
      <Suspense
        fallback={
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--bg-obsidian)" }}
          />
        }
      >
        <ComputationalVoid reducedMotion={reducedMotion} />
      </Suspense>

      {/* Ambient Telemetry Watermarks & Corner Marks */}
      <div
        className="absolute top-20 left-4 sm:left-8 font-mono-tech text-[10px] tracking-widest opacity-35 hidden md:block"
        style={{ color: "var(--text-telemetry)" }}
      >
        LAT 23.6693&deg; N // LON 86.1511&deg; E
      </div>

      <div
        className="absolute top-20 right-4 sm:right-8 font-mono-tech text-[10px] tracking-widest opacity-35 hidden md:block"
        style={{ color: "var(--text-telemetry)" }}
      >
        SIGNAL: 200_BECOMING // 120FPS
      </div>

      {/* Radial vignette mask for smooth bottom blending */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11, 11, 11, 0.2) 0%, transparent 60%, var(--bg-obsidian) 100%)"
        }}
      />
    </div>
  );
}
