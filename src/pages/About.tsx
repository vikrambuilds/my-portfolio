import { useEffect, useRef } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../components/ui/button";
import { Download, ArrowRight, Code, Cpu, Shield } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const isInView = useInView(timelineRef, { once: true, amount: 0.3 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });

  // GSAP animations with cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation with parallax effect
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        x: -80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      });

      // Text animation with staggered children
      gsap.from(textRef.current?.children || [], {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        },
      });

      // Background glow animation
      gsap.to(imageRef.current?.querySelector(".glow-effect") || null, {
        opacity: 0.8,
        scale: 1.02,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  // Skills animation
  useEffect(() => {
    if (isSkillsInView) {
      controls.start("visible");
    }
  }, [isSkillsInView, controls]);

  const timeline = [
    {
      year: "2026",
      title: "Full Stack Developer Internship",
      description: "Developed enterprise applications using React, Node.js, and AWS.",
      icon: <Code className="h-5 w-5" />
    },
    {
      year: "2025",
      title: "Engineering Leadership Program",
      description: "Selected among top 2% of students for advanced technical leadership training.",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      year: "2024",
      title: "Started Computer Science Degree",
      description: "Specializing in Cybersecurity and AI at premier engineering institute.",
      icon: <Shield className="h-5 w-5" />
    },
    {
      year: "2024",
      title: "First Major Project",
      description: "Built a full-stack e-learning platform with React and Firebase.",
      icon: <Code className="h-5 w-5" />
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-neon"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1,
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-neon">Me</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative" ref={imageRef}>
            <div className="glow-effect absolute -inset-4 rounded-2xl bg-gradient-to-br from-neon/30 to-lightpurple/20 blur-xl opacity-70"></div>
            <motion.div
              className="rounded-xl overflow-hidden shadow-2xl relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGRldmVsb3BlciUyMGluZGlhbnxlbnwwfHx8fDE2MjY4MDYyMDZ8MA&ixlib=rb-4.0.3&q=80&w=800"
                alt="Vikram Kumar"
                className="w-full h-[500px] object-cover aspect-square transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </motion.div>
          </div>
          
          <div ref={textRef} className="space-y-6">
            <motion.h2 className="text-3xl md:text-4xl font-heading leading-tight">
              I'm a <span className="text-neon">Full Stack Developer</span> and <span className="text-lightpurple">Security Enthusiast</span>
            </motion.h2>
            
            <motion.p className="text-muted-foreground text-lg leading-relaxed">
              Currently based in Bangalore, India, I'm pursuing my Bachelor's in Computer Science with 
              specialized focus on <span className="text-neon">cybersecurity</span> and <span className="text-lightpurple">artificial intelligence</span>.
            </motion.p>
            
            <motion.p className="text-muted-foreground text-lg leading-relaxed">
              My journey began at 15 when I built my first website, sparking a passion that led me to 
              develop complex, <span className="text-neon">user-centric applications</span> using modern stacks like React, Node.js, 
              and TypeScript.
            </motion.p>
            
            <motion.p className="text-muted-foreground text-lg leading-relaxed">
              Beyond coding, I actively contribute to <span className="text-lightpurple">open-source</span>, participate in hackathons, 
              and explore cutting-edge <span className="text-neon">AI research</span>. I believe in technology's power to create 
              meaningful impact.
            </motion.p>
            
            <motion.div className="flex flex-wrap gap-4 mt-8">
              <Button 
                className="group bg-gradient-to-r from-neon to-lightpurple hover:from-neon/90 hover:to-lightpurple/90 text-midnight shadow-lg shadow-neon/20"
                size="lg"
                asChild
              >
                <a href="/vikram-resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="border-neon text-neon hover:bg-neon/10 hover:text-neon"
                size="lg"
                asChild
              >
                <Link to="/contact">
                  Contact Me
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-24">
          <h2 className="section-title text-center mb-16">My <span className="text-neon">Journey</span></h2>
          
          <div ref={timelineRef} className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon/20 via-neon to-neon/20 z-0"></div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="space-y-12 relative z-10"
            >
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="relative pl-20 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="absolute left-5 top-1 w-6 h-6 rounded-full bg-background border-2 border-neon flex items-center justify-center text-neon">
                    {item.icon}
                  </div>
                  <div className="absolute left-[16px] top-0 w-8 h-8 rounded-full bg-neon/10 animate-pulse group-hover:bg-neon/20 transition-colors"></div>
                  <span className="inline-block py-1 px-3 rounded-full bg-muted text-sm mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;