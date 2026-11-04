"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SquadMember {
  id: string;
  name: string;
  role: string;
  color: string;
  x: number;
  y: number;
  visible?: boolean;
  actionTooltip?: string | null;
  typingText?: string | null;
}

export const SQUAD_MEMBERS: SquadMember[] = [
  { id: "cursor-01", name: "병욱", role: "PO", color: "#0f172a", x: 140, y: 120, visible: true },
  { id: "cursor-02", name: "민서", role: "PM", color: "#4f46e5", x: 380, y: 160, visible: true },
  { id: "cursor-03", name: "지원", role: "Design", color: "#7c3aed", x: 220, y: 220, visible: true },
  { id: "cursor-04", name: "준혁", role: "Design", color: "#ec4899", x: 580, y: 240, visible: true },
  { id: "cursor-05", name: "도현", role: "Frontend", color: "#06b6d4", x: 340, y: 320, visible: true },
  { id: "cursor-06", name: "수아", role: "Frontend", color: "#2563eb", x: 720, y: 340, visible: true },
  { id: "cursor-07", name: "지우", role: "Copy", color: "#059669", x: 440, y: 200, visible: true },
  { id: "cursor-08", name: "현우", role: "Copy", color: "#16a34a", x: 620, y: 400, visible: true },
  { id: "cursor-09", name: "예진", role: "Copy", color: "#0d9488", x: 800, y: 260, visible: true },
  { id: "cursor-10", name: "태양", role: "QA", color: "#e11d48", x: 920, y: 420, visible: true },
];

function FigmaCursorSvg({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
        stroke="#ffffff"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AgentFleetProps {
  members: SquadMember[];
  isStandby: boolean;
  windowWidth: number;
}

export function AgentFleet({ members, isStandby, windowWidth }: AgentFleetProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 10 Squad Cursors */}
      {members.map((member, index) => {
        // If standby, smoothly dock in the top-right header formation (fixed right-6 top-4)
        const targetX = isStandby
          ? Math.max(20, windowWidth - 340 + (index % 5) * 60)
          : member.x;
        const targetY = isStandby
          ? 14 + Math.floor(index / 5) * 26
          : member.y;

        return (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              x: targetX,
              y: targetY,
              opacity: member.visible !== false ? 1 : 0,
              scale: isStandby ? 0.85 : 1,
            }}
            transition={{
              type: "spring",
              damping: isStandby ? 34 : 26,
              stiffness: isStandby ? 220 : 180,
              mass: 0.4,
            }}
            className="fixed top-0 left-0 pointer-events-none select-none will-change-transform"
          >
            <div className="relative">
              {/* Figma Vector Pointer */}
              <FigmaCursorSvg color={member.color} />

              {/* Persona Tag Pill */}
              <div
                className="absolute left-3 top-3 flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-white shadow-md border border-white/25 whitespace-nowrap bg-[#111111]/95 backdrop-blur-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: member.color }}
                />
                <span className="text-neutral-300">[{member.role}]</span>
                <span className="text-white font-semibold">{member.name}</span>
              </div>

              {/* Action Tooltip / Status Balloon */}
              <AnimatePresence>
                {!isStandby && member.actionTooltip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 3 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 2 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-3 top-8.5 z-50 bg-[#111111]/95 text-white border border-neutral-700 shadow-xl rounded px-2.5 py-1 text-[10px] font-mono whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: member.color }} />
                    <span>{member.actionTooltip}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Live Typing Inline Bubble */}
              <AnimatePresence>
                {!isStandby && member.typingText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 2 }}
                    className="absolute left-3 top-8.5 z-50 bg-white text-neutral-900 border border-neutral-300 shadow-2xl rounded-md px-2.5 py-1 text-[11px] font-medium whitespace-nowrap flex items-center gap-1"
                  >
                    <span className="text-xs font-mono text-emerald-600">✍</span>
                    <span>{member.typingText}</span>
                    <span className="w-1 h-3 bg-neutral-900 animate-pulse ml-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}

      {/* Standby Grand Finale Pill (Top-Right) */}
      <AnimatePresence>
        {isStandby && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.92 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              right: 24,
              top: 72,
            }}
            className="fixed z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md text-[11px] font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">ALL SQUAD STANDBY:</span>
            <span className="text-neutral-300 italic">&ldquo;next project ready...&rdquo;</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
