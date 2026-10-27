"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Compass, CheckCircle } from "lucide-react";
import { PHILOSOPHY_DATA } from "@/data/portfolioData";

export function PhilosophySection() {
  const [activeTab, setActiveTab] = useState(0);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <HeartHandshake className="h-5 w-5 text-[#111111]" />;
      case 1:
        return <ShieldCheck className="h-5 w-5 text-[#111111]" />;
      default:
        return <Compass className="h-5 w-5 text-[#111111]" />;
    }
  };

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-neutral-50/60 border-t border-b border-[#e5e7eb]">
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
              01 / Core Philosophy
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
            문제를 대하는 태도와 실행의 기준
          </h2>
          <p className="text-sm sm:text-base text-[#6b7280] max-w-2xl leading-relaxed">
            비즈니스의 복잡성을 단순화하고 지속 가능한 임팩트를 만들기 위해 제가 가장 중요하게 여기는 3가지 일하는 원칙입니다.
          </p>
        </motion.div>

        {/* 3 Core Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {PHILOSOPHY_DATA.map((item, index) => {
            const isSelected = activeTab === index;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                onClick={() => setActiveTab(index)}
                className={`cursor-pointer rounded-2xl p-7 transition-all border ${
                  isSelected
                    ? "bg-white border-[#111111] shadow-md ring-1 ring-[#111111]"
                    : "bg-white/80 border-[#e5e7eb] hover:border-neutral-400 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-200">
                      {getIcon(index)}
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      Principle {item.number}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
                    {item.keyword}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#111111] mb-2">
                  {item.title}
                </h3>

                <p className="text-sm font-medium text-neutral-700 mb-5 leading-snug">
                  {item.summary}
                </p>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs italic text-neutral-600 mb-5 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </div>

                <p className="text-xs text-[#6b7280] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Dive Practice Breakdown for Selected Tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-white p-7 md:p-8 border border-neutral-200 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100 mb-6">
            <div>
              <span className="text-xs font-mono text-neutral-400 font-semibold uppercase">
                Field Practices / 실천 사례
              </span>
              <h4 className="text-lg font-bold text-[#111111] mt-0.5">
                {PHILOSOPHY_DATA[activeTab].title} — 현장 실무 적용 방식
              </h4>
            </div>
            <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full w-fit">
              실무에서 타협하지 않는 실행 디테일
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHILOSOPHY_DATA[activeTab].practices.map((practice, pIdx) => (
              <div
                key={pIdx}
                className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/60"
              >
                <CheckCircle className="h-4 w-4 text-[#111111] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-neutral-800 leading-relaxed">
                  {practice}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
