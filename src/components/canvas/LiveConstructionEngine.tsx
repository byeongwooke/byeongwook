"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentFleet, SquadMember, SQUAD_MEMBERS } from "./AgentFleet";
import { SnapWireframe, SnapWireframeProps } from "./SnapWireframe";
import { StudioDock, ConstructionStage } from "./StudioDock";
import { ShieldCheck, Rocket } from "lucide-react";

export interface LiveConstructionState {
  stage: ConstructionStage;
  heroVisible: boolean;
  projectsVisible: boolean[];
  isUnlocked: boolean;
}

interface LiveConstructionEngineProps {
  onStateUpdate: (state: LiveConstructionState) => void;
}

export function LiveConstructionEngine({ onStateUpdate }: LiveConstructionEngineProps) {
  const [stage, setStage] = useState<ConstructionStage>("HERO_BUILD");
  const [heroVisible, setHeroVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState<boolean[]>([false, false, false]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [members, setMembers] = useState<SquadMember[]>(SQUAD_MEMBERS);
  const [wireframes, setWireframes] = useState<SnapWireframeProps[]>([]);
  const [windowWidth, setWindowWidth] = useState(1440);
  const [replayKey, setReplayKey] = useState(0);

  // Approval Stamps
  const [qaPassed, setQaPassed] = useState(false);
  const [releaseApproved, setReleaseApproved] = useState(false);

  // Keep state update callback ref to avoid re-render cancellations
  const onStateUpdateRef = useRef(onStateUpdate);
  onStateUpdateRef.current = onStateUpdate;

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Broadcast state changes upward
  useEffect(() => {
    onStateUpdateRef.current({
      stage,
      heroVisible,
      projectsVisible,
      isUnlocked,
    });
  }, [stage, heroVisible, projectsVisible, isUnlocked]);

  // Master Construction Sequence Timeline
  const runSequence = useCallback(() => {
    const timers: NodeJS.Timeout[] = [];
    const width = typeof window !== "undefined" ? window.innerWidth : 1440;
    const centerX = width / 2;

    // Responsive Check: Immediate unlock on mobile devices
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setStage("FINALE");
      setHeroVisible(true);
      setProjectsVisible([true, true, true]);
      setIsUnlocked(true);
      return () => {};
    }

    // 0. Initial Void Setup
    setStage("HERO_BUILD");
    setHeroVisible(false);
    setProjectsVisible([false, false, false]);
    setIsUnlocked(false);
    setQaPassed(false);
    setReleaseApproved(false);

    window.scrollTo({ top: 0, behavior: "smooth" });

    const heroBox = {
      x: Math.max(30, centerX - 560),
      y: 110,
      width: Math.min(width - 60, 1120),
      height: 480,
    };

    // ==============================================================
    // [Act 1: Hero 생성] (0.0s ~ 3.5s)
    // ==============================================================
    // Step 1a: Agents fly in from outside the screen to frame Hero
    setMembers([
      { id: "cursor-01", name: "병욱", role: "PO", color: "#0f172a", x: centerX - 180, y: -40, visible: true, actionTooltip: "Sprint Scope: 0 to 1 Launch" },
      { id: "cursor-03", name: "지원", role: "Design", color: "#7c3aed", x: -80, y: 110, visible: true, actionTooltip: "Dragging Canvas Frame" },
      { id: "cursor-05", name: "도현", role: "Frontend", color: "#06b6d4", x: width + 80, y: 340, visible: true, actionTooltip: "Component Binding Ready" },
      { id: "cursor-07", name: "지우", role: "Copy", color: "#059669", x: centerX + 240, y: -40, visible: true, actionTooltip: "Authoring Hero Value Prop" },
      { id: "cursor-02", name: "민서", role: "PM", color: "#4f46e5", x: -80, y: 300, visible: false },
      { id: "cursor-04", name: "준혁", role: "Design", color: "#ec4899", x: width + 80, y: 400, visible: false },
      { id: "cursor-06", name: "수아", role: "Frontend", color: "#2563eb", x: centerX, y: 800, visible: false },
      { id: "cursor-08", name: "현우", role: "Copy", color: "#16a34a", x: centerX, y: 800, visible: false },
      { id: "cursor-09", name: "예진", role: "Copy", color: "#0d9488", x: centerX, y: 800, visible: false },
      { id: "cursor-10", name: "태양", role: "QA", color: "#e11d48", x: centerX, y: 800, visible: false },
    ]);

    // Step 1b: Drag out Hero Wireframe (0.3s)
    timers.push(
      setTimeout(() => {
        setWireframes([
          {
            x: heroBox.x,
            y: heroBox.y,
            width: heroBox.width,
            height: heroBox.height,
            color: "#7c3aed",
            agentTag: "[Design] 지원",
            label: "HERO_FRAME (W: 1080px H: 420px)",
            dimensionText: "W: 1080px  H: 420px",
            showSnapGuides: false,
            isDashed: true,
            visible: true,
          },
        ]);

        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-01") return { ...m, x: centerX - 100, y: 80, visible: true };
            if (m.id === "cursor-03") return { ...m, x: heroBox.x, y: heroBox.y, visible: true, actionTooltip: "Anchoring (W: 1080px, H: 420px)" };
            if (m.id === "cursor-05") return { ...m, x: heroBox.x + heroBox.width, y: heroBox.y + heroBox.height, visible: true, actionTooltip: "Bottom-Right Snap" };
            if (m.id === "cursor-07") return { ...m, x: centerX + 120, y: 220, visible: true, actionTooltip: "Typing: 비즈니스의 구조를 세우고..." };
            return m;
          })
        );
      }, 300)
    );

    // Step 1c: Magenta Crosshair Snap & Materialize Hero! (1.8s)
    timers.push(
      setTimeout(() => {
        // Snap guides flash
        setWireframes((prev) =>
          prev.map((wf) => ({ ...wf, showSnapGuides: true, isDashed: false }))
        );

        // MATERIALIZE HERO COMPONENT!
        setHeroVisible(true);

        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-05") return { ...m, x: centerX - 140, y: 520, actionTooltip: "Dropping Metric Boxes (150%, 3년 3개월, 0 to 1)" };
            if (m.id === "cursor-03") return { ...m, actionTooltip: "Snap 16px Grid: Locked ✓" };
            return m;
          })
        );
      }, 1800)
    );

    // ==============================================================
    // [Act 2: Projects 자동 스크롤 & 3단 카드 조립] (3.5s ~ 7.2s)
    // ==============================================================
    timers.push(
      setTimeout(() => {
        setStage("SCROLL_PROJECTS");
        setWireframes([]); // Clear Hero wireframe

        // Auto-scroll to Projects Section
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

        // 6 Agents fly down to assemble the 3 project cards
        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-03") return { ...m, visible: true, x: centerX - 380, y: 220, actionTooltip: "AGENT 03: Framing 새벽배송" };
            if (m.id === "cursor-05") return { ...m, visible: true, x: centerX - 120, y: 360, actionTooltip: "AGENT 05: Snapping 150% KPI" };
            if (m.id === "cursor-04") return { ...m, visible: true, x: centerX - 60, y: 260, actionTooltip: "AGENT 04: Framing 물류 이원화" };
            if (m.id === "cursor-06") return { ...m, visible: true, x: centerX + 180, y: 360, actionTooltip: "AGENT 06: Snapping -28% KPI" };
            if (m.id === "cursor-07") return { ...m, visible: true, x: centerX + 260, y: 220, actionTooltip: "AGENT 07: Framing ERP Basecamp" };
            if (m.id === "cursor-09") return { ...m, visible: true, x: centerX + 420, y: 360, actionTooltip: "AGENT 09: Snapping 50k DB KPI" };
            return { ...m, visible: true };
          })
        );
      }, 3500)
    );

    // Step 2a: AGENT 03 & 05 drag Card 1 wireframe (3.8s)
    timers.push(
      setTimeout(() => {
        setWireframes([
          {
            x: Math.max(30, centerX - 560),
            y: 220,
            width: Math.min(width - 60, 1120),
            height: 300,
            color: "#ec4899",
            agentTag: "AGENT 03 & 05",
            label: "CARD 01: 카카오모빌리티 새벽배송",
            dimensionText: "W: 1080px  H: 300px",
            showSnapGuides: false,
            isDashed: true,
            visible: true,
          },
        ]);
      }, 3800)
    );

    // Step 2b: Snap Card 1 & Materialize! (4.4s)
    timers.push(
      setTimeout(() => {
        setStage("PROJECTS_BUILD");
        setWireframes((prev) =>
          prev.map((wf) => ({ ...wf, showSnapGuides: true, isDashed: false }))
        );
        setProjectsVisible([true, false, false]); // Card 1 materializes!

        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-05") return { ...m, actionTooltip: "Card 01 Materialized! +150% KPI Active ✓" };
            return m;
          })
        );
      }, 4400)
    );

    // Step 2c: AGENT 04 & 06 drag Card 2 wireframe (4.7s)
    timers.push(
      setTimeout(() => {
        setWireframes([
          {
            x: Math.max(30, centerX - 560),
            y: 280,
            width: Math.min(width - 60, 1120),
            height: 300,
            color: "#06b6d4",
            agentTag: "AGENT 04 & 06",
            label: "CARD 02: 물류 이원화 & 한차배송",
            dimensionText: "W: 1080px  H: 300px",
            showSnapGuides: false,
            isDashed: true,
            visible: true,
          },
        ]);
      }, 4700)
    );

    // Step 2d: Snap Card 2 & Materialize! (5.4s)
    timers.push(
      setTimeout(() => {
        setWireframes((prev) =>
          prev.map((wf) => ({ ...wf, showSnapGuides: true, isDashed: false }))
        );
        setProjectsVisible([true, true, false]); // Card 2 materializes!

        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-06") return { ...m, actionTooltip: "Card 02 Materialized! 단가 -28% Locked ✓" };
            return m;
          })
        );
      }, 5400)
    );

    // Step 2e: AGENT 07 & 09 drag Card 3 wireframe (5.7s)
    timers.push(
      setTimeout(() => {
        setWireframes([
          {
            x: Math.max(30, centerX - 560),
            y: 340,
            width: Math.min(width - 60, 1120),
            height: 300,
            color: "#10b981",
            agentTag: "AGENT 07 & 09",
            label: "CARD 03: 어딩 여행 ERP Basecamp",
            dimensionText: "W: 1080px  H: 300px",
            showSnapGuides: false,
            isDashed: true,
            visible: true,
          },
        ]);
      }, 5700)
    );

    // Step 2f: Snap Card 3 & Materialize! (6.4s)
    timers.push(
      setTimeout(() => {
        setWireframes((prev) =>
          prev.map((wf) => ({ ...wf, showSnapGuides: true, isDashed: false }))
        );
        setProjectsVisible([true, true, true]); // Card 3 materializes!

        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-09") return { ...m, actionTooltip: "Card 03 Materialized! 3-Column Grid Complete ✓" };
            return m;
          })
        );
      }, 6400)
    );

    // Step 2g: Clear wireframes before QA audit (7.0s)
    timers.push(
      setTimeout(() => {
        setWireframes([]);
      }, 7000)
    );

    // ==============================================================
    // [Act 3: QA 검수 및 그랜드 피날레] (7.2s ~ 9.0s)
    // ==============================================================
    timers.push(
      setTimeout(() => {
        setStage("FINALE");

        // [QA] 태양 scans the cards and drops QA Passed
        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-10") return { ...m, visible: true, x: centerX + 200, y: 220, actionTooltip: "Auditing SLA 99.8% & Accessibility" };
            return m;
          })
        );

        timers.push(
          setTimeout(() => {
            setQaPassed(true);

            // [PO] 병욱 approves release
            setMembers((prev) =>
              prev.map((m) => {
                if (m.id === "cursor-01") return { ...m, x: centerX - 120, y: 160, actionTooltip: "RELEASE APPROVED 🚀" };
                return m;
              })
            );

            timers.push(
              setTimeout(() => {
                setReleaseApproved(true);
              }, 400)
            );
          }, 600)
        );
      }, 7200)
    );

    // Standby Dock & Complete Unlock (8.4s)
    timers.push(
      setTimeout(() => {
        setIsUnlocked(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 8400)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const cancel = runSequence();
    return () => cancel?.();
  }, [replayKey, runSequence]);

  return (
    <div className="hidden md:block select-none pointer-events-none">
      {/* 1. Blueprint Grid Background */}
      <div
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${
          !isUnlocked
            ? "opacity-55 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"
            : "opacity-15 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"
        }`}
      />

      {/* 2. Active Snap Wireframes */}
      {wireframes.map((wf, idx) => (
        <SnapWireframe key={idx} {...wf} />
      ))}

      {/* 3. 10 AI Squad Cursors */}
      <AgentFleet members={members} isStandby={isUnlocked} windowWidth={windowWidth} />

      {/* 4. Act 3 QA & Release Stamps */}
      <AnimatePresence>
        {qaPassed && (
          <motion.div
            initial={{ opacity: 0, scale: 2, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 350 }}
            style={{
              left: Math.max(50, windowWidth / 2 + 180),
              top: 180,
            }}
            className="fixed z-45 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-extrabold shadow-2xl border-2 border-white ring-4 ring-emerald-500/30"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>QA PASSED ✓ (SLA 99.8%)</span>
          </motion.div>
        )}

        {releaseApproved && (
          <motion.div
            initial={{ opacity: 0, scale: 2.2, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 350 }}
            style={{
              left: Math.max(50, windowWidth / 2 - 220),
              top: 180,
            }}
            className="fixed z-45 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f172a] text-amber-300 font-mono text-xs font-extrabold shadow-2xl border-2 border-amber-300 ring-4 ring-amber-400/30"
          >
            <Rocket className="h-4 w-4 text-amber-400 animate-bounce" />
            <span>RELEASE APPROVED 🚀</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Studio Floating Dock at Bottom Center */}
      <StudioDock
        stage={stage}
        isUnlocked={isUnlocked}
        onReplay={() => setReplayKey((k) => k + 1)}
      />
    </div>
  );
}
