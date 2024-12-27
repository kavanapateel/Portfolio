"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const generateUniqueId = (prefix, text) => {
  const hash = btoa(text).substring(0, 10);
  return `${prefix}-${hash}`;
};

export const TextHoverEffect = ({
  text,
  duration,
  classNames = {
    containerClassName: "",
    textSize: "",
    textClassName: "",
  },
  size = {
    svgWidth: 300,
    svgHeight: 100,
  },
}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const gradientId = generateUniqueId("textGradient", text);
  const maskId = generateUniqueId("textMask", text);
  const revealMaskId = generateUniqueId("revealMask", text);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${size.svgWidth} ${size.svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("z-[999]", classNames.containerClassName)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="var(--red-500)" />
          <stop offset="50%" stopColor="var(--green-500)" />
          <stop offset="100%" stopColor="var(--blue-500)" />
        </linearGradient>

        <motion.radialGradient
          id={revealMaskId}
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={maskId}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${revealMaskId})`}
          />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn(
          "fill-transparent stroke-neutral-800 font-head text-4xl font-bold",
          classNames.textSize,
          classNames.textClassName,
        )}
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className={cn(
          "fill-transparent stroke-neutral-800 font-head text-4xl font-bold",
          classNames.textSize,
          classNames.textClassName,
        )}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.3"
        mask={`url(#${maskId})`}
        className={cn(
          "fill-transparent font-head text-4xl font-bold",
          classNames.textSize,
        )}
      >
        {text}
      </text>
    </svg>
  );
};
