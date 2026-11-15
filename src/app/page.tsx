"use client";

import React from "react";
import Preloader from "@/components/hud/Preloader";
import SystemHudNav from "@/components/hud/SystemHudNav";
import Section00Signal from "@/components/sections/Section00Signal";
import Section01Identity from "@/components/sections/Section01Identity";
import Section02TimeSkip from "@/components/sections/Section02TimeSkip";
import Section04Projects from "@/components/sections/Section04Projects";
import Section03System from "@/components/sections/Section03System";
import Section05Contact from "@/components/sections/Section05Contact";

export default function PortfolioPage() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden selection:bg-[#E34B43] selection:text-[#0B0B0B]"
      style={{
        backgroundColor: "var(--bg-obsidian)",
        color: "var(--text-primary)"
      }}
    >
      <Preloader />
      <SystemHudNav />

      <main id="main-content" role="main">
        {/* ===================================================================
            SECTION 00 & 01: SIGNAL & IDENTITY (#home)
        =================================================================== */}
        <section
          id="home"
          className="relative min-h-screen pt-24 pb-16 flex items-center border-b"
          style={{ borderColor: "rgba(181, 169, 154, 0.2)" }}
        >
          <Section00Signal />
          <Section01Identity />
        </section>

        {/* ===================================================================
            SECTION 02: TIME SKIP (NARRATIVE TELEMETRY DIVIDER)
        =================================================================== */}
        <Section02TimeSkip />

        {/* ===================================================================
            SECTION 04: SELECTED PROJECTS ([01 // PROJECTS])
        =================================================================== */}
        <Section04Projects />

        {/* ===================================================================
            SECTION 03: TECH STACK SYSTEM ([02 // TECH STACK])
        =================================================================== */}
        <Section03System />

        {/* ===================================================================
            SECTION 05: CONTACT & FOOTER (PAPER INVERSION SURFACE)
        =================================================================== */}
        <Section05Contact />
      </main>
    </div>
  );
}
