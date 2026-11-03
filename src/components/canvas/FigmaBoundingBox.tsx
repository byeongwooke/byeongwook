"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FigmaBoundingBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  label?: string;
  agentTag?: string;
  dimensionText?: string;
  showSnapGuides?: boolean;
  snapColor?: string;
  isDashed?: boolean;
  visible?: boolean;
}

export function FigmaBoundingBox({
  x,
  y,
  width,
  height,
  color = "#2563eb",
  label,
  agentTag,
  dimensionText,
  showSnapGuides = false,
  snapColor = "#ec4899", // Magenta
  isDashed = true,
  visible = true,
}: FigmaBoundingBoxProps) {
  if (!visible) return null;

  const corners = [
    { pos: "tl", style: { top: -4, left: -4 } },
    { pos: "tr", style: { top: -4, right: -4 } },
    { pos: "bl", style: { bottom: -4, left: -4 } },
    { pos: "br", style: { bottom: -4, right: -4 } },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-30">
      {/* 1. Magenta Dotted Snap Lines (Crosshair) */}
      <AnimatePresence>
        {showSnapGuides && (
          <>
            {/* Top Snap Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.85] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ top: y, borderColor: snapColor }}
              className="fixed left-0 right-0 border-t border-dashed z-25"
            />
            {/* Bottom Snap Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.85] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ top: y + height, borderColor: snapColor }}
              className="fixed left-0 right-0 border-t border-dashed z-25"
            />
            {/* Left Snap Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.85] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ left: x, borderColor: snapColor }}
              className="fixed top-0 bottom-0 border-l border-dashed z-25"
            />
            {/* Right Snap Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.85] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ left: x + width, borderColor: snapColor }}
              className="fixed top-0 bottom-0 border-l border-dashed z-25"
            />
          </>
        )}
      </AnimatePresence>

      {/* 2. Bounding Box */}
      <motion.div
        initial={{
          x,
          y,
          width: Math.min(width, 100),
          height: Math.min(height, 60),
          opacity: 0,
        }}
        animate={{
          x,
          y,
          width,
          height,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          borderColor: color,
        }}
        className={`fixed top-0 left-0 border ${
          isDashed ? "border-dashed bg-neutral-100/10" : "border-solid bg-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.6)]"
        }`}
      >
        {/* Top Header Tag: Agent & Label */}
        {(label || agentTag) && (
          <div
            style={{ backgroundColor: color }}
            className="absolute -top-5 left-0 flex items-center gap-1.5 px-2 py-0.5 rounded-t text-[9px] font-mono font-bold text-white shadow-sm"
          >
            {agentTag && <span>{agentTag}</span>}
            {label && <span className="opacity-90">{label}</span>}
          </div>
        )}

        {/* 4 Corner Resize Handles */}
        {corners.map((c) => (
          <div
            key={c.pos}
            style={{
              ...c.style,
              borderColor: color,
            }}
            className="absolute w-2 h-2 bg-white border-[1.5px] rounded-[1px] shadow-sm z-30"
          />
        ))}

        {/* Dimensions Tooltip (Bottom Center) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-[#111111]/90 text-white font-mono text-[9px] tracking-tight whitespace-nowrap shadow-md border border-white/20 backdrop-blur-sm flex items-center gap-1.5">
          <span>{dimensionText || `W: ${Math.round(width)}px  H: ${Math.round(height)}px`}</span>
          <span className="text-neutral-500">•</span>
          <span className="text-emerald-400 font-semibold">Snap: Center 0px</span>
        </div>
      </motion.div>
    </div>
  );
}
