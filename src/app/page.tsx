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
import { CinematicBuilder, CinematicStep } from "@/components/canvas/CinematicBuilder";
import { ProjectItem } from "@/types/portfolio";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [buildStep, setBuildStep] = useState<CinematicStep>(0);

  const handleCopyText = (_text: string, label: string) => {
    setToastMessage(`${label}가 클립보드에 복사되었습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white relative">
      {/* 1. Cinematic Auto-Builder Orchestrator & 10 AI Agent Fleet */}
      <CinematicBuilder
        onStepChange={(step) => setBuildStep(step)}
        onComplete={() => setBuildStep(5)}
      />

      {/* 2. Sticky Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* 3. Main Single Page Sections with Live Materialization Transitions */}
      <main className="relative z-10">
        {/* Step 0: Hero Section */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            buildStep >= 0
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-20 blur-[2px] translate-y-2"
          }`}
        >
          <HeroSection onOpenResume={() => setResumeOpen(true)} />
        </div>

        {/* Step 1: Philosophy Section */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            buildStep >= 1
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-25 blur-[2px] translate-y-3"
          }`}
        >
          <PhilosophySection />
        </div>

        {/* Step 2: Featured Projects */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            buildStep >= 2
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-25 blur-[2px] translate-y-3"
          }`}
        >
          <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        </div>

        {/* Step 3: Capabilities & Technical Fluency */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            buildStep >= 3
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-25 blur-[2px] translate-y-3"
          }`}
        >
          <CapabilitiesSection />
          <ExperienceTimeline />
        </div>

        {/* Step 4: Contact & Footer */}
        <div
          className={`transition-all duration-700 ease-out will-change-transform ${
            buildStep >= 4
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-25 blur-[2px] translate-y-3"
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
