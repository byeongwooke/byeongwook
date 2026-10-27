"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Coffee,
  Send,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolioData";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

interface ContactSectionProps {
  onCopyText: (text: string, label: string) => void;
}

export function ContactSection({ onCopyText }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    topic: "커피챗 요청 및 포지션 제안",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopiedEmail(true);
    onCopyText(PROFILE_DATA.contact.email, "이메일 주소");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.phone);
    setCopiedPhone(true);
    onCopyText(PROFILE_DATA.contact.phone, "전화번호");
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[커피챗/제안] ${formData.topic} - ${formData.senderName}`);
    const body = encodeURIComponent(
      `보내는 분: ${formData.senderName}\n연락처/이메일: ${formData.senderEmail}\n\n내용:\n${formData.message}`
    );
    window.location.href = `mailto:${PROFILE_DATA.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200 mb-4">
            <Coffee className="h-3.5 w-3.5 text-neutral-600" />
            <span>04 / Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight mb-5 leading-tight">
            새로운 도전과 제품의 성장에 대해<br className="hidden sm:inline" />
            편하게 이야기 나누고 싶습니다.
          </h2>
          <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed">
            비즈니스 문제 해결, 신규 서비스 기획, 물류/플랫폼 인프라 확장이 필요한 팀이라면 언제든 편하게 연락해 주세요.
          </p>
        </motion.div>

        {/* Two Columns: Contact Channels & Coffee Chat Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:border-neutral-900 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  <Mail className="h-4 w-4 text-[#111111]" />
                  <span>Email</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-700">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-neutral-400" />
                      <span>복사</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${PROFILE_DATA.contact.email}`}
                className="text-base sm:text-lg font-bold text-[#111111] hover:underline block break-all"
              >
                {PROFILE_DATA.contact.email}
              </a>
              <span className="text-xs text-neutral-500 mt-1 block">
                비즈니스 제안 및 상시 이메일 회신
              </span>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:border-neutral-900 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  <Phone className="h-4 w-4 text-[#111111]" />
                  <span>Phone</span>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-700">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-neutral-400" />
                      <span>복사</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`tel:${PROFILE_DATA.contact.phone}`}
                className="text-base sm:text-lg font-bold text-[#111111] hover:underline block"
              >
                {PROFILE_DATA.contact.phone}
              </a>
              <span className="text-xs text-neutral-500 mt-1 block">
                유선 연락 및 문자 메시지 환영
              </span>
            </div>

            {/* Social & Professional Links */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-white">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-4">
                Social & Network
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 transition-colors border border-neutral-200/60"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="h-4 w-4 text-neutral-700" />
                    <span>LinkedIn 프로필</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 transition-colors border border-neutral-200/60"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="h-4 w-4 text-neutral-700" />
                    <span>GitHub 프로필</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Coffee Chat Quick Request Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <MessageSquare className="h-4 w-4 text-[#111111]" />
                <h3 className="text-base font-bold text-[#111111]">
                  커피챗 또는 제안 메시지 보내기
                </h3>
              </div>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                작성하신 내용은 기본 메일 클라이언트로 즉시 연결되어 유병욱 기획자에게 전송됩니다.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      성함 / 회사명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동 (토스)"
                      value={formData.senderName}
                      onChange={(e) =>
                        setFormData({ ...formData, senderName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      회신 받으실 이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@company.com"
                      value={formData.senderEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, senderEmail: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    대화 주제
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                  >
                    <option value="커피챗 요청 및 포지션 제안">
                      커피챗 요청 및 포지션 제안
                    </option>
                    <option value="물류 / B2B 플랫폼 신사업 자문">
                      물류 / B2B 플랫폼 신사업 자문
                    </option>
                    <option value="프로젝트 협업 및 외주 컨설팅">
                      프로젝트 협업 및 외주 컨설팅
                    </option>
                    <option value="기타 문의">기타 문의</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    메시지 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="함께 나누고 싶은 이야기나 제안하고 싶으신 포지션에 대해 편하게 적어주세요."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-sm active:scale-[0.99]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>이메일 전송하기 (Send Inquiry)</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
