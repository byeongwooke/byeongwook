"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WireframeStage, StagePhase } from "@/components/canvas/WireframeStage";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ProjectModal } from "@/components/ProjectModal";
import { ResumeModal } from "@/components/ResumeModal";
import { Toast } from "@/components/Toast";
import { ProjectItem } from "@/types/portfolio";

export default function Home() {
  const [phase, setPhase] = useState<StagePhase>("LOADING");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isMaterialized = phase === "MATERIALIZED";

  const handleCopyText = (_text: string, label: string) => {
    setToastMessage(`${label}가 클립보드에 복사되었습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white relative">
      {/* 1. Wireframe & Canvas Stage (Steps 1, 2, 3) */}
      <WireframeStage onPhaseChange={(p) => setPhase(p)} />

      {/* 2. Top Navigation (Fades in smoothly with Hero) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isMaterialized ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={!isMaterialized ? "pointer-events-none select-none" : ""}
      >
        <Navbar onOpenResume={() => setResumeOpen(true)} />
      </motion.div>

      {/* 3. Main Single Page Sections */}
      <main className="relative z-10">
        {/* Step 3: Hero Section - Snaps and materializes at 3.3s */}
        <AnimatePresence>
          {isMaterialized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroSection onOpenResume={() => setResumeOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Downstream Sections (Waiting in standby for subsequent steps 4 & 5) */}
        <div className="opacity-0 pointer-events-none select-none" aria-hidden="true">
          <PhilosophySection />
          <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
          <CapabilitiesSection />
          <ExperienceTimeline />
          <ContactSection onCopyText={handleCopyText} />
        </div>
      </main>

      {/* Footer (Waiting) */}
      <div className="opacity-0 pointer-events-none select-none" aria-hidden="true">
        <Footer />
      </div>

      {/* Modals & Toast */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
