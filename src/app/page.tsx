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
import { ProjectItem } from "@/types/portfolio";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyText = (_text: string, label: string) => {
    setToastMessage(`${label}가 클립보드에 복사되었습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Single Page Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection onOpenResume={() => setResumeOpen(true)} />

        {/* 01. Philosophy Section */}
        <PhilosophySection />

        {/* 02. Featured Projects */}
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* 03. Capabilities & Technical Fluency */}
        <CapabilitiesSection />

        {/* Work Experience History */}
        <ExperienceTimeline />

        {/* 04. Contact & Footer */}
        <ContactSection onCopyText={handleCopyText} />
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
