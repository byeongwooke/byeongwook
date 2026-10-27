"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { CAREER_EXPERIENCES } from "@/data/portfolioData";

export function ExperienceTimeline() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Work Experience
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
            실전 프로덕트 경험과 비즈니스 궤적
          </h2>
          <p className="text-sm sm:text-base text-[#6b7280] max-w-2xl leading-relaxed">
            스타트업 0 to 1 신사업 총괄부터 대기업 플랫폼의 물류 인프라 스케일업까지, 지속적인 가치 창출의 기록입니다.
          </p>
        </motion.div>

        {/* Timeline Items */}
        <div className="relative border-l border-neutral-200 ml-3 sm:ml-6 space-y-12">
          {CAREER_EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-7 sm:pl-10"
            >
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#111111] shadow-sm ring-4 ring-neutral-100" />

              <div className="rounded-3xl border border-[#e5e7eb] bg-white p-7 sm:p-8 hover:border-neutral-400 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#111111]">
                      {exp.company}
                    </h3>
                    <p className="text-sm font-semibold text-neutral-700">
                      {exp.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 w-fit">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 mb-5 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Bullets */}
                <div className="space-y-2 mb-6">
                  {exp.highlights.map((hl, hlIdx) => (
                    <div key={hlIdx} className="flex items-start gap-2.5 text-xs text-neutral-800">
                      <CheckCircle2 className="h-4 w-4 text-[#111111] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Domain Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
                  {exp.domains.map((dom) => (
                    <span
                      key={dom}
                      className="text-[11px] font-medium px-2.5 py-1 rounded bg-neutral-100 text-neutral-600"
                    >
                      {dom}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
