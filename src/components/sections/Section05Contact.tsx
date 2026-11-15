"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";
import { useAnimationController } from "@/context/AnimationController";

export default function Section05Contact() {
  const { reducedMotion } = useAnimationController();
  const [emailCopied, setEmailCopied] = useState(false);

  const scrollToTop = () => {
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="py-20"
      style={{
        backgroundColor: "var(--surface-paper)",
        color: "var(--text-on-light)"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 font-mono-tech text-xs"
              style={{
                backgroundColor: "var(--bg-obsidian)",
                color: "var(--text-primary)"
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--text-accent)" }}
              />
              <span>GET IN TOUCH // THE WORK IS STILL IN PROGRESS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight leading-none">
              Start a Conversation.
            </h2>
            <p
              className="text-sm sm:text-base max-w-xl"
              style={{ color: "var(--text-on-light-muted)" }}
            >
              Have a data engineering, analytics, or AI/ML opportunity in mind? I&apos;d love to
              hear from you.
            </p>
            <div
              className="pt-2 font-mono-tech text-xs"
              style={{ color: "var(--text-on-light-muted)" }}
            >
              LOCATION: {PROFILE_DATA.location} &nbsp;|&nbsp; DIRECT:{" "}
              {PROFILE_DATA.links.email}
            </div>
          </div>

          <div
            className="lg:col-span-5 p-6 border space-y-2.5 font-mono-tech text-xs"
            style={{
              backgroundColor: "var(--bg-obsidian)",
              color: "var(--text-primary)",
              borderColor: "var(--bg-obsidian)"
            }}
          >
            <button
              onClick={() => {
                navigator.clipboard?.writeText(PROFILE_DATA.links.email);
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
              className="w-full p-3.5 font-semibold hover:bg-[#E34B43] hover:text-[#E8E5DE] flex items-center justify-between transition-colors cursor-pointer"
              style={{
                backgroundColor: "var(--surface-paper)",
                color: "var(--text-on-light)"
              }}
            >
              <span>
                {emailCopied
                  ? `COPIED // ${PROFILE_DATA.links.email}`
                  : `EMAIL // ${PROFILE_DATA.links.email}`}
              </span>
              {emailCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>

            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border hover:border-[#E34B43] flex items-center justify-between transition-colors"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.25)"
              }}
            >
              <span>GITHUB // Harshkr4227</span>
              <ArrowUpRight className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
            </a>

            <a
              href={PROFILE_DATA.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border hover:border-[#E34B43] flex items-center justify-between transition-colors"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.25)"
              }}
            >
              <span>LINKEDIN // harsh-kumar-214161295</span>
              <ArrowUpRight className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
            </a>

            <a
              href={PROFILE_DATA.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border hover:border-[#E34B43] flex items-center justify-between transition-colors"
              style={{
                backgroundColor: "var(--surface-elevated)",
                borderColor: "rgba(181, 169, 154, 0.25)"
              }}
            >
              <span>X (TWITTER) // @harshkr4227</span>
              <ArrowUpRight className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
            </a>
          </div>
        </div>

        <footer
          className="mt-12 pt-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs"
          style={{
            borderColor: "rgba(11, 11, 11, 0.2)",
            color: "var(--text-on-light-muted)"
          }}
        >
          <span>&copy; 2026 HARSH KUMAR &mdash; DATA ENGINEERING, AI/ML &amp; ANALYTICS DEVELOPER</span>
          <button
            onClick={scrollToTop}
            className="px-3.5 py-1.5 hover:bg-[#E34B43] transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--bg-obsidian)",
              color: "var(--text-primary)"
            }}
          >
            [TOP &uarr;]
          </button>
        </footer>
      </div>
    </section>
  );
}
