"use client";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ progress }) => {
  const [dimension, setDimension] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    updateDimensions(); // Initialize on mount
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  const strokeDashArray = 283;

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed right-0 top-0 z-[9999] flex h-dvh w-dvw items-center justify-center overflow-hidden bg-zinc-900"
    >
      <>
        {/* Circular Progress Bar */}
        <div className="relative z-10 flex items-center justify-center">
          <svg
            className="absolute"
            width="120"
            height="120"
            viewBox="0 0 120 120"
          >
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--purple-500)" />
                <stop offset="50%" stopColor="var(--violet-500)" />
                <stop offset="100%" stopColor="var(--blue-500)" />
              </linearGradient>
            </defs>

            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="#1c1c1c"
              strokeWidth="10"
              fill="none"
            />

            {/* Progress Circle with Gradient */}
            <motion.circle
              cx="60"
              cy="60"
              r="45"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={strokeDashArray}
              strokeDashoffset={
                strokeDashArray - (progress / 100) * strokeDashArray
              }
              animate={{
                strokeDashoffset:
                  strokeDashArray - (progress / 100) * strokeDashArray,
              }}
              transition={{
                duration: 0.4,
                ease: [0.42, 0, 0.58, 1],
              }}
              strokeLinecap="round"
            />
          </svg>

          {/* Progress Percentage */}
          <div className="number-flow-container absolute flex items-center justify-center font-head text-4xl font-extrabold [font-variant-numeric:tabular-nums]">
            <NumberFlow
              value={progress}
              format={{ minimumIntegerDigits: 2, maximumFractionDigits: 0 }}
              willChange
            />
          </div>
        </div>

        {/* Animated Path */}
        <svg className="absolute top-0 min-h-[120vh] w-full">
          <motion.path
            variants={curve}
            initial="initial"
            exit="exit"
            className="fill-zinc-900"
          />
        </svg>
      </>
    </motion.div>
  );
};

export default Preloader;

export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100dvh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};
