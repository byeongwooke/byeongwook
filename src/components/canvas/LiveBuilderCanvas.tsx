"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentCursor } from "./AgentCursor";
import { SelectionBox } from "./SelectionBox";
import { RefreshCw, Play, CheckCircle2, Sliders, Zap } from "lucide-react";

export type BuildStep = "wireframing" | "snapping" | "materializing" | "injecting" | "patrol";

interface AgentState {
  id: string;
  name: string;
  task: string;
  color: string;
  x: number;
  y: number;
  visible: boolean;
  tooltip?: string | null;
}

export function LiveBuilderCanvas() {
  const [step, setStep] = useState<BuildStep>("wireframing");
  const [showGuides, setShowGuides] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [metricCounter, setMetricCounter] = useState(0);

  // Responsive positions based on actual viewport
  const [windowSize, setWindowSize] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const centerX = Math.max(200, windowSize.width / 2);

  // Dynamic coordinates
  const heroBox = {
    x: Math.max(40, centerX - 560),
    y: 120,
    width: Math.min(windowSize.width - 80, 1120),
    height: 480,
  };

  const metricBox = {
    x: Math.max(40, centerX - 560),
    y: 530,
    width: Math.min(windowSize.width - 80, 1120),
    height: 140,
  };

  // Agent States
  const [agents, setAgents] = useState<{ [id: string]: AgentState }>({
    agent1: {
      id: "agent1",
      name: "AGENT 01",
      task: "WIREFRAMING",
      color: "#0284c7", // Cyan
      x: 100,
      y: 80,
      visible: true,
      tooltip: "Dragging Frame",
    },
    agent2: {
      id: "agent2",
      name: "AGENT 02",
      task: "POSITIONING",
      color: "#ec4899", // Magenta Pink
      x: 350,
      y: 160,
      visible: true,
      tooltip: "Aligning 8px Grid",
    },
    agent3: {
      id: "agent3",
      name: "AGENT 03",
      task: "TYPOGRAPHY",
      color: "#10b981", // Emerald
      x: 600,
      y: 220,
      visible: true,
      tooltip: "Locking Pretendard font",
    },
    agent4: {
      id: "agent4",
      name: "AGENT 04",
      task: "METRICS_INJECT",
      color: "#f59e0b", // Amber Orange
      x: 750,
      y: 350,
      visible: true,
      tooltip: "Injecting +150% KPI",
    },
    agent5: {
      id: "agent5",
      name: "AGENT 05",
      task: "QA_VERIFIED",
      color: "#8b5cf6", // Purple
      x: 900,
      y: 420,
      visible: true,
      tooltip: "SLA 100% Locked ✓",
    },
  });

  // Construction Sequence Timeline Orchestration
  const runSequence = useCallback(() => {
    setStep("wireframing");
    setMetricCounter(0);

    // Initial Agent Placement (Step 1: Wireframing)
    setAgents({
      agent1: {
        id: "agent1",
        name: "AGENT 01",
        task: "WIREFRAMING",
        color: "#0284c7",
        x: heroBox.x - 30,
        y: heroBox.y - 20,
        visible: true,
        tooltip: "Drawing Wireframe Box",
      },
      agent2: {
        id: "agent2",
        name: "AGENT 02",
        task: "POSITIONING",
        color: "#ec4899",
        x: heroBox.x + heroBox.width + 20,
        y: heroBox.y + heroBox.height + 20,
        visible: true,
        tooltip: "Dragging Bottom-Right Handle",
      },
      agent3: {
        id: "agent3",
        name: "AGENT 03",
        task: "STANDBY",
        color: "#10b981",
        x: heroBox.x + 350,
        y: heroBox.y + 60,
        visible: false,
        tooltip: null,
      },
      agent4: {
        id: "agent4",
        name: "AGENT 04",
        task: "STANDBY",
        color: "#f59e0b",
        x: metricBox.x + 100,
        y: metricBox.y + 30,
        visible: false,
        tooltip: null,
      },
      agent5: {
        id: "agent5",
        name: "AGENT 05",
        task: "STANDBY",
        color: "#8b5cf6",
        x: metricBox.x + metricBox.width - 100,
        y: metricBox.y + 30,
        visible: false,
        tooltip: null,
      },
    });

    // Step 2: Snapping (at 0.8s)
    const timerSnap = setTimeout(() => {
      setStep("snapping");
      setAgents((prev) => ({
        ...prev,
        agent1: {
          ...prev.agent1,
          task: "SNAP_LOCKED",
          x: heroBox.x,
          y: heroBox.y,
          tooltip: "Snapped to Grid X: 80 Y: 120",
        },
        agent2: {
          ...prev.agent2,
          task: "BOUNDS_LOCKED",
          x: heroBox.x + heroBox.width,
          y: heroBox.y + heroBox.height,
          tooltip: `Dimensions W: ${heroBox.width} H: ${heroBox.height}`,
        },
        agent3: {
          ...prev.agent3,
          visible: true,
          task: "TYPOGRAPHY",
          x: heroBox.x + 180,
          y: heroBox.y + 110,
          tooltip: "Parsing Headlines",
        },
      }));
    }, 800);

    // Step 3: Materializing Real UI (at 1.5s)
    const timerMaterialize = setTimeout(() => {
      setStep("materializing");
      setAgents((prev) => ({
        ...prev,
        agent1: {
          ...prev.agent1,
          task: "FRAME_DONE",
          x: heroBox.x + 80,
          y: heroBox.y + 40,
          tooltip: "Materialized Hero UI",
        },
        agent3: {
          ...prev.agent3,
          task: "KERNING_OK",
          x: heroBox.x + 480,
          y: heroBox.y + 160,
          tooltip: "Pretendard Typography Locked",
        },
        agent4: {
          ...prev.agent4,
          visible: true,
          task: "METRICS_INJECT",
          x: metricBox.x + 180,
          y: metricBox.y + 40,
          tooltip: "Injecting +150% 새벽배송 KPI",
        },
        agent5: {
          ...prev.agent5,
          visible: true,
          task: "AUDITING",
          x: metricBox.x + 520,
          y: metricBox.y + 40,
          tooltip: "Auditing SLA Reliability",
        },
      }));

      // Count up metric
      let count = 0;
      const counterInterval = setInterval(() => {
        count += 15;
        if (count >= 150) {
          count = 150;
          clearInterval(counterInterval);
        }
        setMetricCounter(count);
      }, 40);
    }, 1500);

    // Step 4: Metrics Injection & Verification (at 2.3s)
    const timerInject = setTimeout(() => {
      setStep("injecting");
      setAgents((prev) => ({
        ...prev,
        agent4: {
          ...prev.agent4,
          task: "KPI_150%_LOCKED",
          x: metricBox.x + 240,
          y: metricBox.y + 60,
          tooltip: "+150% Growth Confirmed",
        },
        agent5: {
          ...prev.agent5,
          task: "SLA_VERIFIED",
          x: metricBox.x + 680,
          y: metricBox.y + 60,
          tooltip: "SLA 99.2% Zero Defects ✓",
        },
      }));
    }, 2300);

    // Step 5: Transition to Ambient Patrol Mode (at 3.2s)
    const timerPatrol = setTimeout(() => {
      setStep("patrol");
      setAgents((prev) => ({
        agent1: {
          ...prev.agent1,
          task: "PATROL_HERO",
          x: heroBox.x + 120,
          y: heroBox.y + 80,
          tooltip: null,
        },
        agent2: {
          ...prev.agent2,
          task: "INSPECT_NAV",
          x: windowSize.width - 240,
          y: 70,
          tooltip: null,
        },
        agent3: {
          ...prev.agent3,
          task: "PATROL_BODY",
          x: heroBox.x + 280,
          y: heroBox.y + 240,
          tooltip: null,
        },
        agent4: {
          ...prev.agent4,
          task: "PATROL_METRICS",
          x: metricBox.x + 360,
          y: metricBox.y + 40,
          tooltip: null,
        },
        agent5: {
          ...prev.agent5,
          task: "VERIFIED_READY",
          x: metricBox.x + metricBox.width - 80,
          y: metricBox.y + 60,
          tooltip: "Ready for exploration",
        },
      }));
    }, 3200);

    return () => {
      clearTimeout(timerSnap);
      clearTimeout(timerMaterialize);
      clearTimeout(timerInject);
      clearTimeout(timerPatrol);
    };
  }, [heroBox.x, heroBox.y, heroBox.width, heroBox.height, metricBox.x, metricBox.y, metricBox.width, windowSize.width]);

  useEffect(() => {
    runSequence();
  }, [replayKey, runSequence]);

  // Ambient slight hover motion during Patrol phase
  useEffect(() => {
    if (step !== "patrol") return;

    const interval = setInterval(() => {
      setAgents((prev) => ({
        ...prev,
        agent1: {
          ...prev.agent1,
          x: prev.agent1.x + (Math.random() * 20 - 10),
          y: prev.agent1.y + (Math.random() * 16 - 8),
        },
        agent3: {
          ...prev.agent3,
          x: prev.agent3.x + (Math.random() * 24 - 12),
          y: prev.agent3.y + (Math.random() * 16 - 8),
        },
        agent4: {
          ...prev.agent4,
          x: prev.agent4.x + (Math.random() * 18 - 9),
          y: prev.agent4.y + (Math.random() * 14 - 7),
        },
      }));
    }, 3800);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="hidden md:block pointer-events-none select-none">
      {/* 1. Fine Blueprint Grid (Active during construction and subtly in background) */}
      <div
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${
          step === "wireframing" || step === "snapping"
            ? "opacity-60 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"
            : "opacity-25 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"
        }`}
      />

      {/* 2. Hero Selection Box with Handles & Dynamic Guides */}
      {showGuides && (
        <SelectionBox
          x={heroBox.x}
          y={heroBox.y}
          width={heroBox.width}
          height={heroBox.height}
          color="#0284c7" // Cyan
          agentName="AGENT 01"
          label={
            step === "wireframing"
              ? "HERO_WIREFRAME_SKETCH"
              : step === "snapping"
              ? "ALIGNING_HERO_FRAME"
              : "HERO_COMPONENT_LOCKED"
          }
          isWireframe={step === "wireframing"}
          showHandles={step !== "patrol"}
          showDimensions={step !== "patrol"}
          showSnapGuides={step === "snapping"}
          snapColor="#ec4899"
        />
      )}

      {/* 3. Metric Cards Selection Box (During Injection Step) */}
      {showGuides && (step === "snapping" || step === "materializing" || step === "injecting") && (
        <SelectionBox
          x={metricBox.x}
          y={metricBox.y}
          width={metricBox.width}
          height={metricBox.height}
          color="#f59e0b" // Amber
          agentName="AGENT 04"
          label={`INJECTING_KPIS: +${metricCounter}%`}
          isWireframe={step === "snapping"}
          showHandles={true}
          showDimensions={true}
          showSnapGuides={step === "injecting"}
          snapColor="#10b981"
        />
      )}

      {/* 4. Active Figma Agent Cursors */}
      {Object.values(agents).map((agent) => (
        <AgentCursor
          key={agent.id}
          id={agent.id}
          name={agent.name}
          task={agent.task}
          color={agent.color}
          x={agent.x}
          y={agent.y}
          visible={agent.visible}
          actionTooltip={agent.tooltip}
        />
      ))}

      {/* 5. Live Canvas Engine Control Bar (Top-Right Floating Widget) */}
      <div className="fixed top-20 right-6 z-40 pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-200/90 shadow-lg text-xs font-mono">
        <div className="flex items-center gap-2 pr-2 border-r border-neutral-200">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                step === "patrol" ? "bg-emerald-400" : "bg-cyan-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                step === "patrol" ? "bg-emerald-500" : "bg-cyan-500"
              }`}
            ></span>
          </span>
          <span className="font-semibold text-neutral-800 text-[11px]">
            {step === "wireframing" && "01. SKETCHING WIREFRAME"}
            {step === "snapping" && "02. SNAPPING ALIGNMENT"}
            {step === "materializing" && "03. MATERIALIZING UI"}
            {step === "injecting" && "04. INJECTING METRICS (+150%)"}
            {step === "patrol" && "LIVE ENGINE: 5 AGENTS PATROL"}
          </span>
        </div>

        {/* Toggle Guides Button */}
        <button
          onClick={() => setShowGuides(!showGuides)}
          className={`p-1.5 rounded-lg border transition-all ${
            showGuides
              ? "bg-neutral-100 border-neutral-300 text-neutral-900"
              : "bg-white border-neutral-200 text-neutral-400 hover:text-neutral-700"
          }`}
          title="Figma Bounding Guides Toggle"
        >
          <Sliders className="h-3.5 w-3.5" />
        </button>

        {/* Replay Assembly Button */}
        <button
          onClick={() => setReplayKey((k) => k + 1)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111111] hover:bg-neutral-800 text-white font-sans text-[11px] font-semibold transition-all active:scale-95 shadow-sm"
          title="Replay Construction Sequence"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Replay Build</span>
        </button>
      </div>

      {/* 6. Step Announcement Toast at Center-Bottom during construction */}
      <AnimatePresence>
        {step !== "patrol" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 bg-[#111111]/95 text-white border border-neutral-700 rounded-full px-5 py-2 text-xs font-mono shadow-2xl flex items-center gap-2.5 backdrop-blur-md pointer-events-none"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
            <span>
              {step === "wireframing" && "Step 1/4: Initializing Canvas & Blueprint Wireframe"}
              {step === "snapping" && "Step 2/4: Aligning Snap Guides to 8px System"}
              {step === "materializing" && "Step 3/4: Materializing High-Fidelity Components"}
              {step === "injecting" && `Step 4/4: Injecting Live KPIs (+${metricCounter}%) & SLA Lock`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
