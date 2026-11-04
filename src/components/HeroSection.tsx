"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, FileText, Coffee, Sparkles } from "lucide-react";
import { PROFILE_DATA, QUICK_METRICS } from "@/data/portfolioData";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Identity Tag & Badge */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold tracking-wide text-neutral-800 border border-neutral-200">
              <Sparkles className="h-3.5 w-3.5 text-neutral-600" />
              <span>{PROFILE_DATA.englishTitle}</span>
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              / 유병욱 포트폴리오
            </span>
          </motion.div>

          {/* Mask Reveal Headline */}
          <motion.div variants={itemVariants} className="space-y-1 mb-7">
            <div className="overflow-hidden">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.15]">
                {PROFILE_DATA.headlineMain}
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-400 leading-[1.15]">
                {PROFILE_DATA.headlineSub}
              </h1>
            </div>
          </motion.div>

          {/* Sub Copy */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#6b7280] leading-relaxed max-w-3xl mb-8 font-normal"
          >
            {PROFILE_DATA.subCopy}
          </motion.p>

          {/* Key Hashtags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
            {PROFILE_DATA.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-md bg-neutral-50 text-neutral-600 border border-neutral-200/80 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3.5 mb-16"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] text-white text-sm font-semibold hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-sm"
            >
              <span>프로젝트 살펴보기</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#111111] text-sm font-semibold border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50 transition-all active:scale-[0.98]"
            >
              <FileText className="h-4 w-4 text-neutral-600" />
              <span>이력서 전체 열람</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 text-[#111111] text-sm font-semibold hover:bg-neutral-200 transition-all active:scale-[0.98]"
            >
              <Coffee className="h-4 w-4 text-neutral-700" />
              <span>커피챗 제안하기</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Quick Impact Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-200"
        >
          {QUICK_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group p-6 rounded-2xl bg-white border border-[#e5e7eb] hover:border-neutral-900 hover:shadow-lg transition-all"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] font-mono group-hover:scale-[1.02] transition-transform">
                  {metric.value}
                </span>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
                  Key Metric 0{index + 1}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1.5">
                {metric.label}
              </h3>
              <p className="text-xs text-[#6b7280] leading-relaxed mb-3">
                {metric.description}
              </p>
              {metric.subLabel && (
                <div className="inline-block text-[11px] font-medium text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200/60">
                  {metric.subLabel}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
