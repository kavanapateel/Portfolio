import { motion } from "framer-motion";

const SlideUp = ({ children, className = "", delay = 0.3 }) => {
  return (
    <motion.section
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: delay,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SlideUp;
