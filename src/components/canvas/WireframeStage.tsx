"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

export type StagePhase =
  | "LOADING"
  | "WIREFRAMING"
  | "SNAP_TRANSITION"
  | "MATERIALIZED";

interface WireframeStageProps {
  onPhaseChange?: (phase: StagePhase) => void;
}

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
      <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-lg border border-white/25 whitespace-nowrap bg-[#111111]/95 backdrop-blur-sm">
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

export function WireframeStage({ onPhaseChange }: WireframeStageProps) {
  const [phase, setPhase] = useState<StagePhase>("LOADING");
  const [progressWidth, setProgressWidth] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1440, height: 900 });
  const [replayKey, setReplayKey] = useState(0);

  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;

  // Window resize handler
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

  // Master Stage Timeline State Machine
  useEffect(() => {
    setPhase("LOADING");
    setProgressWidth(0);
    onPhaseChangeRef.current?.("LOADING");

    // Start progress bar filling for 1.5s
    const progressTimer = setTimeout(() => {
      setProgressWidth(100);
    }, 50);

    // [1.5s] Phase 2: WIREFRAMING (Drafting Box)
    const wireframeTimer = setTimeout(() => {
      setPhase("WIREFRAMING");
      onPhaseChangeRef.current?.("WIREFRAMING");
    }, 1500);

    // [3.0s] Phase 3: SNAP_TRANSITION (Flash Crosshairs & Fade out draft box)
    const snapTimer = setTimeout(() => {
      setPhase("SNAP_TRANSITION");
      onPhaseChangeRef.current?.("SNAP_TRANSITION");
    }, 3000);

    // [3.3s] Phase 4: MATERIALIZED (Actual Hero component snaps into view)
    const materializeTimer = setTimeout(() => {
      setPhase("MATERIALIZED");
      onPhaseChangeRef.current?.("MATERIALIZED");
    }, 3300);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(wireframeTimer);
      clearTimeout(snapTimer);
      clearTimeout(materializeTimer);
    };
  }, [replayKey]);

  // Compute precise box dimensions aligned with HeroSection (max-w-6xl: 1104px content width, pt-32: 128px top)
  const boxWidth = Math.min(1104, Math.max(320, windowDimensions.width - 48));
  const boxHeight = 500;
  const boxX = (windowDimensions.width - boxWidth) / 2;
  const boxY = 128;

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
    <div
      className={`fixed inset-0 z-40 select-none overflow-hidden transition-all duration-700 ${
        phase === "MATERIALIZED"
          ? "pointer-events-none bg-transparent"
          : "bg-white"
      }`}
    >
      {/* 1. Dot Grid Background (Fades out gently upon materialization) */}
      <motion.div
        animate={{ opacity: phase === "MATERIALIZED" ? 0.35 : 0.6 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-white bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
      />

      {/* Subtle Major 120px Coordinate Lines */}
      <motion.div
        animate={{ opacity: phase === "MATERIALIZED" ? 0.2 : 0.7 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:120px_120px] pointer-events-none"
      />

      {/* Top-Left Metadata Indicator */}
      <motion.div
        animate={{ opacity: phase === "MATERIALIZED" ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-6 left-6 flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 pointer-events-none"
      >
        <span className="font-semibold text-neutral-800">STUDIO_CANVAS</span>
        <span className="text-neutral-300">/</span>
        <span>GRID: 24px</span>
        <span className="text-neutral-300">•</span>
        <span
          className={
            phase === "LOADING"
              ? "text-amber-500 font-bold"
              : phase === "WIREFRAMING"
              ? "text-purple-600 font-bold"
              : "text-emerald-500 font-bold"
          }
        >
          {phase === "LOADING" && "PHASE: 01_BUFFER"}
          {phase === "WIREFRAMING" && "PHASE: 02_WIREFRAME"}
          {phase === "SNAP_TRANSITION" && "PHASE: 03_SNAP"}
          {phase === "MATERIALIZED" && "PHASE: 03_MATERIALIZED"}
        </span>
      </motion.div>

      {/* Corner Crosshair Marks */}
      <div className="absolute top-6 right-6 font-mono text-xs text-neutral-300 pointer-events-none">+</div>
      <div className="absolute bottom-6 left-6 font-mono text-xs text-neutral-300 pointer-events-none">+</div>
      <div className="absolute bottom-6 right-6 font-mono text-xs text-neutral-300 pointer-events-none">+</div>

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

      {/* Phase 3: Intense Magenta/Cyan Snap Flash (3.0s ~ 3.3s, 0.25s flash) */}
      <AnimatePresence>
        {phase === "SNAP_TRANSITION" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, times: [0, 0.2, 0.7, 1] }}
              style={{ top: boxY + boxHeight / 2 }}
              className="fixed left-0 right-0 border-t-2 border-[#ec4899] shadow-[0_0_16px_#ec4899] z-50 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, times: [0, 0.2, 0.7, 1] }}
              style={{ left: boxX + boxWidth / 2 }}
              className="fixed top-0 bottom-0 border-l-2 border-[#ec4899] shadow-[0_0_16px_#ec4899] z-50 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Phase 2: Expanding Wireframe Bounding Box + 2 Cursors (Cleanly fades out in Phase 3) */}
      <AnimatePresence>
        {(phase === "WIREFRAMING" || phase === "SNAP_TRANSITION") && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "SNAP_TRANSITION" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none"
          >
            {/* Subtle Alignment Center Guides */}
            <div
              style={{ top: boxY + boxHeight / 2 }}
              className="fixed left-0 right-0 border-t border-dashed border-[#06b6d4]/40 z-20"
            />
            <div
              style={{ left: boxX + boxWidth / 2 }}
              className="fixed top-0 bottom-0 border-l border-dashed border-[#ec4899]/40 z-20"
            />

            {/* Expanding Dashed Wireframe Bounding Box */}
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
                opacity: phase === "SNAP_TRANSITION" ? 0 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="fixed top-0 left-0 z-50 pointer-events-none"
            >
              <CursorPointer color="#7c3aed" role="Design" name="지원" />
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
                opacity: phase === "SNAP_TRANSITION" ? 0 : [0, 1, 1],
              }}
              transition={{
                duration: 1.1,
                times: [0, 0.1, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed top-0 left-0 z-50 pointer-events-none"
            >
              <CursorPointer color="#0f172a" role="Architect" name="병욱" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Bottom Capsule Status Indicator Bar (Remains visible throughout) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111111]/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md text-[11px] font-mono tracking-tight overflow-hidden"
        >
          {/* Pulsing Light */}
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                phase === "MATERIALIZED"
                  ? "bg-emerald-400"
                  : phase === "SNAP_TRANSITION"
                  ? "bg-purple-400"
                  : "bg-cyan-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                phase === "MATERIALIZED"
                  ? "bg-emerald-500"
                  : phase === "SNAP_TRANSITION"
                  ? "bg-purple-500"
                  : "bg-cyan-500"
              }`}
            />
          </span>

          {/* Dynamic Status Text */}
          <span className="font-semibold text-white tracking-wide">
            {phase === "LOADING" && "● INITIALIZING STUDIO CANVAS... [1.5s]"}
            {phase === "WIREFRAMING" && "● STEP 02: DRAFTING HERO WIREFRAME FRAME..."}
            {phase === "SNAP_TRANSITION" && "● STEP 03: SNAPPING HERO COMPONENT..."}
            {phase === "MATERIALIZED" && "● STEP 03: HERO COMPONENT MATERIALIZED (SUCCESS)"}
          </span>

          {/* Replay Button upon Materialization */}
          {phase === "MATERIALIZED" && (
            <button
              onClick={() => setReplayKey((k) => k + 1)}
              className="flex items-center gap-1 ml-1.5 pl-2 border-l border-neutral-700 text-neutral-300 hover:text-white transition-colors"
              title="처음부터 다시 보기"
            >
              <RefreshCw className="h-3 w-3 text-cyan-400 hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px]">Replay</span>
            </button>
          )}

          {/* Phase 1 Mini Progress Bar */}
          {phase === "LOADING" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-800">
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
