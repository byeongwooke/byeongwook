"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Mail, Phone, MapPin, Download, CheckCircle2 } from "lucide-react";
import {
  PROFILE_DATA,
  CAREER_EXPERIENCES,
  FEATURED_PROJECTS,
  RESUME_SUMMARY,
  CAPABILITIES_DATA,
} from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm no-print"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8 z-10 max-h-[92vh] flex flex-col"
        >
          {/* Action Bar (Top) */}
          <div className="p-4 sm:p-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between no-print sticky top-0 z-10 backdrop-blur-md">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
              Curriculum Vitae / Resume
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-neutral-900 text-xs font-semibold text-[#111111] transition-all"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>인쇄 / PDF 저장</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div className="p-8 sm:p-12 overflow-y-auto space-y-10 text-neutral-900 font-sans print:p-0">
            {/* Header */}
            <div className="border-b border-neutral-200 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight">
                  {PROFILE_DATA.name}{" "}
                  <span className="text-lg font-normal text-neutral-500 ml-2">
                    ({PROFILE_DATA.nameEn})
                  </span>
                </h1>
                <span className="text-sm font-semibold text-neutral-800">
                  {PROFILE_DATA.englishTitle}
                </span>
              </div>
              <p className="text-sm font-medium text-neutral-700 mb-4">
                {PROFILE_DATA.role}
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{PROFILE_DATA.contact.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{PROFILE_DATA.contact.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{PROFILE_DATA.contact.location}</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3">
                Professional Summary
              </h2>
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                {PROFILE_DATA.subCopy}
                <br className="my-2" />
                <span className="font-semibold text-neutral-900">
                  핵심 가치관: &ldquo;{PROFILE_DATA.motto}&rdquo;
                </span>
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h2 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-4">
                Work Experience
              </h2>
              <div className="space-y-6">
                {CAREER_EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="pb-6 border-b border-neutral-100 last:border-none">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="text-base font-bold text-[#111111]">
                        {exp.company}
                      </h3>
                      <span className="text-xs font-mono font-medium text-neutral-500">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-700 mb-2">
                      {exp.role}
                    </div>
                    <p className="text-xs text-neutral-600 mb-3">
                      {exp.description}
                    </p>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((hl, hlIdx) => (
                        <li key={hlIdx} className="text-xs text-neutral-800 flex items-start gap-2">
                          <span className="text-neutral-400 font-bold">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects Highlight */}
            <div>
              <h2 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-4">
                Key Project Highlights
              </h2>
              <div className="space-y-4">
                {FEATURED_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-neutral-200 bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <div className="text-sm font-bold text-[#111111]">
                        {proj.title}
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {proj.period}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-600 mb-2">
                      <span className="font-semibold text-neutral-800">역할:</span> {proj.role}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {proj.keyMetrics.map((km, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800"
                        >
                          {km.label}: {km.value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Domain Matrix */}
            <div>
              <h2 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-4">
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CAPABILITIES_DATA.map((cat, i) => (
                  <div key={i} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
                    <h3 className="text-xs font-bold text-[#111111] mb-2">
                      {cat.title}
                    </h3>
                    <ul className="space-y-1">
                      {cat.items.map((item, itIdx) => (
                        <li key={itIdx} className="text-[11px] text-neutral-700">
                          • {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
              <div>
                <h2 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3">
                  Certifications & Skills
                </h2>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {RESUME_SUMMARY.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-neutral-500" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3">
                  Languages
                </h2>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {RESUME_SUMMARY.languages.map((lang, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-neutral-400 font-bold">•</span>
                      <span>{lang}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
