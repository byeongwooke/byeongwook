"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Users, Eye, EyeOff } from "lucide-react";

interface VirtualCursor {
  id: string;
  role: string;
  name: string;
  color: string;
  badgeBg: string;
  path: {
    x: number[];
    y: number[];
  };
  duration: number;
  delay: number;
  comments: { text: string; delay: number }[];
}

// 9 Collaborator personas representing Cross-functional team
const COLLABORATORS: VirtualCursor[] = [
  {
    id: "data-sujin",
    role: "Data",
    name: "수진",
    color: "#059669", // Emerald
    badgeBg: "#111111",
    path: {
      x: [120, 240, 280, 180, 120],
      y: [160, 220, 310, 260, 160],
    },
    duration: 22,
    delay: 0,
    comments: [
      { text: "매출 150% 검증 완료 👍", delay: 2.5 },
      { text: "SLA 지표 상위 0.1% 안착!", delay: 13 },
    ],
  },
  {
    id: "design-minwoo",
    role: "Design",
    name: "민우",
    color: "#7c3aed", // Violet
    badgeBg: "#111111",
    path: {
      x: [480, 560, 680, 520, 480],
      y: [110, 180, 140, 240, 110],
    },
    duration: 25,
    delay: 1.5,
    comments: [
      { text: "모노크롬 톤앤매너와 여백이 좋네요", delay: 4 },
      { text: "인터랙션 마이크로 모션 깔끔!", delay: 16 },
    ],
  },
  {
    id: "fe-jieun",
    role: "Frontend",
    name: "지은",
    color: "#2563eb", // Blue
    badgeBg: "#111111",
    path: {
      x: [320, 420, 360, 280, 320],
      y: [340, 410, 490, 430, 340],
    },
    duration: 20,
    delay: 0.8,
    comments: [
      { text: "기사앱 동선 개편 컴포넌트 통과", delay: 5.5 },
      { text: "Next 16 & Turbopack 렌더 빠름 ⚡", delay: 15 },
    ],
  },
  {
    id: "logistics-sungho",
    role: "Logistics",
    name: "성호",
    color: "#ea580c", // Orange
    badgeBg: "#111111",
    path: {
      x: [720, 840, 890, 780, 720],
      y: [280, 350, 420, 340, 280],
    },
    duration: 24,
    delay: 2.2,
    comments: [
      { text: "배송 단가 28% 절감 확인!", delay: 3 },
      { text: "한차배송 전환으로 CS 급감 체감 중", delay: 14.5 },
    ],
  },
  {
    id: "qa-taehyun",
    role: "QA",
    name: "태현",
    color: "#0284c7", // Sky
    badgeBg: "#111111",
    path: {
      x: [620, 530, 590, 680, 620],
      y: [460, 530, 610, 540, 460],
    },
    duration: 26,
    delay: 3.5,
    comments: [
      { text: "SLA 99.2% 예외 케이스 검증 통과", delay: 7 },
      { text: "지오펜싱 50m 오배송 차단 정상 확인", delay: 19 },
    ],
  },
  {
    id: "security-hyunwoo",
    role: "Security",
    name: "현우",
    color: "#475569", // Slate
    badgeBg: "#111111",
    path: {
      x: [210, 310, 260, 160, 210],
      y: [520, 580, 670, 610, 520],
    },
    duration: 28,
    delay: 4,
    comments: [
      { text: "ISMS-P 보안 기준 암호화 완벽", delay: 6 },
      { text: "RBAC 권한 통제 이상 없음", delay: 18 },
    ],
  },
  {
    id: "backend-dohyun",
    role: "Backend",
    name: "도현",
    color: "#0891b2", // Cyan
    badgeBg: "#111111",
    path: {
      x: [850, 920, 880, 790, 850],
      y: [160, 240, 320, 210, 160],
    },
    duration: 21,
    delay: 1,
    comments: [
      { text: "Webhook 실시간 API 응답 지연 제로", delay: 4.5 },
      { text: "5만 건 DB 무중단 마이그레이션 성공", delay: 16 },
    ],
  },
  {
    id: "growth-seoyeon",
    role: "Growth",
    name: "서연",
    color: "#db2777", // Pink
    badgeBg: "#111111",
    path: {
      x: [390, 480, 410, 340, 390],
      y: [210, 290, 240, 170, 210],
    },
    duration: 23,
    delay: 2.8,
    comments: [
      { text: "새벽배송 전환율 지표 상승세 🔥", delay: 8.5 },
    ],
  },
  {
    id: "ops-youngsik",
    role: "Operations",
    name: "영식",
    color: "#65a30d", // Lime
    badgeBg: "#111111",
    path: {
      x: [520, 630, 710, 580, 520],
      y: [320, 390, 340, 270, 320],
    },
    duration: 27,
    delay: 5,
    comments: [
      { text: "현장 기사님들 앱 만족도 대폭 향상!", delay: 10 },
    ],
  },
];

