"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentFleet, SquadMember, SQUAD_MEMBERS } from "./AgentFleet";
import { FigmaBoundingBox, FigmaBoundingBoxProps } from "./FigmaBoundingBox";
import { RefreshCw, CheckCircle2, Rocket, ShieldCheck } from "lucide-react";

export type CinematicPhase = 1 | 2 | 3 | 4 | 5;

interface CinematicBuilderProps {
  onPhaseChange?: (phase: CinematicPhase) => void;
  onComplete?: () => void;
}

export function CinematicBuilder({ onPhaseChange, onComplete }: CinematicBuilderProps) {
  const [phase, setPhase] = useState<CinematicPhase>(1);
  const [isStandby, setIsStandby] = useState(false);
  const [members, setMembers] = useState<SquadMember[]>(SQUAD_MEMBERS);
  const [activeBox, setActiveBox] = useState<FigmaBoundingBoxProps | null>(null);
  const [windowWidth, setWindowWidth] = useState(1440);
  const [replayKey, setReplayKey] = useState(0);

  // Live Typing States
  const [headlineText, setHeadlineText] = useState("");
  const [tabRevisionText, setTabRevisionText] = useState("");
  const [impactText, setImpactText] = useState("");

  // Metric Count-up
  const [metricNumber, setMetricNumber] = useState(0);

  // Approval Stamps
  const [qaPassed, setQaPassed] = useState(false);
  const [releaseApproved, setReleaseApproved] = useState(false);

  // Callbacks via refs to guarantee zero unmount/restart loops
  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // MASTER ORCHESTRATION TIMELINE
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timeout[] = [];

    const width = typeof window !== "undefined" ? window.innerWidth : 1440;
    const centerX = width / 2;

    // Reset initial states
    setPhase(1);
    setIsStandby(false);
    setHeadlineText("");
    setTabRevisionText("");
    setImpactText("");
    setMetricNumber(0);
    setQaPassed(false);
    setReleaseApproved(false);
    onPhaseChangeRef.current?.(1);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Target coordinates for Hero Wireframe Box
    const heroBox = {
      x: Math.max(40, centerX - 560),
      y: 110,
      width: Math.min(width - 80, 1120),
      height: 480,
    };

    // ==============================================================
    // [Phase 1: 와이어프레임 설계 및 탭 전환] (0.0s ~ 2.5s)
    // ==============================================================
    setActiveBox({
      x: heroBox.x,
      y: heroBox.y,
      width: heroBox.width,
      height: heroBox.height,
      color: "#7c3aed", // Figma Violet
      agentTag: "[Design] 지원 & 준혁",
      label: "WIREFRAME_HERO_GRID",
      dimensionText: "W: 1120px  H: 480px",
      showSnapGuides: false,
      isDashed: true,
      visible: true,
    });

    setMembers([
      { id: "cursor-01", name: "병욱", role: "PO", color: "#0f172a", x: centerX - 40, y: 80, visible: true, actionTooltip: "Sprint: 신사업 새벽배송 & 물류 이원화 범위 락" },
      { id: "cursor-02", name: "민서", role: "PM", color: "#4f46e5", x: centerX - 260, y: 150, visible: true, actionTooltip: "Tab 1: 새벽배송 클릭 트리거" },
      { id: "cursor-03", name: "지원", role: "Design", color: "#7c3aed", x: heroBox.x, y: heroBox.y, visible: true, actionTooltip: "Dragging Top-Left Anchor" },
      { id: "cursor-04", name: "준혁", role: "Design", color: "#ec4899", x: heroBox.x + heroBox.width, y: heroBox.y + heroBox.height, visible: true, actionTooltip: "Snapping 16px Grid" },
      { id: "cursor-05", name: "도현", role: "Frontend", color: "#06b6d4", x: centerX + 180, y: 380, visible: false },
      { id: "cursor-06", name: "수아", role: "Frontend", color: "#2563eb", x: centerX + 340, y: 420, visible: false },
      { id: "cursor-07", name: "지우", role: "Copy", color: "#059669", x: centerX - 120, y: 220, visible: false },
      { id: "cursor-08", name: "현우", role: "Copy", color: "#16a34a", x: centerX + 120, y: 260, visible: false },
      { id: "cursor-09", name: "예진", role: "Copy", color: "#0d9488", x: centerX + 280, y: 200, visible: false },
      { id: "cursor-10", name: "태양", role: "QA", color: "#e11d48", x: centerX + 460, y: 500, visible: false },
    ]);

    // Flash Snap Lines at 1.2s
    timers.push(
      setTimeout(() => {
        setActiveBox((prev) => (prev ? { ...prev, showSnapGuides: true } : null));
        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-04") return { ...m, actionTooltip: "Snap: Magenta 16px Alignment Locked" };
            return m;
          })
        );
      }, 1200)
    );

    // ==============================================================
    // [Phase 2: 실시간 타이핑 & 즉각적인 카피 수정] (2.5s ~ 5.0s)
    // ==============================================================
    timers.push(
      setTimeout(() => {
        setPhase(2);
        onPhaseChangeRef.current?.(2);

        // Copywriters enter inside the wireframe
        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-07") return { ...m, visible: true, x: heroBox.x + 140, y: heroBox.y + 110, actionTooltip: "메인 카피 실시간 타이핑 중..." };
            if (m.id === "cursor-09") return { ...m, visible: true, x: heroBox.x + 480, y: heroBox.y + 70, actionTooltip: "탭 명칭 실시간 수정 중..." };
            if (m.id === "cursor-08") return { ...m, visible: true, x: heroBox.x + 380, y: heroBox.y + 340, actionTooltip: "성과 지표 카피 작성 중..." };
            return m;
          })
        );

        // 1. [Copy] 지우: Typewriter Effect
        const fullHeadline = "비즈니스의 구조를 설계하고, 사람의 온도를 더합니다.";
        let charIdx = 0;
        const typeHeadlineInterval = setInterval(() => {
          if (charIdx <= fullHeadline.length) {
            setHeadlineText(fullHeadline.slice(0, charIdx));
            charIdx++;
          } else {
            clearInterval(typeHeadlineInterval);
          }
        }, 45);
        intervals.push(typeHeadlineInterval);

        // 2. [Copy] 예진: Backspace & Revision
        // Initial typing: "[Tab 2: 물류 서비스]"
        // Backspaces "물류 서비스"
        // Re-types: "[Tab 2: 물류 인프라 이원화]"
        const draftTab = "[Tab 2: 물류 서비스]";
        const revisedTab = "[Tab 2: 물류 인프라 이원화]";

        // Step 2a: Type draft
        let tabIdx = 0;
        const typeDraftInt = setInterval(() => {
          if (tabIdx <= draftTab.length) {
            setTabRevisionText(draftTab.slice(0, tabIdx));
            tabIdx++;
          } else {
            clearInterval(typeDraftInt);

            // Step 2b: Pause, then backspace
            timers.push(
              setTimeout(() => {
                let currentLen = draftTab.length;
                const backspaceInt = setInterval(() => {
                  if (currentLen > 8) { // down to "[Tab 2: "
                    currentLen--;
                    setTabRevisionText(draftTab.slice(0, currentLen));
                  } else {
                    clearInterval(backspaceInt);

                    // Step 2c: Type revised title
                    let revIdx = 8;
                    const typeRevInt = setInterval(() => {
                      if (revIdx <= revisedTab.length) {
                        setTabRevisionText(revisedTab.slice(0, revIdx));
                        revIdx++;
                      } else {
                        clearInterval(typeRevInt);
                      }
                    }, 40);
                    intervals.push(typeRevInt);
                  }
                }, 35);
                intervals.push(backspaceInt);
              }, 400)
            );
          }
        }, 40);
        intervals.push(typeDraftInt);

        // 3. [Copy] 현우: Type impact copy
        const impactFull = "고정비 대비 매출 150% 성장 달성";
        let impIdx = 0;
        const typeImpactInt = setInterval(() => {
          if (impIdx <= impactFull.length) {
            setImpactText(impactFull.slice(0, impIdx));
            impIdx++;
          } else {
            clearInterval(typeImpactInt);
          }
        }, 55);
        intervals.push(typeImpactInt);
      }, 2500)
    );

    // ==============================================================
    // [Phase 3: 프론트엔드 실시간 머티리얼라이즈] (5.0s ~ 7.0s)
    // ==============================================================
    timers.push(
      setTimeout(() => {
        setPhase(3);
        onPhaseChangeRef.current?.(3);

        // Dotted Wireframe converts to solid materialized frame
        setActiveBox((prev) =>
          prev
            ? {
                ...prev,
                color: "#06b6d4", // Cyan
                agentTag: "[Frontend] 도현 & 수아",
                label: "MATERIALIZING_REAL_UI",
                isDashed: false,
                showSnapGuides: false,
              }
            : null
        );

        // [Frontend] 도현 & 수아 arrive
        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-05") return { ...m, visible: true, x: heroBox.x + 80, y: heroBox.y + 40, actionTooltip: "Double Click: Materialize High-Fidelity UI" };
            if (m.id === "cursor-06") return { ...m, visible: true, x: heroBox.x + 360, y: heroBox.y + 360, actionTooltip: "Binding 0% -> 150% Gauge Animation" };
            return m;
          })
        );

        // Count up 0% -> 150%
        let count = 0;
        const countInt = setInterval(() => {
          count += 15;
          if (count >= 150) {
            count = 150;
            clearInterval(countInt);
          }
          setMetricNumber(count);
        }, 40);
        intervals.push(countInt);
      }, 5000)
    );

    // ==============================================================
    // [Phase 4: QA 검수 통과 및 릴리즈 승인] (7.0s ~ 8.5s)
    // ==============================================================
    timers.push(
      setTimeout(() => {
        setPhase(4);
        onPhaseChangeRef.current?.(4);

        // [QA] 태양 scans the 4 corners
        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === "cursor-10") return { ...m, visible: true, x: heroBox.x + heroBox.width - 60, y: heroBox.y + 40, actionTooltip: "Pixel Perfect Audit: SLA 99.8%" };
            return m;
          })
        );

        // Stamp QA PASSED after 500ms
        timers.push(
          setTimeout(() => {
            setQaPassed(true);

            // [PO] 병욱 approves release
            setMembers((prev) =>
              prev.map((m) => {
                if (m.id === "cursor-01") return { ...m, x: centerX, y: heroBox.y + 20, actionTooltip: "RELEASE APPROVED 🚀" };
                return m;
              })
            );

            timers.push(
              setTimeout(() => {
                setReleaseApproved(true);
              }, 400)
            );
          }, 500)
        );
      }, 7000)
    );

    // ==============================================================
    // [Phase 5: 그랜드 피날레 - "next project ready..."] (8.5s+)
    // ==============================================================
    timers.push(
      setTimeout(() => {
        setPhase(5);
        setIsStandby(true);
        setActiveBox(null);
        onPhaseChangeRef.current?.(5);
        onCompleteRef.current?.();

        // Smooth scroll to top of page
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
      {/* 1. Fine Blueprint Grid */}
      <div
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${
          phase < 5
            ? "opacity-55 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"
            : "opacity-15 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]"
        }`}
      />

      {/* 2. Active Figma Bounding Box & Alignment Lines */}
      {activeBox && <FigmaBoundingBox {...activeBox} />}

      {/* 3. Live Typewriter Preview Overlay (Phases 1-3) */}
      <AnimatePresence>
        {phase >= 2 && phase <= 4 && (
          <div className="fixed inset-0 pointer-events-none z-35">
            {/* Live Headline Typing Banner */}
            {headlineText && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  left: Math.max(50, windowWidth / 2 - 520),
                  top: 220,
                }}
                className="fixed bg-white/95 border border-emerald-500/80 shadow-2xl rounded-xl px-4 py-2 text-sm font-semibold text-[#111111] backdrop-blur-md flex items-center gap-2 max-w-xl"
              >
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  [Copy] 지우
                </span>
                <span>{headlineText}</span>
                <span className="w-1.5 h-4 bg-emerald-600 animate-pulse" />
              </motion.div>
            )}

            {/* Live Tab Revision Bubble */}
            {tabRevisionText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  left: Math.max(50, windowWidth / 2 + 60),
                  top: 175,
                }}
                className="fixed bg-white/95 border border-teal-500/80 shadow-xl rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-teal-900 backdrop-blur-md flex items-center gap-2"
              >
                <span className="text-[10px] px-1 rounded bg-teal-100 text-teal-800">
                  [Copy] 예진
                </span>
                <span>{tabRevisionText}</span>
                <span className="w-1.5 h-3 bg-teal-600 animate-pulse" />
              </motion.div>
            )}

            {/* Live Impact Copy Bubble */}
            {impactText && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  left: Math.max(50, windowWidth / 2 - 140),
                  top: 450,
                }}
                className="fixed bg-white/95 border border-green-500/80 shadow-xl rounded-xl px-3.5 py-2 text-xs font-semibold text-green-950 backdrop-blur-md flex items-center gap-2"
              >
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-green-100 text-green-800">
                  [Copy] 현우
                </span>
                <span>{impactText}</span>
                <span className="w-1.5 h-3.5 bg-green-600 animate-pulse" />
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* 4. Live Metric Gauge Counter (Phases 3-4) */}
      <AnimatePresence>
        {phase >= 3 && phase <= 4 && metricNumber > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              left: Math.max(50, windowWidth / 2 + 180),
              top: 440,
            }}
            className="fixed z-40 bg-[#111111] text-white border border-neutral-700 rounded-2xl p-4 shadow-2xl font-mono text-center min-w-[200px]"
          >
            <div className="text-[10px] font-bold text-neutral-400 mb-1 flex items-center justify-between">
              <span>[Frontend] 수아</span>
              <span className="text-cyan-400">BINDING KPI</span>
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
              +{metricNumber}%
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-75 rounded-full"
                style={{ width: `${(metricNumber / 150) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">고정비 대비 새벽배송 성장률</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Phase 4 Approval Stamps (QA PASSED & RELEASE APPROVED) */}
      <AnimatePresence>
        {qaPassed && (
          <motion.div
            initial={{ opacity: 0, scale: 2, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 350 }}
            style={{
              left: Math.max(50, windowWidth / 2 + 280),
              top: 130,
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
              left: Math.max(50, windowWidth / 2 - 200),
              top: 130,
            }}
            className="fixed z-45 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f172a] text-amber-300 font-mono text-xs font-extrabold shadow-2xl border-2 border-amber-300 ring-4 ring-amber-400/30"
          >
            <Rocket className="h-4 w-4 text-amber-400 animate-bounce" />
            <span>RELEASE APPROVED 🚀</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. 10 Squad Cursors Fleet */}
      <AgentFleet members={members} isStandby={isStandby} windowWidth={windowWidth} />

      {/* 7. Live Phase Tracker Status Bar (Center-Bottom) */}
      <AnimatePresence>
        {phase < 5 && (
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
              {phase === 1 && "PHASE 1: 와이어프레임 설계 & 탭 전환 조율 중..."}
              {phase === 2 && "PHASE 2: 실시간 타이핑 & 백스페이스 카피 수정 중..."}
              {phase === 3 && "PHASE 3: 프론트엔드 실시간 머티리얼라이즈 & 지표 바인딩..."}
              {phase === 4 && "PHASE 4: QA 픽셀 검수 통과 & 최종 릴리즈 승인!"}
            </span>
            <span className="text-neutral-500 font-sans text-[11px]">• 10인 스쿼드 라이브</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Replay Build Button (Bottom-Right, Active when Standby) */}
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
              title="다시 10인 스쿼드 실시간 조립 관람하기"
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
