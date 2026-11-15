"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { PROFILE_DATA, DEFAULT_PORTRAIT_PATHS } from "@/data/profileData";

export interface PortraitShaderProps {
  customPhotoDataUrl?: string | null;
  onBindPhotoFile?: (file: File) => void;
  isLockedByOwner?: boolean;
  bwLayerActive?: boolean;
}

export default function PortraitShader({
  customPhotoDataUrl,
  onBindPhotoFile,
  isLockedByOwner = false,
  bwLayerActive = true
}: PortraitShaderProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [filePathFailed, setFilePathFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeSrc = customPhotoDataUrl || DEFAULT_PORTRAIT_PATHS[sourceIndex];
  const hasResolvedImage = Boolean(customPhotoDataUrl) || !filePathFailed;

  const handleImageError = () => {
    if (customPhotoDataUrl) return;
    if (sourceIndex < DEFAULT_PORTRAIT_PATHS.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setFilePathFailed(true);
    }
  };

  const imageFilterStyle = bwLayerActive
    ? "grayscale(100%) contrast(1.12) brightness(0.96)"
    : "none";

  return (
    <figure
      className="relative w-full h-full overflow-hidden select-none m-0"
      style={{
        background:
          "radial-gradient(circle at 50% 42%, #000000 48%, #050505 74%, #0B0B0B 100%)"
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && onBindPhotoFile) onBindPhotoFile(file);
        }}
      />

      {hasResolvedImage ? (
        <Image
          src={activeSrc}
          alt="Harsh Kumar — Data Engineering, AI/ML & Analytics Developer"
          width={800}
          height={1000}
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 42vw, 380px"
          quality={85}
          unoptimized={Boolean(customPhotoDataUrl && customPhotoDataUrl.startsWith("data:"))}
          onError={handleImageError}
          className="w-full h-full object-contain object-bottom block"
          style={{
            filter: imageFilterStyle,
            WebkitFilter: imageFilterStyle,
            mixBlendMode: "lighten",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)"
          }}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative z-20"
          style={{ backgroundColor: "var(--bg-obsidian)" }}
        >
          <div
            className="w-11 h-11 border flex items-center justify-center mb-3"
            style={{
              borderColor: "rgba(239, 91, 83, 0.6)",
              backgroundColor: "var(--surface-elevated)"
            }}
          >
            <ImageIcon className="w-5 h-5" style={{ color: "var(--text-accent)" }} />
          </div>
          <div
            className="font-mono-tech text-[10px] uppercase tracking-widest mb-1"
            style={{ color: "var(--text-accent)" }}
          >
            public/images/avatar.png
          </div>
          <p
            className="text-xs max-w-xs leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Select your portrait (<code style={{ color: "var(--text-primary)" }}>avatar.png</code> /{" "}
            <code style={{ color: "var(--text-primary)" }}>avatar_2.jpg</code>) once to bind it in
            this preview.
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 font-mono-tech text-xs font-semibold transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--surface-paper)",
              color: "var(--text-on-light)"
            }}
          >
            [SELECT avatar.png]
          </button>
        </div>
      )}

      {/* Seamless #000000 -> #0B0B0B Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, transparent 58%, #0B0B0B 99%), linear-gradient(to top, #0B0B0B 0%, transparent 16%, transparent 86%, #0B0B0B 100%)"
        }}
      />

      <figcaption
        className="absolute inset-0 pointer-events-none border"
        style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
      >
        <span
          className="absolute top-2 left-2 font-mono-tech text-[10px]"
          style={{ color: "var(--text-telemetry)" }}
        >
          +
        </span>
        <span
          className="absolute top-2 right-2 font-mono-tech text-[10px]"
          style={{ color: "var(--text-telemetry)" }}
        >
          +
        </span>
        <span
          className="absolute bottom-2 left-2 font-mono-tech text-[10px]"
          style={{ color: "var(--text-telemetry)" }}
        >
          +
        </span>
        <span
          className="absolute bottom-2 right-2 font-mono-tech text-[10px]"
          style={{ color: "var(--text-telemetry)" }}
        >
          +
        </span>

        <div
          className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono-tech text-[10px]"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>{isLockedByOwner ? "LOCKED // avatar.png" : "HARSH KUMAR"}</span>
          <span className="flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--text-accent)" }}
            />
            <span>ONLINE</span>
          </span>
        </div>

        <div
          className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono-tech text-[10px]"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>{PROFILE_DATA.location}</span>
          <span>{PROFILE_DATA.degreeTag}</span>
        </div>
      </figcaption>
    </figure>
  );
}
