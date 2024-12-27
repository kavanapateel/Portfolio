"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export const AnimatedContent = ({ list, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % list.length);
  }, [list.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + list.length) % list.length);
  }, [list.length]);

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <>
      <div className="relative aspect-video w-full md:w-1/2">
        <AnimatePresence>
          {list.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotate: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : randomRotateY(),
                zIndex: isActive(index) ? 999 : list.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 origin-bottom"
            >
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
              >
                <Image
                  src={item.imgUrl}
                  alt={item.title}
                  width={500}
                  height={500}
                  draggable={false}
                  className="flex w-full items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 object-cover object-center text-center"
                />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex h-full w-full flex-col-reverse items-end justify-between gap-4 p-4 md:flex-col">
        <motion.div
          key={active}
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -20,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <h3 className="font-head text-4xl font-black">
            {list[active].title}
          </h3>
          <p className="mb-2.5 font-head text-2xl font-extralight capitalize text-gray-500">
            {list[active].category} • {list[active].date}
          </p>
          <motion.p className="inline-block h-80 text-lg text-foreground md:h-full">
            {list[active].description.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.02 * index,
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="group/button text-foreground/50 inline-flex aspect-square w-12 animate-shimmer items-center justify-center rounded-full bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] p-3 font-medium transition-colors focus:outline-none focus:ring-2 md:w-10"
          >
            <IconArrowLeft className="aspect-square w-full text-foreground transition-transform duration-300 group-hover/button:rotate-12" />
          </button>
          <button
            onClick={handleNext}
            className="group/button text-foreground/50 inline-flex aspect-square w-12 animate-shimmer items-center justify-center rounded-full bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] p-3 font-medium transition-colors focus:outline-none focus:ring-2 md:w-10"
          >
            <IconArrowRight className="aspect-square w-full text-foreground transition-transform duration-300 group-hover/button:-rotate-12" />
          </button>
        </div>
      </div>
    </>
  );
};
