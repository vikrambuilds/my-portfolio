import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "../../lib/utils";
import type { Variants } from "framer-motion";

const socialLinks = [
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/vikramkr-06",
    label: "GitHub"
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/vikram-kumar-5831a9343",
    label: "LinkedIn"
  },
  {
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:contact@vikramkumar.dev",
    label: "Email"
  }
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" }
];

const moreLinks = [
  { name: "Blog", path: "/blog" },
  { name: "Experience", path: "/experience" },
  { name: "Skills", path: "/skills" },
  { 
    name: "Resume", 
    path: "./vikram-resume.pdf",
    external: true 
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants : Variants  = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-card text-card-foreground border-t border-border py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Bio Section */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="font-heading text-2xl mb-4 bg-gradient-to-r from-neon to-lightpurple bg-clip-text text-transparent">
              Vikram Kumar
            </h3>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Full Stack Developer and Engineering Student passionate about building 
              innovative web applications, cybersecurity solutions, and AI-powered tools.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-accent/50 hover:text-neon transition-all"
                    aria-label={link.label}
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                    </a>
                  </Button>
                </motion.div>
              ))}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="ml-2 gap-1.5 rounded-full hover:bg-neon hover:text-midnight"
                >
                  <a
                    href="/vikram-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to={link.path}
                    className={cn(
                      "text-muted-foreground hover:text-neon transition-colors",
                      "flex items-center group"
                    )}
                  >
                    <span className="w-2 h-2 bg-neon rounded-full opacity-0 mr-2 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* More Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-medium text-lg mb-4">More Info</h4>
            <nav className="flex flex-col space-y-3">
              {moreLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-muted-foreground hover:text-neon transition-colors",
                        "flex items-center group"
                      )}
                    >
                      <span className="w-2 h-2 bg-neon rounded-full opacity-0 mr-2 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path}
                      className={cn(
                        "text-muted-foreground hover:text-neon transition-colors",
                        "flex items-center group"
                      )}
                    >
                      <span className="w-2 h-2 bg-neon rounded-full opacity-0 mr-2 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Vikram Kumar. All rights reserved.
          </p>
          <div className="flex items-center mt-3 md:mt-0">
            <p className="text-sm text-muted-foreground mr-2">
              Crafted with
            </p>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-red-500"
            >
              ❤️
            </motion.div>
            <p className="text-sm text-muted-foreground ml-2">
              by Vikram Kumar
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;