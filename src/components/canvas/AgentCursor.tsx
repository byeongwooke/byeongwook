"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AgentCursorProps {
  id: string;
  name: string;
  task: string;
  color: string;
  x: number;
  y: number;
  visible?: boolean;
  actionTooltip?: string | null;
  className?: string;
}

export function AgentCursor({
  name,
  task,
  color,
  x,
  y,
  visible = true,
  actionTooltip,
  className = "",
}: AgentCursorProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={false}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 32,
        stiffness: 300,
        mass: 0.4,
      }}
      className={`fixed top-0 left-0 z-50 pointer-events-none select-none will-change-transform ${className}`}
    >
      <div className="relative">
        {/* Figma Vector Cursor Arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            fill={color}
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>

        {/* Agent Name & Status Tag Badge */}
        <div
          className="absolute left-3.5 top-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-tight text-white shadow-lg border border-white/20 whitespace-nowrap backdrop-blur-sm"
          style={{ backgroundColor: "#111111" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
            style={{ backgroundColor: color }}
          />
          <span className="text-neutral-200">{name}</span>
          <span
            className="px-1 py-0.2 rounded text-[9px] font-semibold"
            style={{ backgroundColor: `${color}25`, color: color }}
          >
            [{task}]
          </span>
        </div>

        {/* Live Action Tooltip Balloon */}
        <AnimatePresence>
          {actionTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 2 }}
              transition={{ duration: 0.18 }}
              className="absolute left-3.5 top-9.5 z-50 bg-[#111111]/95 text-white border border-neutral-700 shadow-xl rounded-md px-2.5 py-1 text-[10px] font-mono whitespace-nowrap flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span>{actionTooltip}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
