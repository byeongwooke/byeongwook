"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Users, Cpu, Play } from "lucide-react";

export type ConstructionStage = "HERO_BUILD" | "SCROLL_PROJECTS" | "PROJECTS_BUILD" | "FINALE";

interface StudioDockProps {
  stage: ConstructionStage;
  isUnlocked: boolean;
  onReplay: () => void;
}

export function StudioDock({ stage, isUnlocked, onReplay }: StudioDockProps) {
  const stageDisplay = {
    HERO_BUILD: { step: "01", name: "01_HERO_ASSEMBLY", active: 1 },
    SCROLL_PROJECTS: { step: "02", name: "02_PROJECTS_GRID", active: 2 },
    PROJECTS_BUILD: { step: "02", name: "02_PROJECTS_GRID", active: 2 },
    FINALE: { step: "03", name: "03_READY", active: 3 },
  };

  const current = stageDisplay[stage];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-[#111111]/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md text-[11px] font-mono"
      >
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 pr-2.5 border-r border-neutral-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-white tracking-tight">
            LIVE AGENT ENGINE
          </span>
        </div>

        {/* Stage Flow */}
        <div className="hidden md:flex items-center gap-1.5 text-neutral-400 text-[10px]">
          <span className="text-neutral-500 font-bold">STAGE:</span>
          <span
            className={`transition-colors ${
              current.active === 1 ? "text-cyan-400 font-bold" : "text-neutral-500"
            }`}
          >
            01_HERO_ASSEMBLY
          </span>
          <span className="text-neutral-600">➔</span>
          <span
            className={`transition-colors ${
              current.active === 2 ? "text-cyan-400 font-bold" : "text-neutral-500"
            }`}
          >
            02_PROJECTS_GRID
          </span>
          <span className="text-neutral-600">➔</span>
          <span
            className={`transition-colors ${
              current.active === 3 ? "text-emerald-400 font-bold" : "text-neutral-500"
            }`}
          >
            03_READY
          </span>
        </div>

        {/* Active Agents Count */}
        <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-neutral-800 text-neutral-300">
          <Users className="h-3 w-3 text-neutral-400" />
          <span className="font-bold text-neutral-200">AGENTS: 10 ACTIVE</span>
        </div>

        {/* Replay Build Button */}
        <button
          onClick={onReplay}
          className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-[11px] font-semibold transition-all active:scale-95 border border-white/10 ml-1"
          title="처음부터 실시간 자동 빌드 다시 관람하기"
        >
          <RefreshCw className="h-3 w-3 transition-transform group-hover:rotate-180 duration-500 text-cyan-400" />
          <span>Replay Build ↻</span>
        </button>
      </motion.div>
    </div>
  );
}
