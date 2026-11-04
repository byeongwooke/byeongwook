"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type StagePhase = "LOADING" | "WIREFRAMING" | "READY_FOR_STEP3";

function CursorPointer({
  color,
  role,
  name,
}: {
  color: string;
  role: string;
  name: string;
}) {
  return (
    <div className="relative pointer-events-none select-none">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
          stroke="#ffffff"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
      {/* Label Badge */}
      <div
        className="absolute left-3.5 top-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-lg border border-white/25 whitespace-nowrap bg-[#111111]/95 backdrop-blur-sm"
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-neutral-400">[{role}]</span>
        <span className="text-white">{name}</span>
      </div>
    </div>
  );
}

export function WireframeStage() {
  const [phase, setPhase] = useState<StagePhase>("LOADING");
  const [progressWidth, setProgressWidth] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1440, height: 900 });

  // Handle window dimensions
  useEffect(() => {
    const updateSize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Timeline State Machine
  useEffect(() => {
    // Start progress bar animation for 1.5s
    const progressTimer = setTimeout(() => {
      setProgressWidth(100);
    }, 50);

    // 1.5s: Switch to WIREFRAMING
    const wireframeTimer = setTimeout(() => {
      setPhase("WIREFRAMING");
    }, 1500);

    // 3.0s: Switch to READY_FOR_STEP3
    const readyTimer = setTimeout(() => {
      setPhase("READY_FOR_STEP3");
    }, 3000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(wireframeTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  // Compute Box Dimensions centered in viewport
  const boxWidth = Math.min(1120, Math.max(320, windowDimensions.width - 64));
  const boxHeight = 480;
  const boxX = (windowDimensions.width - boxWidth) / 2;
  const boxY = 120;

  // 8 Anchor Handles (4 Corners + 4 Edge Midpoints)
  const anchorHandles = [
    { id: "tl", style: { top: -4, left: -4 } },
    { id: "tc", style: { top: -4, left: "50%", transform: "translateX(-50%)" } },
    { id: "tr", style: { top: -4, right: -4 } },
    { id: "ml", style: { top: "50%", left: -4, transform: "translateY(-50%)" } },
    { id: "mr", style: { top: "50%", right: -4, transform: "translateY(-50%)" } },
    { id: "bl", style: { bottom: -4, left: -4 } },
    { id: "bc", style: { bottom: -4, left: "50%", transform: "translateX(-50%)" } },
    { id: "br", style: { bottom: -4, right: -4 } },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-white select-none overflow-hidden">
      {/* 1. Dot Grid Background (24px) */}
      <div className="absolute inset-0 bg-white bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      {/* Subtle Major 120px Coordinate Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:120px_120px] opacity-70" />

      {/* Top-Left Metadata */}
      <div className="absolute top-6 left-6 flex items-center gap-2.5 font-mono text-[11px] text-neutral-400">
        <span className="font-semibold text-neutral-800">STUDIO_CANVAS</span>
        <span className="text-neutral-300">/</span>
        <span>GRID: 24px</span>
        <span className="text-neutral-300">•</span>
        <span className={phase === "LOADING" ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>
          {phase === "LOADING" ? "PHASE: 01_BUFFER" : "PHASE: 02_WIREFRAME"}
        </span>
      </div>

      {/* Corner Crosshair Marks */}
      <div className="absolute top-6 right-6 font-mono text-xs text-neutral-300">+</div>
      <div className="absolute bottom-6 left-6 font-mono text-xs text-neutral-300">+</div>
      <div className="absolute bottom-6 right-6 font-mono text-xs text-neutral-300">+</div>

      {/* Phase 1: Breathing Center Crosshair (Visible only during LOADING) */}
      <AnimatePresence>
        {phase === "LOADING" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-14 h-[1px] bg-gradient-to-r from-transparent via-[#ec4899] to-transparent" />
              <div className="absolute h-14 w-[1px] bg-gradient-to-b from-transparent via-[#06b6d4] to-transparent" />
              <div className="w-2 h-2 rounded-full border border-neutral-700 bg-white shadow-sm flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#ec4899]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Snap Lines & Bounding Box */}
      {phase !== "LOADING" && (
        <>
          {/* Full-width Magenta / Cyan Snap Crosshair Guides */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.4] }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pointer-events-none"
          >
            {/* Horizontal Snap Center Line (Cyan) */}
            <div
              style={{ top: boxY + boxHeight / 2 }}
              className="fixed left-0 right-0 border-t border-dashed border-[#06b6d4] z-20"
            />
            {/* Vertical Snap Center Line (Magenta) */}
            <div
              style={{ left: boxX + boxWidth / 2 }}
              className="fixed top-0 bottom-0 border-l border-dashed border-[#ec4899] z-20"
            />
          </motion.div>

          {/* Expanding Wireframe Bounding Box */}
          <motion.div
            initial={{
              x: boxX,
              y: boxY,
              width: 0,
              height: 0,
              opacity: 0,
            }}
            animate={{
              x: boxX,
              y: boxY,
              width: boxWidth,
              height: boxHeight,
              opacity: 1,
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed border-2 border-dashed border-[#7c3aed] bg-[#7c3aed]/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.8)] z-30"
          >
            {/* Top-Left Tag */}
            <div className="absolute -top-6 left-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-t bg-[#7c3aed] text-white font-mono text-[10px] font-bold shadow-sm">
              <span>[Design] 지원</span>
              <span className="opacity-75">/ HERO_FRAME</span>
            </div>

            {/* 8 Anchor Resize Handles */}
            {anchorHandles.map((handle) => (
              <div
                key={handle.id}
                style={{
                  ...handle.style,
                  borderColor: "#7c3aed",
                }}
                className="absolute w-2.5 h-2.5 bg-white border-2 rounded-[2px] shadow-sm z-40"
              />
            ))}

            {/* Top Dimensions Tooltip Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.35 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded bg-[#111111]/95 text-white font-mono text-[10px] shadow-xl border border-white/20 whitespace-nowrap"
            >
              <span className="text-neutral-200">W: 1120px  H: 480px</span>
              <span className="text-neutral-500">•</span>
              <span className="text-emerald-400 font-bold">HERO_FRAME_LOCKED ✓</span>
            </motion.div>
          </motion.div>

          {/* Agent Cursor 1: [Design] 지원 (Anchoring Top-Left) */}
          <motion.div
            initial={{
              x: boxX - 120,
              y: boxY - 100,
              opacity: 0,
            }}
            animate={{
              x: boxX - 4,
              y: boxY - 4,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none"
          >
            <CursorPointer
              color="#7c3aed"
              role="Design"
              name="지원"
            />
          </motion.div>

          {/* Agent Cursor 2: [Architect] 병욱 (Dragging Diagonally to Bottom-Right) */}
          <motion.div
            initial={{
              x: boxX - 4,
              y: boxY - 4,
              opacity: 0,
            }}
            animate={{
              x: [boxX - 4, boxX - 4, boxX + boxWidth - 4],
              y: [boxY - 4, boxY - 4, boxY + boxHeight - 4],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1.1,
              times: [0, 0.1, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none"
          >
            <CursorPointer
              color="#0f172a"
              role="Architect"
              name="병욱"
            />
          </motion.div>
        </>
      )}

      {/* 5. Bottom Capsule Status Indicator Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111]/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md text-[11px] font-mono tracking-tight overflow-hidden min-w-[280px]"
        >
          {/* Top Row: Indicator & Label */}
          <div className="flex items-center gap-2.5 w-full justify-center">
            {/* Pulsing Light */}
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  phase === "READY_FOR_STEP3" ? "bg-emerald-400" : "bg-cyan-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  phase === "READY_FOR_STEP3" ? "bg-emerald-500" : "bg-cyan-500"
                }`}
              />
            </span>

            {/* Dynamic Status Text */}
            <span className="font-semibold text-white tracking-wide">
              {phase === "LOADING" && "● INITIALIZING STUDIO CANVAS... [1.5s]"}
              {phase === "WIREFRAMING" && "● STEP 02: DRAFTING HERO WIREFRAME FRAME..."}
              {phase === "READY_FOR_STEP3" && "● STEP 02: HERO WIREFRAME READY ✓"}
            </span>
          </div>

          {/* Phase 1 Mini Progress Bar (Bottom Line) */}
          {phase === "LOADING" && (
            <div className="w-full bg-neutral-800 h-[2px] rounded-full overflow-hidden mt-0.5">
              <div
                style={{
                  width: `${progressWidth}%`,
                  transition: "width 1.45s linear",
                }}
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
