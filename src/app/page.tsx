"use client";

import { useState } from "react";
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
import {
  LiveConstructionEngine,
  LiveConstructionState,
} from "@/components/canvas/LiveConstructionEngine";
import { ProjectItem } from "@/types/portfolio";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [engineState, setEngineState] = useState<LiveConstructionState>({
    stage: "HERO_BUILD",
    heroVisible: false,
    projectsVisible: [false, false, false],
    isUnlocked: false,
  });

  const handleCopyText = (_text: string, label: string) => {
    setToastMessage(`${label}가 클립보드에 복사되었습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white relative">
      {/* 1. True Live Construction Engine & Studio Dock (From Void to High-Fidelity UI) */}
      <LiveConstructionEngine
        onStateUpdate={(state) => setEngineState(state)}
      />

      {/* 2. Sticky Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* 3. Main Single Page Sections */}
      <main className="relative z-10">
        {/* Act 1: Hero Section - Starts from Void, Materializes at 1.8s */}
        <HeroSection
          onOpenResume={() => setResumeOpen(true)}
          isMaterialized={engineState.heroVisible || engineState.isUnlocked}
        />

        {/* Philosophy Section */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            engineState.isUnlocked || engineState.stage !== "HERO_BUILD"
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-15 blur-[2.5px] translate-y-3 pointer-events-none"
          }`}
        >
          <PhilosophySection />
        </div>

        {/* Act 2: Featured Projects - 3 Cards sequentially materialize 1 by 1 */}
        <ProjectsSection
          onSelectProject={(p) => setSelectedProject(p)}
          cardsMaterialized={
            engineState.isUnlocked
              ? [true, true, true]
              : engineState.projectsVisible
          }
        />

        {/* Act 3: Capabilities & Experience */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            engineState.isUnlocked || engineState.stage === "FINALE"
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-20 blur-[2px] translate-y-3 pointer-events-none"
          }`}
        >
          <CapabilitiesSection />
          <ExperienceTimeline />
        </div>

        {/* Contact & Footer */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            engineState.isUnlocked || engineState.stage === "FINALE"
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-20 blur-[2px] translate-y-3 pointer-events-none"
          }`}
        >
          <ContactSection onCopyText={handleCopyText} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Full Resume & CV Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
