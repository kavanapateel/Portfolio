import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "fixed right-4 top-1/2 z-[1000] block md:hidden",
        className,
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/50 inline-flex aspect-square h-12 animate-shimmer items-center justify-center place-self-end rounded-full bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] font-medium transition-colors focus:outline-none focus:ring-2 md:place-self-start"
                >
                  <div className="aspect-square h-6">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="text-foreground/50 inline-flex aspect-square h-12 animate-shimmer items-center justify-center place-self-end rounded-full bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] font-medium transition-colors focus:outline-none focus:ring-2 md:place-self-start"
      >
        <IconLayoutNavbarCollapse className="aspect-square h-6" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-4 left-1/2 z-[1000] mx-auto hidden h-16 -translate-x-1/2 animate-shimmer items-end gap-4 rounded-2xl bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] px-4 pb-3 backdrop-blur-sm transition-colors md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [25, 50, 25]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [25, 50, 25],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground/50 font-2xl inline-flex aspect-square animate-shimmer items-center gap-2 rounded-full bg-[linear-gradient(110deg,#18181b,45%,#1e2631,55%,#18181b)] bg-[length:200%_100%] font-head font-medium backdrop-blur-sm transition-colors delay-1000 focus:outline-none focus:ring-2"
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-neutral-900 bg-neutral-800/50 px-2 py-0.5 font-head"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex aspect-square items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
