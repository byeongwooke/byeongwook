"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentFleet, AgentInfo, INITIAL_AGENTS } from "./AgentFleet";
import { FigmaBoundingBox, FigmaBoundingBoxProps } from "./FigmaBoundingBox";
import { RefreshCw } from "lucide-react";

export type CinematicStep = 0 | 1 | 2 | 3 | 4 | 5;

interface CinematicBuilderProps {
  onStepChange?: (step: CinematicStep) => void;
  onComplete?: () => void;
}

export function CinematicBuilder({ onStepChange, onComplete }: CinematicBuilderProps) {
  const [step, setStep] = useState<CinematicStep>(0);
  const [isStandby, setIsStandby] = useState(false);
  const [agents, setAgents] = useState<AgentInfo[]>(INITIAL_AGENTS);
  const [activeBox, setActiveBox] = useState<FigmaBoundingBoxProps | null>(null);
  const [windowWidth, setWindowWidth] = useState(1440);
  const [replayKey, setReplayKey] = useState(0);
  const [metricNum, setMetricNum] = useState(0);

  // Store callbacks in refs to avoid re-triggering the timer loop on parent state updates
  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // MASTER TIMELINE ENGINE
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timeout[] = [];

    const width = typeof window !== "undefined" ? window.innerWidth : 1440;
    const centerX = width / 2;

    // Reset to Step 0 immediately
    setStep(0);
    setIsStandby(false);
    setMetricNum(0);
    onStepChangeRef.current?.(0);

    // Initial smooth scroll to Top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ==========================================
    // STEP 0: HERO BUILD (0.0s ~ 1.8s)
    // ==========================================
    setActiveBox({
      x: Math.max(40, centerX - 560),
      y: 110,
      width: Math.min(width - 80, 1120),
      height: 480,
      color: "#2563eb",
      agentTag: "AGENT 01",
      label: "HERO_FRAME_ASSEMBLY",
      dimensionText: "W: 1120px  H: 480px",
      showSnapGuides: false,
      isDashed: true,
      visible: true,
    });

    setAgents([
      { id: "agent-01", name: "AGENT 01", role: "LEAD ARCHITECT", color: "#2563eb", x: centerX - 540, y: 120, visible: true, actionTooltip: "Dragging Hero Bounding Box" },
      { id: "agent-02", name: "AGENT 02", role: "UI LAYOUT", color: "#ec4899", x: centerX + 520, y: 560, visible: true, actionTooltip: "Resizing Corner Anchor" },
      { id: "agent-03", name: "AGENT 03", role: "TYPOGRAPHY", color: "#10b981", x: centerX - 120, y: 220, visible: true, actionTooltip: "Locking Pretendard Headline" },
      { id: "agent-04", name: "AGENT 04", role: "VISUAL ASSETS", color: "#8b5cf6", x: centerX + 260, y: 260, visible: true, actionTooltip: "Injecting Role Badges" },
      { id: "agent-05", name: "AGENT 05", role: "METRICS & DATA", color: "#f59e0b", x: centerX + 380, y: 440, visible: true, actionTooltip: "Preparing +150% Growth Card" },
      { id: "agent-06", name: "AGENT 06", role: "LOGISTICS POLICY", color: "#06b6d4", x: centerX - 320, y: 460, visible: true, actionTooltip: "SLA Framework Link" },
      { id: "agent-07", name: "AGENT 07", role: "API ARCHITECTURE", color: "#6366f1", x: centerX - 80, y: 500, visible: false },
      { id: "agent-08", name: "AGENT 08", role: "SECURITY ISMS-P", color: "#f43f5e", x: centerX + 120, y: 500, visible: false },
      { id: "agent-09", name: "AGENT 09", role: "QA VERIFICATION", color: "#14b8a6", x: centerX + 280, y: 500, visible: false },
      { id: "agent-10", name: "AGENT 10", role: "PROD DEPLOY", color: "#eab308", x: centerX + 440, y: 500, visible: false },
    ]);

    // Flash Snap Guides for Hero at 0.8s
    timers.push(
      setTimeout(() => {
        setActiveBox((prev) => (prev ? { ...prev, showSnapGuides: true, isDashed: false } : null));
      }, 800)
    );

    // ==========================================
    // STEP 1: PHILOSOPHY BUILD (1.8s ~ 3.5s)
    // ==========================================
    timers.push(
      setTimeout(() => {
        setStep(1);
        onStepChangeRef.current?.(1);

        // Smooth scroll to Philosophy
        document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });

        setActiveBox({
          x: Math.max(40, centerX - 560),
          y: 200,
          width: Math.min(width - 80, 1120),
          height: 380,
          color: "#ec4899",
          agentTag: "AGENT 02",
          label: "PHILOSOPHY_3_COLUMNS",
          dimensionText: "Grid: 3x1 Auto-Layout",
          showSnapGuides: true,
          isDashed: true,
          visible: true,
        });

        setAgents((prev) =>
          prev.map((a) => {
            if (a.id === "agent-02") return { ...a, x: centerX - 360, y: 260, visible: true, actionTooltip: "01. Empathy Wireframe" };
            if (a.id === "agent-06") return { ...a, x: centerX, y: 260, visible: true, actionTooltip: "02. Attitude Architecture" };
            if (a.id === "agent-08") return { ...a, x: centerX + 360, y: 260, visible: true, actionTooltip: "03. First-Principles Verified" };
            if (a.id === "agent-01") return { ...a, x: centerX - 480, y: 160, visible: true, actionTooltip: "Snapping Section Bounds" };
            return { ...a, visible: true };
          })
        );
      }, 1800)
    );

    // ==========================================
    // STEP 2: PROJECTS & METRIC INJECTION (3.5s ~ 5.5s)
    // ==========================================
    timers.push(
      setTimeout(() => {
        setStep(2);
        onStepChangeRef.current?.(2);

        // Smooth scroll to Projects
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

        setActiveBox({
          x: Math.max(40, centerX - 560),
          y: 180,
          width: Math.min(width - 80, 1120),
          height: 520,
          color: "#f59e0b",
          agentTag: "AGENT 05",
          label: "CASE_STUDIES_INJECTION",
          dimensionText: "W: 1120px  H: 520px  Snap: 0px",
          showSnapGuides: true,
          isDashed: false,
          visible: true,
        });

        // Animate countup 0% -> +150%
        let count = 0;
        const countInterval = setInterval(() => {
          count += 20;
          if (count >= 150) {
            count = 150;
            clearInterval(countInterval);
          }
          setMetricNum(count);
        }, 40);
        intervals.push(countInterval);

        setAgents((prev) =>
          prev.map((a) => {
            if (a.id === "agent-05") return { ...a, x: centerX - 280, y: 320, visible: true, actionTooltip: "Injecting +150% Revenue KPI" };
            if (a.id === "agent-06") return { ...a, x: centerX + 120, y: 320, visible: true, actionTooltip: "Cost -28% Algorithm Locked" };
            if (a.id === "agent-07") return { ...a, x: centerX + 400, y: 320, visible: true, actionTooltip: "50k DB Migration Verified" };
            if (a.id === "agent-09") return { ...a, x: centerX - 80, y: 440, visible: true, actionTooltip: "SLA 99.2% QA Passed ✓" };
            return { ...a, visible: true };
          })
        );
      }, 3500)
    );

    // ==========================================
    // STEP 3: CAPABILITIES & TIMELINE (5.5s ~ 7.0s)
    // ==========================================
    timers.push(
      setTimeout(() => {
        setStep(3);
        onStepChangeRef.current?.(3);

        // Smooth scroll to Capabilities
        document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });

        setActiveBox({
          x: Math.max(40, centerX - 560),
          y: 200,
          width: Math.min(width - 80, 1120),
          height: 420,
          color: "#10b981",
          agentTag: "AGENT 03",
          label: "CAPABILITIES_MATRIX",
          dimensionText: "3x4 Domain Fluency Grid",
          showSnapGuides: true,
          isDashed: true,
          visible: true,
        });

        setAgents((prev) =>
          prev.map((a) => {
            if (a.id === "agent-03") return { ...a, x: centerX - 320, y: 280, visible: true, actionTooltip: "Product Leadership Locked" };
            if (a.id === "agent-08") return { ...a, x: centerX, y: 280, visible: true, actionTooltip: "ISMS-P Security Verified" };
            if (a.id === "agent-07") return { ...a, x: centerX + 320, y: 280, visible: true, actionTooltip: "API Architecture Documented" };
            if (a.id === "agent-10") return { ...a, x: centerX + 480, y: 460, visible: true, actionTooltip: "CI/CD Pipeline Ready" };
            return { ...a, visible: true };
          })
        );
      }, 5500)
    );

    // ==========================================
    // STEP 4: CONTACT SECTION BUILD (7.0s ~ 8.5s)
    // ==========================================
    timers.push(
      setTimeout(() => {
        setStep(4);
        onStepChangeRef.current?.(4);

        // Smooth scroll to Contact
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

        setActiveBox({
          x: Math.max(40, centerX - 560),
          y: 200,
          width: Math.min(width - 80, 1120),
          height: 440,
          color: "#8b5cf6",
          agentTag: "AGENT 04",
          label: "CONTACT_CHANNELS_LOCKED",
          dimensionText: "Email & Form Endpoints Active",
          showSnapGuides: true,
          isDashed: false,
          visible: true,
        });

        setAgents((prev) =>
          prev.map((a) => {
            if (a.id === "agent-01") return { ...a, x: centerX - 240, y: 280, visible: true, actionTooltip: "byeongwooke@gmail.com Synced" };
            if (a.id === "agent-09") return { ...a, x: centerX + 220, y: 340, visible: true, actionTooltip: "Form Handlers Ready" };
            if (a.id === "agent-10") return { ...a, x: centerX, y: 460, visible: true, actionTooltip: "Final Polish 100%" };
            return { ...a, visible: true };
          })
        );
      }, 7000)
    );

    // ==========================================
    // STEP 5: GRAND FINALE (8.5s+)
    // ==========================================
    timers.push(
      setTimeout(() => {
        setStep(5);
        setIsStandby(true);
        setActiveBox(null);
        onStepChangeRef.current?.(5);
        onCompleteRef.current?.();

        // Smooth scroll back to top of the page so visitor can explore the masterpiece
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 8500)
    );

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [replayKey]);

  return (
    <div className="hidden md:block select-none pointer-events-none">
      {/* 1. Fine Blueprint Design Grid */}
      <div
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${
          step < 5
            ? "opacity-50 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"
            : "opacity-15 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"
        }`}
      />

      {/* 2. Active Figma Bounding Box & Snap Crosshairs */}
      {activeBox && <FigmaBoundingBox {...activeBox} />}

      {/* 3. 10 AI Agent Fleet */}
      <AgentFleet agents={agents} isStandby={isStandby} windowWidth={windowWidth} />

      {/* 4. Live Pacing Banner during Cinematic Build */}
      <AnimatePresence>
        {step < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111111]/95 text-white border border-neutral-700/80 rounded-full px-6 py-2.5 text-xs font-mono shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-semibold text-cyan-300">
              {step === 0 && "STEP 1/5: Materializing Hero & Value Proposition..."}
              {step === 1 && "STEP 2/5: Auto-Aligning 3 Core Working Principles..."}
              {step === 2 && `STEP 3/5: Injecting Project Case Studies & Metrics (+${metricNum}%)...`}
              {step === 3 && "STEP 4/5: Compiling Technical & Domain Fluency Matrix..."}
              {step === 4 && "STEP 5/5: Securing Communication Channels & Endpoints..."}
            </span>
            <span className="text-neutral-500 font-sans text-[11px]">• Hands-Free Showcase</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Minimal Replay Build Button (Bottom-Right, Active when Standby) */}
      <AnimatePresence>
        {isStandby && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 pointer-events-auto"
          >
            <button
              onClick={() => {
                setReplayKey((k) => k + 1);
              }}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white border border-neutral-700 shadow-xl text-xs font-medium transition-all active:scale-95"
              title="다시 실시간 자동 조립 관람하기"
            >
              <RefreshCw className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 duration-500 text-cyan-400" />
              <span>Replay Build ↻</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
