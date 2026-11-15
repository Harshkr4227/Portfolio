"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode
} from "react";

interface AnimationContextType {
  reducedMotion: boolean;
  setReducedMotion: React.Dispatch<React.SetStateAction<boolean>>;
  fxAtmosphereActive: boolean;
  setFxAtmosphereActive: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFxAtmosphere: () => void;
  isAtmosphereEnabled: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function useAnimationController(): AnimationContextType {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimationController must be used within an AnimationController");
  }
  return context;
}

export function MovingBackgroundGrain({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;
  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-40 moving-background-grain"
    />
  );
}

export const BLUR_LAYER_CONFIGS = [
  { blur: "3px", mask: "linear-gradient(#0000 37.5%, #000 50% 100%)", zIndex: 1 },
  { blur: "4.5px", mask: "linear-gradient(#0000 50%, #000 62.5% 100%)", zIndex: 2 },
  { blur: "9px", mask: "linear-gradient(#0000 62.5%, #000 75% 100%)", zIndex: 3 },
  { blur: "24px", mask: "linear-gradient(#0000 75%, #000 87.5% 100%)", zIndex: 4 },
  { blur: "64px", mask: "linear-gradient(#0000 87.5%, #000 100%)", zIndex: 5 }
];

export function ProgressiveScrollBlur({ enabled = true }: { enabled?: boolean }) {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const opacitiesRef = useRef<number[]>([0.04, 0.04, 0.04, 0.04, 0.04]);
  const prevScrollYRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const syncDomOpacities = useCallback(() => {
    const opacities = opacitiesRef.current;
    for (let i = 0; i < opacities.length; i++) {
      const el = layerRefs.current[i];
      if (el) el.style.opacity = opacities[i].toFixed(3);
    }
  }, []);

  const smoothDecayOpacity = useCallback(() => {
    const threshold = 0.06;
    const target = 0.04;
    let allSettled = true;
    const opacities = opacitiesRef.current;

    for (let i = 0; i < opacities.length; i++) {
      const current = opacities[i];
      if (Math.abs(current - target) < threshold) {
        opacities[i] = target;
      } else if (current > target) {
        opacities[i] = current - (current - target) * 0.2;
        allSettled = false;
      }
    }

    syncDomOpacities();

    if (!allSettled) {
      rafRef.current = window.requestAnimationFrame(smoothDecayOpacity);
    } else {
      rafRef.current = null;
    }
  }, [syncDomOpacities]);

  useEffect(() => {
    if (!enabled) {
      opacitiesRef.current = [0, 0, 0, 0, 0];
      syncDomOpacities();
      return;
    }

    prevScrollYRef.current = window.scrollY || 0;
    syncDomOpacities();

    const handleScroll = () => {
      const latest = window.scrollY || 0;
      const prev = prevScrollYRef.current;
      const delta = Math.abs(latest - prev);
      prevScrollYRef.current = latest;

      if (delta === 0) return;

      const opacities = opacitiesRef.current;
      for (let i = 0; i < opacities.length; i++) {
        const current = opacities[i];
        const multiplier = 0.01 * (i + 1);
        const easedMultiplier = multiplier * (1 - current);
        opacities[i] = Math.min(current + delta * easedMultiplier, 0.92);
      }

      syncDomOpacities();

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      rafRef.current = window.requestAnimationFrame(smoothDecayOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, smoothDecayOpacity, syncDomOpacities]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-full h-56 sm:h-64">
        {[...BLUR_LAYER_CONFIGS].reverse().map((layer, revIdx) => {
          const originalIdx = BLUR_LAYER_CONFIGS.length - 1 - revIdx;
          return (
            <div
              key={originalIdx}
              ref={(el) => {
                layerRefs.current[originalIdx] = el;
              }}
              className="absolute bottom-0 left-0 w-full h-full will-change-[opacity]"
              style={{
                zIndex: layer.zIndex,
                opacity: 0.04,
                backdropFilter: `blur(${layer.blur})`,
                WebkitBackdropFilter: `blur(${layer.blur})`,
                maskImage: layer.mask,
                WebkitMaskImage: layer.mask
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface AnimationControllerProps {
  children: ReactNode;
}

export function AnimationController({ children }: AnimationControllerProps) {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [fxAtmosphereActive, setFxAtmosphereActive] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) setFxAtmosphereActive(false);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setFxAtmosphereActive(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleFxAtmosphere = useCallback(() => {
    setFxAtmosphereActive((prev) => !prev);
  }, []);

  const isAtmosphereEnabled = fxAtmosphereActive && !reducedMotion;

  return (
    <AnimationContext.Provider
      value={{
        reducedMotion,
        setReducedMotion,
        fxAtmosphereActive,
        setFxAtmosphereActive,
        toggleFxAtmosphere,
        isAtmosphereEnabled
      }}
    >
      <MovingBackgroundGrain enabled={isAtmosphereEnabled} />
      <ProgressiveScrollBlur enabled={isAtmosphereEnabled} />
      {children}
    </AnimationContext.Provider>
  );
}

export default AnimationController;
