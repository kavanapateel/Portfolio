import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SlideUp from "../motion/Slide-up";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, idx) => (
        <SlideUp key={item?.type} delay={idx * 0.3}>
          <div
            className="group relative block h-full w-full p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 block h-full w-full rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.type}</CardTitle>
              {/* <CardSubTitle>
              {item.category} | {item.date}
            </CardSubTitle> */}
              <CardDescription>{item.skillset}</CardDescription>
            </Card>
          </div>
        </SlideUp>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "relative z-20 aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.2] bg-zinc-900 p-4 group-hover:border-slate-700",
        className,
      )}
    >
      <div className="relative z-50 contents">
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "my-4 font-head text-4xl font-bold text-foreground",
        className,
      )}
    >
      {children}
    </h4>
  );
};
export const CardSubTitle = ({ className, children }) => {
  return (
    <h5
      className={cn(
        "mb-2 font-head text-3xl font-extralight text-zinc-400/75",
        className,
      )}
    >
      {children}
    </h5>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("asp mb-2 text-xl text-foreground", className)}>
      {children}
    </p>
  );
};
