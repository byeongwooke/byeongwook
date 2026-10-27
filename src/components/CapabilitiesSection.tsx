"use client";

import { motion } from "framer-motion";
import { TrendingUp, Layers, Code2, Check, Sparkles } from "lucide-react";
import { CAPABILITIES_DATA } from "@/data/portfolioData";

export function CapabilitiesSection() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="h-5 w-5 text-[#111111]" />;
      case "Layers":
        return <Layers className="h-5 w-5 text-[#111111]" />;
      case "Code2":
        return <Code2 className="h-5 w-5 text-[#111111]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#111111]" />;
    }
  };

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-neutral-50/70 border-t border-b border-[#e5e7eb]">
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
              03 / Technical & Domain Fluency
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
            전략적 사고와 실행을 뒷받침하는 핵심 역량
          </h2>
          <p className="text-sm sm:text-base text-[#6b7280] max-w-2xl leading-relaxed">
            비즈니스 가설 검증부터 데이터 추출, 개발팀과의 아키텍처 소통까지 end-to-end로 오너십을 발휘할 수 있는 역량 셋입니다.
          </p>
        </motion.div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAPABILITIES_DATA.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="rounded-3xl bg-white border border-[#e5e7eb] p-7 md:p-8 hover:border-[#111111] hover:shadow-lg transition-all flex flex-col"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-200">
                  {getCategoryIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111111]">
                    {category.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4 mt-4 flex-1">
                {category.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`p-4 rounded-2xl border transition-colors ${
                      item.highlight
                        ? "bg-neutral-50/90 border-neutral-300/80"
                        : "bg-white border-neutral-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-[#111111]">
                        {item.name}
                      </span>
                      {item.highlight && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#111111] text-white">
                          Core
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
