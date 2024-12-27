"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Preloader from "./Preloader";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const loadTime = 1000;

  const updateProgress = useCallback(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / loadTime) * 100, 99);
      setProgress(newProgress);

      if (newProgress >= 99) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setIsVisible(false), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [loadTime]);

  useEffect(() => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", updateProgress);
    } else {
      updateProgress();
    }

    return () =>
      document.removeEventListener("DOMContentLoaded", updateProgress);
  }, [updateProgress]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && <Preloader progress={progress} />}
    </AnimatePresence>
  );
};

export default Loader;
