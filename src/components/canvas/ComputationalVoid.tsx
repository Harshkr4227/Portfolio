"use client";

import React, { useRef, useState, useEffect } from "react";

export interface ComputationalVoidProps {
  reducedMotion?: boolean;
}

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  zOffset: number;
  size: number;
}

export default function ComputationalVoid({ reducedMotion = false }: ComputationalVoidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [deferredReady, setDeferredReady] = useState(false);

  // Defer canvas initialization & particle math using requestIdleCallback
  // with fallback to avoid blocking the initial hydration / TBT window
  useEffect(() => {
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setDeferredReady(true),
        { timeout: 250 }
      );
    } else {
      timeoutId = setTimeout(() => setDeferredReady(true), 250);
    }

    return () => {
      if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // IntersectionObserver to pause rendering when scrolled out of view (0% GPU)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!deferredReady) return;
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastFrameTime = 0;
    const frameInterval = 1000 / 60;

    let width = (canvas.width = canvas.parentElement.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 800;
      height = canvas.height = canvas.parentElement.clientHeight || 600;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Pre-allocate particles into batched color groups for minimal state switches
    const particleCount = reducedMotion ? 70 : 185;
    const maxDim = Math.max(width, height) * 0.46;

    const signalRedParticles: Particle[] = [];
    const amberParticles: Particle[] = [];
    const neutralParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 50 + Math.pow(Math.random(), 1.35) * maxDim;
      const p: Particle = {
        angle: Math.random() * Math.PI * 2,
        radius,
        speed: (0.0012 + (110 / (radius + 60)) * 0.004) * (i % 2 === 0 ? 1 : 0.85),
        zOffset: (Math.random() - 0.5) * 150,
        size: Math.random() * 1.8 + 0.5
      };

      const rand = Math.random();
      if (rand < 0.05) {
        signalRedParticles.push(p);
      } else if (rand < 0.21) {
        amberParticles.push(p);
      } else {
        neutralParticles.push(p);
      }
    }

    // Cached gradient state to avoid allocations on every frame
    let cachedGrad: CanvasGradient | null = null;
    let lastGradCx = -9999;
    let lastGradCy = -9999;

    const render = (timestamp = 0) => {
      if (!isVisible) return;

      if (timestamp - lastFrameTime >= frameInterval || reducedMotion) {
        lastFrameTime = timestamp;

        ctx.fillStyle = "rgba(11, 11, 11, 0.25)";
        ctx.fillRect(0, 0, width, height);

        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        const cx = width * 0.5 + mouseRef.current.x * 24;
        const cy = height * 0.48 + mouseRef.current.y * 14;
        const tilt = 0.42 + mouseRef.current.y * 0.08;

        // Recompute gradient only when coordinates move beyond threshold
        if (!cachedGrad || Math.hypot(cx - lastGradCx, cy - lastGradCy) > 0.8) {
          cachedGrad = ctx.createRadialGradient(cx, cy, 16, cx, cy, 220);
          cachedGrad.addColorStop(0, "rgba(11, 11, 11, 1)");
          cachedGrad.addColorStop(0.24, "rgba(217, 119, 6, 0.08)");
          cachedGrad.addColorStop(0.55, "rgba(181, 169, 154, 0.03)");
          cachedGrad.addColorStop(1, "rgba(11, 11, 11, 0)");
          lastGradCx = cx;
          lastGradCy = cy;
        }

        ctx.fillStyle = cachedGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 220, 0, Math.PI * 2);
        ctx.fill();

        // Batch 1: Signal Red particles (single fillStyle per frame)
        ctx.fillStyle = "rgba(239, 91, 83, 0.85)";
        for (let i = 0; i < signalRedParticles.length; i++) {
          const p = signalRedParticles[i];
          if (!reducedMotion) p.angle += p.speed;
          const x = cx + Math.cos(p.angle) * p.radius - Math.sin(p.angle) * p.zOffset * 0.25;
          const y = cy + Math.sin(p.angle) * p.radius * tilt + p.zOffset * 0.18;
          ctx.fillRect(x, y, p.size, p.size);
        }

        // Batch 2: Amber particles (single fillStyle per frame)
        ctx.fillStyle = "rgba(217, 119, 6, 0.75)";
        for (let i = 0; i < amberParticles.length; i++) {
          const p = amberParticles[i];
          if (!reducedMotion) p.angle += p.speed;
          const x = cx + Math.cos(p.angle) * p.radius - Math.sin(p.angle) * p.zOffset * 0.25;
          const y = cy + Math.sin(p.angle) * p.radius * tilt + p.zOffset * 0.18;
          ctx.fillRect(x, y, p.size, p.size);
        }

        // Batch 3: Neutral particles (single fillStyle per frame)
        ctx.fillStyle = "rgba(232, 229, 222, 0.65)";
        for (let i = 0; i < neutralParticles.length; i++) {
          const p = neutralParticles[i];
          if (!reducedMotion) p.angle += p.speed;
          const x = cx + Math.cos(p.angle) * p.radius - Math.sin(p.angle) * p.zOffset * 0.25;
          const y = cy + Math.sin(p.angle) * p.radius * tilt + p.zOffset * 0.18;
          ctx.fillRect(x, y, p.size, p.size);
        }
      }

      if (!reducedMotion && isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [deferredReady, isVisible, reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
