"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  color: string;
  x: number;
  y: number;
  visible?: boolean;
  actionTooltip?: string | null;
}

export const INITIAL_AGENTS: AgentInfo[] = [
  { id: "agent-01", name: "AGENT 01", role: "LEAD ARCHITECT", color: "#2563eb", x: 120, y: 140, visible: true },
  { id: "agent-02", name: "AGENT 02", role: "UI LAYOUT", color: "#ec4899", x: 380, y: 190, visible: true },
  { id: "agent-03", name: "AGENT 03", role: "TYPOGRAPHY", color: "#10b981", x: 580, y: 220, visible: true },
  { id: "agent-04", name: "AGENT 04", role: "VISUAL ASSETS", color: "#8b5cf6", x: 780, y: 180, visible: true },
  { id: "agent-05", name: "AGENT 05", role: "METRICS & DATA", color: "#f59e0b", x: 920, y: 320, visible: true },
  { id: "agent-06", name: "AGENT 06", role: "LOGISTICS POLICY", color: "#06b6d4", x: 260, y: 380, visible: true },
  { id: "agent-07", name: "AGENT 07", role: "API ARCHITECTURE", color: "#6366f1", x: 440, y: 440, visible: true },
  { id: "agent-08", name: "AGENT 08", role: "SECURITY ISMS-P", color: "#f43f5e", x: 640, y: 490, visible: true },
  { id: "agent-09", name: "AGENT 09", role: "QA VERIFICATION", color: "#14b8a6", x: 820, y: 520, visible: true },
  { id: "agent-10", name: "AGENT 10", role: "PROD DEPLOY", color: "#eab308", x: 980, y: 480, visible: true },
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
  agents: AgentInfo[];
  isStandby: boolean;
  windowWidth: number;
}

export function AgentFleet({ agents, isStandby, windowWidth }: AgentFleetProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 10 Agent Cursors */}
      {agents.map((agent, index) => {
        // If standby, smoothly cluster in the top-right header dock
        const targetX = isStandby
          ? Math.max(100, windowWidth - 440 + (index % 5) * 62)
          : agent.x;
        const targetY = isStandby
          ? 14 + Math.floor(index / 5) * 26
          : agent.y;

        return (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              x: targetX,
              y: targetY,
              opacity: agent.visible ? 1 : 0,
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
              <FigmaCursorSvg color={agent.color} />

              {/* Pill Badge */}
              <div
                className="absolute left-3 top-3 flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-white shadow-md border border-white/25 whitespace-nowrap bg-[#111111]/95 backdrop-blur-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: agent.color }}
                />
                <span className="text-neutral-200">{agent.name}</span>
                {!isStandby && (
                  <span
                    className="hidden sm:inline px-1 py-0.1 rounded text-[8px] font-medium"
                    style={{ backgroundColor: `${agent.color}25`, color: agent.color }}
                  >
                    [{agent.role}]
                  </span>
                )}
              </div>

              {/* Action Tooltip (shown while active) */}
              <AnimatePresence>
                {!isStandby && agent.actionTooltip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 3 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 2 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-3 top-8.5 z-50 bg-[#111111]/95 text-white border border-neutral-700 shadow-xl rounded px-2 py-0.5 text-[9px] font-mono whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm"
                  >
                    <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: agent.color }} />
                    <span>{agent.actionTooltip}</span>
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
              left: Math.max(20, windowWidth - 460),
              top: 68,
            }}
            className="fixed z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md text-[11px] font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">ALL AGENTS STANDBY:</span>
            <span className="text-neutral-300 italic">&ldquo;next project ready...&rdquo;</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
