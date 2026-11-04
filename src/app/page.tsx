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
import { CinematicBuilder, CinematicPhase } from "@/components/canvas/CinematicBuilder";
import { ProjectItem } from "@/types/portfolio";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState<CinematicPhase>(1);

  const handleCopyText = (_text: string, label: string) => {
    setToastMessage(`${label}가 클립보드에 복사되었습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white relative">
      {/* 1. 10인의 스쿼드 라이브 오케스트레이션 캔버스 엔진 */}
      <CinematicBuilder
        onPhaseChange={(phase) => setCurrentPhase(phase)}
        onComplete={() => setCurrentPhase(5)}
      />

      {/* 2. Sticky Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* 3. Main Single Page Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            currentPhase >= 3
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-40 blur-[1.5px] translate-y-2"
          }`}
        >
          <HeroSection onOpenResume={() => setResumeOpen(true)} />
        </div>

        {/* Philosophy Section */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            currentPhase >= 3
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-40 blur-[1.5px] translate-y-2"
          }`}
        >
          <PhilosophySection />
        </div>

        {/* Featured Projects */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            currentPhase >= 3
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-40 blur-[1.5px] translate-y-2"
          }`}
        >
          <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        </div>

        {/* Capabilities & Experience */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            currentPhase >= 4
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-50 blur-[1px] translate-y-2"
          }`}
        >
          <CapabilitiesSection />
          <ExperienceTimeline />
        </div>

        {/* Contact & Footer */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            currentPhase >= 4
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-50 blur-[1px] translate-y-2"
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
