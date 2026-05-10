"use client";

import { motion, Variants } from "framer-motion";
import { Brain, FileText, Mic, Search } from "lucide-react";

const features = [
  {
    title: "Local LLM Analysis",
    description: "Evaluates smart contract interactions and flags potential phishing attempts instantly on your device.",
    icon: Brain,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    title: "Air-Gapped RAG",
    description: "Cross-references your transactions against known exploit databases without an internet connection.",
    icon: Search,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    title: "Vision OCR",
    description: "Scans QR codes and screens for malicious deep links and hidden approval requests.",
    icon: FileText,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  },
  {
    title: "Voice Commands (STT)",
    description: "Hands-free operation allows you to command audits and request explanations using your voice.",
    icon: Mic,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function FeatureGrid() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
          Powered by Tether QVAC
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our specialized AI stack provides comprehensive coverage across text, vision, and audio, ensuring you&apos;re protected from every angle.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl backdrop-blur-md bg-slate-900/50 border ${feature.border} transition-colors duration-300 hover:bg-slate-800/80`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
