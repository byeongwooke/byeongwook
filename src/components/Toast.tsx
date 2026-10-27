"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-white shadow-2xl border border-neutral-800"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
