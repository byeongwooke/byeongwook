"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectionBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  label?: string;
  agentName?: string;
  showHandles?: boolean;
  showDimensions?: boolean;
  showSnapGuides?: boolean;
  snapColor?: string;
  isWireframe?: boolean;
  className?: string;
}

export function SelectionBox({
  x,
  y,
  width,
  height,
  color = "#0ea5e9", // Cyan Blue
  label,
  agentName,
  showHandles = true,
  showDimensions = true,
  showSnapGuides = false,
  snapColor = "#ec4899", // Magenta Pink
  isWireframe = false,
  className = "",
}: SelectionBoxProps) {
  // 8 Resize Handles Positions
  const handles = [
    { pos: "top-left", style: { top: -4, left: -4 } },
    { pos: "top-center", style: { top: -4, left: "50%", transform: "translateX(-50%)" } },
    { pos: "top-right", style: { top: -4, right: -4 } },
    { pos: "middle-left", style: { top: "50%", left: -4, transform: "translateY(-50%)" } },
    { pos: "middle-right", style: { top: "50%", right: -4, transform: "translateY(-50%)" } },
    { pos: "bottom-left", style: { bottom: -4, left: -4 } },
    { pos: "bottom-center", style: { bottom: -4, left: "50%", transform: "translateX(-50%)" } },
    { pos: "bottom-right", style: { bottom: -4, right: -4 } },
  ];

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* Figma Alignment Snap Crosshair Guides */}
      <AnimatePresence>
        {showSnapGuides && (
          <>
            {/* Horizontal Snap Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                top: y,
                borderColor: snapColor,
              }}
              className="fixed left-0 right-0 z-30 border-t border-dashed"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                top: y + height,
                borderColor: snapColor,
              }}
              className="fixed left-0 right-0 z-30 border-t border-dashed"
            />

            {/* Vertical Snap Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                left: x,
                borderColor: snapColor,
              }}
              className="fixed top-0 bottom-0 z-30 border-l border-dashed"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                left: x + width,
                borderColor: snapColor,
              }}
              className="fixed top-0 bottom-0 z-30 border-l border-dashed"
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Selection Bounding Box */}
      <motion.div
        initial={false}
        animate={{
          x,
          y,
          width,
          height,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 280,
          mass: 0.5,
        }}
        style={{
          borderColor: color,
        }}
        className={`fixed top-0 left-0 z-35 border ${
          isWireframe
            ? "border-dashed bg-neutral-100/30"
            : "border-solid bg-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.4)]"
        }`}
      >
        {/* Top Label: Agent Name & Component Type */}
        {(label || agentName) && (
          <div
            className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 rounded-t-sm text-[9px] font-mono font-bold text-white shadow-sm"
            style={{ backgroundColor: color }}
          >
            {agentName && <span>{agentName}</span>}
            {label && <span className="opacity-90">({label})</span>}
          </div>
        )}

        {/* 8 Transform Resize Handles */}
        {showHandles &&
          handles.map((h) => (
            <div
              key={h.pos}
              style={{
                ...h.style,
                borderColor: color,
              }}
              className="absolute w-2 h-2 bg-white border-[1.5px] rounded-[1px] shadow-sm z-40"
            />
          ))}

        {/* Live Coordinate & Dimension Tooltip */}
        {showDimensions && (
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#111111]/90 text-white font-mono text-[9px] tracking-tight whitespace-nowrap shadow-md border border-white/20 backdrop-blur-sm flex items-center gap-2"
          >
            <span>
              W: <strong className="text-neutral-100">{Math.round(width)}px</strong>
            </span>
            <span className="text-neutral-500">•</span>
            <span>
              H: <strong className="text-neutral-100">{Math.round(height)}px</strong>
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">
              X: {Math.round(x)} Y: {Math.round(y)}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
