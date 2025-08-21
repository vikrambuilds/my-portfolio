
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Decorative shapes for background
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 4 + Math.random() * 6,
    size: 10 + Math.random() * 40,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient">
      {/* Animated Background Elements */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-neon/10 backdrop-blur-3xl"
          initial={{
            x: `${shape.x}vw`,
            y: `${shape.y}vh`,
            opacity: 0.5,
          }}
          animate={{
            x: [`${shape.x}vw`, `${(shape.x + 10) % 100}vw`],
            y: [`${shape.y}vh`, `${(shape.y + 15) % 100}vh`],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: shape.duration,
            delay: shape.delay,
            ease: "easeInOut",
          }}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center z-10 px-6 flex flex-col items-center"
      >
        <motion.div
          variants={itemVariants}
          className="text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon to-lightpurple"
        >
          404
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl font-heading mb-6">
          Page Not Found
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-8">
          Oops! Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Button asChild>
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Homepage
            </Link>
          </Button>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-16 p-4 rounded-lg border border-border relative"
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-4 text-muted-foreground">
            Pro Tip
          </div>
          <p className="text-sm text-muted-foreground">
            Try the Konami Code somewhere on the site for a neat Easter egg! <br />
            <span className="opacity-50">(↑↑↓↓←→←→BA)</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
