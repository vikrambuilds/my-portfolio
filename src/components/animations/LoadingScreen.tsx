import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { Code, Cpu, Zap, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const LoadingScreen = () => {
  const controls = useAnimationControls();
  const [progressText, setProgressText] = useState("Booting up creativity...");
  const [showParticles, setShowParticles] = useState(false);

  // Dynamic progress messages
  const progressMessages = [
    "Initializing neural networks...",
    "Loading design systems...",
    "Compiling awesomeness...",
    "Rendering magic...",
    "Almost there..."
  ];

  useEffect(() => {
    const animationSequence = async () => {
      await controls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      });
      
      // Particle explosion after initial load
      setTimeout(() => setShowParticles(true), 800);
      
      // Progress message animation
      progressMessages.forEach((msg, i) => {
        setTimeout(() => setProgressText(msg), i * 1500);
      });
    };

    animationSequence();
  }, [controls]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { 
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1] 
          } 
        }}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-br from-background to-gray-900 overflow-hidden"
        aria-label="Loading screen"
        role="status"
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: i * 0.02, duration: 1 }}
              className="absolute top-0 h-full w-px bg-neon"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={controls}
            className="flex flex-col items-center"
          >
            {/* Animated logo with depth effect */}
            <motion.div 
              className="relative mb-6"
              animate={{
                rotateY: [0, 15, 0, -15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <Code 
                  size={64} 
                  className="text-neon relative z-10"
                  strokeWidth={1.5}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.3 }}
                  className="absolute inset-0 bg-neon rounded-full blur-md"
                />
              </div>
            </motion.div>

            {/* Name with gradient animation */}
            <motion.h1 
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon to-lightpurple"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              Vikram Kumar
            </motion.h1>

            {/* High-tech progress bar */}
            <div className="relative w-72 h-3 bg-muted/30 rounded-full overflow-hidden mb-4 backdrop-blur-sm">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2.4,
                  ease: [0.65, 0, 0.35, 1]
                }}
                className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-neon to-transparent"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-1 w-full bg-neon/10 rounded-full"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>

            {/* Dynamic progress text with typing effect */}
            <motion.p 
              className="text-muted-foreground text-sm font-mono h-6"
              key={progressText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {progressText}
            </motion.p>

            {/* Tech stack indicators */}
            <motion.div 
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[Cpu, Zap, Sparkles].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Icon 
                    size={20} 
                    className="text-neon/80" 
                    strokeWidth={1.5}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Particle explosion effect */}
          {showParticles && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                    opacity: [1, 0],
                    scale: [0, Math.random() * 0.5 + 0.5]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                    ease: "circOut"
                  }}
                  className={cn(
                    "absolute top-1/2 left-1/2 w-1 h-1 rounded-full",
                    i % 3 === 0 ? "bg-neon" : 
                    i % 2 === 0 ? "bg-lightpurple" : "bg-white"
                  )}
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;