// Figma-style vector pointer cursor
function FigmaCursorIcon({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
        stroke="#ffffff"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Single Virtual Cursor with Comment Balloon
function VirtualCursorItem({ cursor }: { cursor: VirtualCursor }) {
  const [activeComment, setActiveComment] = useState<string | null>(null);

  useEffect(() => {
    // Schedule comment popups according to their delay and repeat
    const timers: NodeJS.Timeout[] = [];

    cursor.comments.forEach((c) => {
      const showTimer = setTimeout(() => {
        setActiveComment(c.text);
        const hideTimer = setTimeout(() => {
          setActiveComment(null);
        }, 3200);
        timers.push(hideTimer);
      }, (cursor.delay + c.delay) * 1000);

      timers.push(showTimer);
    });

    // Loop cycle
    const loopInterval = setInterval(() => {
      cursor.comments.forEach((c) => {
        const showTimer = setTimeout(() => {
          setActiveComment(c.text);
          const hideTimer = setTimeout(() => {
            setActiveComment(null);
          }, 3200);
          timers.push(hideTimer);
        }, c.delay * 1000);
        timers.push(showTimer);
      });
    }, cursor.duration * 1000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopInterval);
    };
  }, [cursor]);

  return (
    <motion.div
      initial={{
        x: cursor.path.x[0],
        y: cursor.path.y[0],
        opacity: 0,
      }}
      animate={{
        x: cursor.path.x,
        y: cursor.path.y,
        opacity: [0, 1, 1, 1, 1],
      }}
      transition={{
        duration: cursor.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: cursor.delay,
      }}
      className="absolute top-0 left-0 pointer-events-none z-30 select-none will-change-transform"
    >
      {/* Cursor Arrow */}
      <div className="relative">
        <FigmaCursorIcon color={cursor.color} />

        {/* Persona Name Tag Badge */}
        <div
          className="absolute left-3.5 top-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white shadow-md border border-white/20 whitespace-nowrap"
          style={{ backgroundColor: cursor.badgeBg }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: cursor.color }}
          />
          <span className="font-mono text-neutral-300">[{cursor.role}]</span>
          <span>{cursor.name}</span>
        </div>

        {/* Figma Speech Bubble Comment */}
        <AnimatePresence>
          {activeComment && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 2 }}
              transition={{ duration: 0.2 }}
              className="absolute left-3.5 top-9 z-40 bg-white/95 backdrop-blur-md text-[#111111] border border-neutral-300/80 shadow-xl rounded-xl px-3 py-1.5 text-[11px] font-medium leading-snug whitespace-nowrap flex items-center gap-1.5"
            >
              <span className="text-xs">💬</span>
              <span>{activeComment}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function MultiplayerCursors() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [hasMouse, setHasMouse] = useState(false);
  const [visitorPos, setVisitorPos] = useState({ x: -100, y: -100 });

  // Spring physics for smooth visitor tag following
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(-100, springConfig);
  const smoothY = useSpring(-100, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHasMouse(true);
      setVisitorPos({ x: e.clientX, y: e.clientY });
      smoothX.set(e.clientX + 14);
      smoothY.set(e.clientY + 18);
    };

    const handleMouseLeave = () => {
      setHasMouse(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [smoothX, smoothY]);

  return (
    <div className="hidden md:block">
      {/* 10 Virtual Collaborators Overlay */}
      {isEnabled && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
        >
          {COLLABORATORS.map((cursor) => (
            <VirtualCursorItem key={cursor.id} cursor={cursor} />
          ))}
        </div>
      )}

      {/* 11th Cursor: Visitor's Companion Tag */}
      {isEnabled && hasMouse && (
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="fixed top-0 left-0 pointer-events-none z-40 select-none will-change-transform"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111]/90 backdrop-blur-sm text-white text-[10px] font-semibold shadow-lg border border-neutral-700/60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="font-mono text-neutral-300">[Guest]</span>
            <span>당신 (You)</span>
          </div>
        </motion.div>
      )}

      {/* Live Collaboration Badge & Toggle Control (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#e5e7eb] shadow-sm hover:border-[#111111] hover:shadow-md transition-all text-xs font-medium text-neutral-700 active:scale-95"
          title={isEnabled ? "가상 커서 숨기기" : "가상 커서 표시하기"}
        >
          <Users className="h-3.5 w-3.5 text-[#111111]" />
          <span className="text-[11px] font-semibold text-[#111111]">
            {isEnabled ? "10명 협업 중" : "협업 모드 OFF"}
          </span>
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isEnabled ? "bg-emerald-400" : "bg-neutral-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isEnabled ? "bg-emerald-500" : "bg-neutral-400"
              }`}
            ></span>
          </span>
          <div className="pl-1 text-neutral-400 group-hover:text-neutral-700 transition-colors">
            {isEnabled ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <EyeOff className="h-3.5 w-3.5" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
