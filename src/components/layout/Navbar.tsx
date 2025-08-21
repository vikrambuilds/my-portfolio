import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Code, Download } from "lucide-react";
import { Button } from "../ui/button";
// import MotionToggle from "../accessibility/MotionToggle";
import ThemeModeToggle from "../theme/ThemeModeToggle";
import { cn } from "../../lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Blog", path: "/blog" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Handle scroll behavior (hide/show on scroll direction)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 100) {
      setIsVisible(true);
      return;
    }

    if (Math.abs(latest - lastScrollY) < 20) return;

    if (latest > lastScrollY && latest > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        transition: { type: "spring", damping: 20 }
      }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        "border-b border-transparent",
        isScrolled || isMobileMenuOpen
          ? "bg-background/90 backdrop-blur-md shadow-md py-2 border-b-border"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 z-50 group" 
          aria-label="Home"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Code 
              className="text-neon group-hover:text-neon/80 transition-colors" 
              size={24} 
              aria-hidden="true" 
            />
          </motion.div>
          <span className="font-heading text-xl font-medium tracking-tight">
            <span className="text-neon group-hover:text-neon/80 transition-colors">Vikram</span> 
            <span className="group-hover:text-foreground/80 transition-colors"> Kumar</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav 
          className="hidden md:flex items-center space-x-6" 
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                "hover:text-neon/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50",
                location.pathname === item.path 
                  ? "text-neon" 
                  : "text-foreground/80 hover:text-foreground"
              )}
              aria-current={location.pathname === item.path ? "page" : undefined}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-neon rounded-full shadow-[0_0_8px_2px_rgba(110,231,183,0.5)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center z-50 space-x-2">
          {/* <MotionToggle /> */}
          <ThemeModeToggle />
          
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex gap-1.5 text-sm bg-transparent hover:bg-accent"
            asChild
          >
            <a
              href="/vikram-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (PDF)"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Button>
          
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-accent"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 md:hidden bg-background/95 backdrop-blur-lg"
            id="mobile-menu"
          >
            <nav 
              className="container mx-auto px-4 py-8 flex flex-col space-y-2 h-[calc(100vh-4rem)] overflow-y-auto"
              aria-label="Mobile Navigation"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "text-lg py-3 px-4 block rounded-lg transition-colors",
                      "hover:bg-accent focus:bg-accent focus:outline-none",
                      location.pathname === item.path
                        ? "text-gray-600 font-medium bg-accent"
                        : "text-foreground"
                    )}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="mobile-navbar-active"
                        className="h-0.5 w-4 bg-neon mt-1 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="pt-4 mt-4 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
              >
                <Button
                  variant="default"
                  className="w-full mt-4 bg-gradient-to-r from-neon to-lightpurple hover:from-neon/90 hover:to-lightpurple/90 text-midnight font-medium"
                  size="lg"
                  asChild
                >
                  <a
                    href="/vikram-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download Resume (PDF)"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;