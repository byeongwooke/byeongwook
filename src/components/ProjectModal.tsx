"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, Cpu, Calendar, Building2 } from "lucide-react";
import { ProjectItem } from "@/types/portfolio";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-neutral-200 bg-neutral-50/50 flex items-start justify-between gap-4 sticky top-0 z-10 backdrop-blur-md">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-semibold">
                  {project.badge}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                  <Building2 className="h-3.5 w-3.5" />
                  {project.organization}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.period}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-1">
                역할: {project.role}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-neutral-200 transition-colors text-neutral-500 hover:text-neutral-900 shrink-0"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Overview Summary */}
            <div className="p-5 rounded-2xl bg-neutral-100/70 border border-neutral-200/80">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Project Overview
              </span>
              <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Impact Metric Cards */}
            <div>
              <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Key Performance Indicators (KPIs)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.keyMetrics.map((km, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-neutral-200 bg-white"
                  >
                    <div className="text-2xl font-extrabold text-[#111111] font-mono mb-1">
                      {km.value}
                    </div>
                    <div className="text-xs font-bold text-neutral-800 mb-1">
                      {km.label}
                    </div>
                    <div className="text-[11px] text-neutral-500 leading-snug">
                      {km.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Pillars: Problem, Solution, Impact, Tech Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Problem */}
              <div className="p-6 rounded-2xl border border-red-100 bg-red-50/20 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    01. Problem Definition
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  {project.problem.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {project.problem.description}
                </p>
                <div className="space-y-2 mt-auto">
                  {project.problem.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Solution */}
              <div className="p-6 rounded-2xl border border-blue-100 bg-blue-50/20 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-blue-600">
                  <Lightbulb className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    02. Product Solution
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  {project.solution.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {project.solution.description}
                </p>
                <div className="space-y-2 mt-auto">
                  {project.solution.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Business Impact */}
              <div className="p-6 rounded-2xl border border-emerald-100 bg-emerald-50/20 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    03. Business Impact
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  {project.businessImpact.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {project.businessImpact.description}
                </p>
                <div className="space-y-2 mt-auto">
                  {project.businessImpact.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Tech & Policy Specs */}
              <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex flex-col">
                <div className="flex items-center gap-2 mb-3 text-neutral-800">
                  <Cpu className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    04. Tech & Policy Specs
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  {project.techSpecs.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {project.techSpecs.description}
                </p>
                <div className="space-y-2 mt-auto">
                  {project.techSpecs.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="text-neutral-400 font-mono">[{idx + 1}]</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="pt-4 border-t border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Related Domains & Keywords
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-medium">
              PM 유병욱 포트폴리오 케이스 스터디
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              닫기 (Close)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
