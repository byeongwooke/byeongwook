"use client";

import { useState } from "react";
import { BlueprintCanvas } from "@/components/canvas/BlueprintCanvas";
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyText = (_text: string, label: string) => {
    setToastMessage(`${label}가 클립보드에 복사되었습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white relative">
      {/* 1. Step 01: The Blueprint Canvas */}
      <BlueprintCanvas />

      {/* 2. Standby Content (Kept waiting for subsequent build steps) */}
      <div className="opacity-0 pointer-events-none select-none" aria-hidden="true">
        <Navbar onOpenResume={() => setResumeOpen(true)} />
        <main className="relative z-10">
          <HeroSection onOpenResume={() => setResumeOpen(true)} />
          <PhilosophySection />
          <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
          <CapabilitiesSection />
          <ExperienceTimeline />
          <ContactSection onCopyText={handleCopyText} />
        </main>
        <Footer />
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
    </div>
  );
}
