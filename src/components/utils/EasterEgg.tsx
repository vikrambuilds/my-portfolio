import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { Zap } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const EasterEgg = () => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [hintTimer, setHintTimer] = useState<NodeJS.Timeout>();

  const unlockEasterEgg = useCallback(() => {
    if (isUnlocked) return;

    setIsUnlocked(true);
    setMatrixActive(true);
    toast.success("Easter Egg Unlocked!",{
      icon: <Zap className="text-yellow-400" />
    });

    // Reset after 10 seconds
    const timeout = setTimeout(() => {
      setMatrixActive(false);
      setIsUnlocked(false);
      setInputSequence([]);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isUnlocked]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key repeats
      if (e.repeat) return;

      const newSequence = [...inputSequence, e.key];

      // Keep only the last needed keys
      const trimmedSequence = newSequence.slice(-KONAMI_CODE.length);
      setInputSequence(trimmedSequence);

      // Check for Konami code match
      if (trimmedSequence.join("") === KONAMI_CODE.join("")) {
        unlockEasterEgg();
      }

      // Reset hint timer on any key press
      if (hintTimer) clearTimeout(hintTimer);
      setShowHint(false);
      setHintTimer(setTimeout(() => setShowHint(true), 60000));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence, unlockEasterEgg, hintTimer]);

  // Cleanup effects
  useEffect(() => {
    return () => {
      if (hintTimer) clearTimeout(hintTimer);
    };
  }, [hintTimer]);

  // Matrix rain effect
  useEffect(() => {
    if (!matrixActive) return;

    const chars = "01";
    const cols = Math.floor(window.innerWidth / 20);
    const drops: number[] = Array(cols).fill(0);

    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 w-full h-full z-[9999] pointer-events-none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      if (!matrixActive) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF40";
      ctx.font = "16px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      document.body.removeChild(canvas);
    };
  }, [matrixActive]);

  return (
    <>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2",
            "bg-background/90 backdrop-blur-sm border border-neon/30",
            "px-4 py-2 rounded-full text-sm text-muted-foreground",
            "shadow-lg shadow-neon/10"
          )}
        >
          <span className="text-neon">Pro Tip:</span> Try the Konami Code ↑↑↓↓←→←→BA
        </motion.div>
      )}
    </>
  );
};

export default EasterEgg;