"use client";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import SlideUp from "../motion/Slide-up";

const ExpandableCards = ({ cards }) => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute right-2 top-2 flex aspect-square h-6 items-center justify-center rounded-full bg-white text-background lg:hidden"
              onClick={() => setActive(null)}
            >
              <IconX size={20} />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-zinc-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.coverSrc ?? active.src}
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-head text-3xl font-bold"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.duration}-${id}`}
                      className="font-head text-xl font-light text-gray-500"
                    >
                      {active.duration}
                    </motion.p>
                  </div>
                </div>
                <div className="relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col items-start overflow-auto pb-10 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] *:h-full"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="mx-auto grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        {cards.map((card) => (
          <SlideUp key={`card-${card.title}-${id}`} delay={id * 0.3}>
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="flex cursor-pointer flex-col items-start justify-start rounded-xl p-4 hover:bg-neutral-800 md:flex-row"
            >
              <div className="flex flex-row items-start justify-start gap-4">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="aspect-square w-40 max-w-40 rounded-lg bg-foreground object-cover object-top md:h-14 md:w-14"
                  />
                </motion.div>
                <div className="flex flex-col">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="text-left font-head text-2xl font-medium"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-left font-head font-light text-gray-500"
                  >
                    {card.description} • {card.grade} CGPA
                  </motion.p>
                </div>
              </div>
              {/* <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="mt-4 rounded-full bg-gray-100 px-4 py-2 font-head text-sm font-bold capitalize text-zinc-900 hover:bg-green-500 hover:text-white md:mt-0"
            >
              View Details
            </motion.button> */}
            </motion.div>
          </SlideUp>
        ))}
      </div>
    </>
  );
};

export default ExpandableCards;
