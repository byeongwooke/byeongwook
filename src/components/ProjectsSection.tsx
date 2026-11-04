"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/portfolioData";
import { ProjectItem } from "@/types/portfolio";

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeTabPerProject, setActiveTabPerProject] = useState<{
    [projectId: string]: "problem" | "solution" | "impact" | "tech";
  }>({
    "project-01": "impact",
    "project-02": "impact",
    "project-03": "impact",
  });

  const filterOptions = [
    { label: "전체 프로젝트 (All)", value: "all" },
    { label: "신사업 / 라스트마일", value: "new_biz" },
    { label: "인프라 / 비용최적화", value: "infra" },
    { label: "0 to 1 / B2B SaaS", value: "b2b_erp" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeFilter);

  const handleTabChange = (
    projectId: string,
    tab: "problem" | "solution" | "impact" | "tech"
  ) => {
    setActiveTabPerProject((prev) => ({
      ...prev,
      [projectId]: tab,
    }));
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              02 / Featured Case Studies
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-3">
                비즈니스 임팩트 중심 프로젝트 3선
              </h2>
              <p className="text-sm sm:text-base text-[#6b7280] max-w-2xl leading-relaxed">
                단순 기능 출시가 아닌, P&L 최적화와 사용자 경험 개선을 실질적으로 입증한 핵심 프로덕트 케이스 스터디입니다.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {filterOptions.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`text-xs font-medium px-3.5 py-2 rounded-xl transition-all ${
                    activeFilter === f.value
                      ? "bg-[#111111] text-white shadow-sm"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Cards List */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => {
            const currentTab = activeTabPerProject[project.id] || "impact";

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-9 hover:border-[#111111] hover:shadow-xl transition-all duration-300"
              >
                {/* Top Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-100 mb-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-semibold">
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono font-medium text-neutral-500">
                      {project.organization}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-xs font-mono text-neutral-500">
                      {project.period}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-neutral-600 transition-colors"
                  >
                    <span>케이스 스터디 전문 보기</span>
                    <Maximize2 className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
                  </button>
                </div>

                {/* Title & Core Summary */}
                <div className="mb-6">
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="cursor-pointer text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight hover:text-neutral-700 transition-colors mb-2"
                  >
                    {project.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-neutral-500 mb-4">
                    <span className="text-neutral-900 font-semibold">역할:</span> {project.role}
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed max-w-4xl">
                    {project.summary}
                  </p>
                </div>

                {/* Quantitative Impact Highlights Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-8">
                  {project.keyMetrics.map((km, kmIdx) => (
                    <div
                      key={kmIdx}
                      className="p-3 bg-white rounded-xl border border-neutral-200/60"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-mono tracking-tight mb-1">
                        {km.value}
                      </div>
                      <div className="text-xs font-bold text-neutral-900 mb-0.5">
                        {km.label}
                      </div>
                      <div className="text-[11px] text-neutral-500 leading-tight">
                        {km.detail}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive 4-Section Pillar Switcher */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 border-b border-neutral-100 pb-3">
                    <span className="text-xs font-mono font-bold text-neutral-400 mr-2 uppercase">
                      Inspect Pillar:
                    </span>
                    <button
                      onClick={() => handleTabChange(project.id, "impact")}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        currentTab === "impact"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>Business Impact</span>
                    </button>

                    <button
                      onClick={() => handleTabChange(project.id, "problem")}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        currentTab === "problem"
                          ? "bg-red-50 text-red-800 border border-red-300 font-bold"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Problem</span>
                    </button>

                    <button
                      onClick={() => handleTabChange(project.id, "solution")}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        currentTab === "solution"
                          ? "bg-blue-50 text-blue-800 border border-blue-300 font-bold"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                      <span>Solution</span>
                    </button>

                    <button
                      onClick={() => handleTabChange(project.id, "tech")}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                        currentTab === "tech"
                          ? "bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      <Cpu className="h-3.5 w-3.5" />
                      <span>Tech & Policy Specs</span>
                    </button>
                  </div>

                  {/* Tab Detail Content Box */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200">
                    {currentTab === "impact" && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-emerald-700">
                          <TrendingUp className="h-4 w-4" />
                          <h4 className="text-sm font-bold">
                            {project.businessImpact.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 mb-4 leading-relaxed">
                          {project.businessImpact.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {project.businessImpact.points.map((pt, pIdx) => (
                            <div
                              key={pIdx}
                              className="text-xs text-neutral-800 flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100"
                            >
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTab === "problem" && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-red-700">
                          <AlertTriangle className="h-4 w-4" />
                          <h4 className="text-sm font-bold">
                            {project.problem.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 mb-4 leading-relaxed">
                          {project.problem.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {project.problem.points.map((pt, pIdx) => (
                            <div
                              key={pIdx}
                              className="text-xs text-neutral-800 flex items-start gap-2 p-2.5 rounded-lg bg-red-50/50 border border-red-100"
                            >
                              <span className="text-red-500 font-bold">•</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTab === "solution" && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-blue-700">
                          <Lightbulb className="h-4 w-4" />
                          <h4 className="text-sm font-bold">
                            {project.solution.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 mb-4 leading-relaxed">
                          {project.solution.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {project.solution.points.map((pt, pIdx) => (
                            <div
                              key={pIdx}
                              className="text-xs text-neutral-800 flex items-start gap-2 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100"
                            >
                              <span className="text-blue-600 font-bold">→</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTab === "tech" && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-neutral-800">
                          <Cpu className="h-4 w-4" />
                          <h4 className="text-sm font-bold">
                            {project.techSpecs.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 mb-4 leading-relaxed">
                          {project.techSpecs.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {project.techSpecs.items.map((item, pIdx) => (
                            <div
                              key={pIdx}
                              className="text-xs text-neutral-800 flex items-start gap-2 p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/80"
                            >
                              <span className="text-neutral-500 font-mono">#{pIdx + 1}</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Tag Bar & Deep Dive Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#111111] hover:text-white transition-all text-neutral-800"
                  >
                    <span>상세 케이스 스터디 읽기</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
