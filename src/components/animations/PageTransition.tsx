import { motion, useIsPresent } from "framer-motion";
import { type ReactNode, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  preserveScroll?: boolean;
}

const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  (
    {
      children,
      className,
      duration = 0.5,
      delay = 0,
      preserveScroll = false,
    },
    ref
  ) => {
    const isPresent = useIsPresent();
    const transition = {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      duration,
      delay,
    };

    return (
      <motion.div
        ref={ref}
        className={cn("relative", className)}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { ...transition, delay: delay + 0.1 },
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.98,
          transition: { ...transition, duration: duration * 0.8 },
        }}
        style={{
          position: preserveScroll ? "absolute" : "relative",
          top: 0,
          left: 0,
          right: 0,
        }}
        onAnimationStart={() => {
          if (!preserveScroll) {
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, 0);
          }
        }}
        onAnimationComplete={() => {
          document.documentElement.style.scrollBehavior = "";
        }}
      >
        {children}
        {!isPresent && (
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0, transition: { ...transition, delay } }}
            exit={{ scaleX: 1 }}
            className="fixed inset-0 bg-background origin-right z-50"
          />
        )}
      </motion.div>
    );
  }
);

PageTransition.displayName = "PageTransition";

export default PageTransition;