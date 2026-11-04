"use client";

import React from "react";
import { motion } from "framer-motion";

export function BlueprintCanvas() {
  return (
    <div className="fixed inset-0 z-40 bg-white select-none overflow-hidden">
      {/* 1. Dot / Blueprint Grid (24px interval) */}
      <div className="absolute inset-0 bg-white bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Subtle Major Grid Lines (120px interval) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:120px_120px] opacity-70" />

      {/* 2. Top-Left Canvas Coordinates Metadata */}
      <div className="absolute top-6 left-6 flex items-center gap-2.5 font-mono text-[11px] text-neutral-400">
        <span className="font-semibold text-neutral-700">CANVAS_01</span>
        <span className="text-neutral-300">/</span>
        <span>GRID: 24px</span>
        <span className="text-neutral-300">•</span>
        <span>SNAP: ACTIVE</span>
      </div>

      {/* 3. Four Corner Blueprint Crosshair Marks */}
      <div className="absolute top-6 right-6 font-mono text-xs text-neutral-300 select-none">+</div>
      <div className="absolute bottom-6 left-6 font-mono text-xs text-neutral-300 select-none">+</div>
      <div className="absolute bottom-6 right-6 font-mono text-xs text-neutral-300 select-none">+</div>

      {/* 4. Center Crosshair Pointer (Magenta/Cyan Minimal Focal Target) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        {/* Horizontal Line (Magenta) */}
        <div className="absolute w-12 h-[1px] bg-gradient-to-r from-transparent via-[#ec4899] to-transparent shadow-[0_0_8px_rgba(236,72,153,0.4)]" />

        {/* Vertical Line (Cyan) */}
        <div className="absolute h-12 w-[1px] bg-gradient-to-b from-transparent via-[#06b6d4] to-transparent shadow-[0_0_8px_rgba(6,182,212,0.4)]" />

        {/* Center Origin Dot */}
        <div className="relative w-2 h-2 rounded-full border border-neutral-800 bg-white shadow-sm flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#ec4899]" />
        </div>

        {/* Coordinate Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#111111]/90 text-white font-mono text-[9px] whitespace-nowrap shadow-md border border-neutral-700/60"
        >
          <span className="text-[#06b6d4]">X: 0</span>
          <span className="text-neutral-500">|</span>
          <span className="text-[#ec4899]">Y: 0</span>
          <span className="text-neutral-400 font-sans text-[8px] ml-0.5">(Center Focus)</span>
        </motion.div>
      </div>

      {/* 5. Status Indicator Bar (Bottom Center) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111111]/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md text-[11px] font-mono tracking-tight"
        >
          {/* Green Pulse Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>

          {/* Status Message */}
          <span className="font-semibold text-white tracking-wide">
            STEP 01: INITIALIZING BLUEPRINT CANVAS...
          </span>
        </motion.div>
      </div>
    </div>
  );
}
