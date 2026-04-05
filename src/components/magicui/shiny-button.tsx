"use client";

import { motion } from "framer-motion";

interface ShinyButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export function ShinyButton({
  text = "shiny-button",
  className,
  onClick,
}: ShinyButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      onClick={onClick}
      className={`relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-lg dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] ${className}`}
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "white",
      }}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-widest"
        style={{
          maskImage:
            "linear-gradient(-75deg, white 20%, transparent 30%, white 100%)",
        }}
      >
        {text}
      </span>

      {/* Efek kilatan cahaya (The Shiny Effect) */}
      <motion.span
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          repeatDelay: 1,
          ease: "linear",
        }}
        className="absolute inset-0 z-10 block bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.button>
  );
}
