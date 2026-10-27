"use client";

import { ArrowUp } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#e5e7eb] bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-sm font-bold text-[#111111] mb-1">
            BYEONGWOOK YOO
          </div>
          <p className="text-xs text-neutral-500">
            {PROFILE_DATA.englishTitle} — Crafting structure & human warmth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-neutral-500">
          <span>© 2026 Byeongwook Yoo. All rights reserved.</span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
