import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { useTheme } from "../components/theme-provider";

const Home = () => {
  const threeCanvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const controls = useAnimationControls();
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);

  // Initialize Three.js scene with better particles and lighting
  useEffect(() => {
    if (!threeCanvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeCanvasRef.current.innerHTML = '';
    threeCanvasRef.current.appendChild(renderer.domElement);

    // Enhanced particles with varying sizes and colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 3000;
    
    const posArray = new Float32Array(particlesCnt * 3);
    const sizeArray = new Float32Array(particlesCnt);
    const colorArray = new Float32Array(particlesCnt * 3);
    
    for (let i = 0; i < particlesCnt; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      sizeArray[i] = Math.random() * 0.05 + 0.01;
      
      // Color variation based on theme
      const hue = theme === 'dark' ? 0.5 : 0.6;
      colorArray[i * 3] = hue;
      colorArray[i * 3 + 1] = 1;
      colorArray[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;

    // Enhanced sphere with shader material
    const sphereGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x00FFFF : 0x0088FF,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;

    camera.position.z = 4;

    // Handle resizing with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);

    // Enhanced animation loop with delta time
    let lastTime = 0;
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.0002;
        particlesRef.current.rotation.x += delta * 0.0001;
      }
      
      if (sphereRef.current) {
        sphereRef.current.rotation.y += delta * 0.0003;
        if (isHovered) {
          sphereRef.current.rotation.x += delta * 0.0002;
        }
      }
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      
      // Explicit cleanup of Three.js objects
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      
      if (threeCanvasRef.current) {
        threeCanvasRef.current.innerHTML = '';
      }
    };
  }, [theme]);

  // Text animation sequence
  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  // Mouse move interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sphereRef.current) return;
      
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      sphereRef.current.position.x = x * 0.5;
      sphereRef.current.position.y = y * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/90 to-background/70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas */}
      <div 
        ref={threeCanvasRef}
        className="absolute inset-0 z-0 opacity-70"
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-20 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-start max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
            }}
            className="text-neon mb-4 font-mono text-sm md:text-base"
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100
                } 
              }
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-neon to-lightpurple bg-clip-text text-transparent"
          >
            Vikram Kumar
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100
                } 
              }
            }}
            className="text-2xl md:text-4xl lg:text-5xl text-muted-foreground mb-6"
          >
            I build <span className="text-neon">exceptional</span> digital experiences.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.5 } }
            }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed"
          >
            I'm a full-stack developer specializing in building secure, responsive, and 
            user-focused applications. Currently focused on <span className="text-neon">cybersecurity</span>, 
            <span className="text-lightpurple"> AI integration</span>, and cutting-edge <span className="text-neon">React ecosystems</span>.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.6 } }
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-neon to-lightpurple hover:from-neon/90 hover:to-lightpurple/90 text-midnight font-medium shadow-lg shadow-neon/20"
              asChild
            >
              <Link to="/projects">
                View My Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-neon text-neon hover:bg-neon/10 hover:text-neon font-medium"
              asChild
            >
              <Link to="/contact">Contact Me</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-foreground hover:bg-accent/50"
              asChild
            >
              <a 
                href="/vikram-resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4 mr-2" />
                Resume
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.7 } }
            }}
            className="mt-12 md:mt-16"
          >
            <div className="flex items-center space-x-6">
              {[
                { icon: <Github size={24} />, href: "https://github.com/vikramkr-06", label: "GitHub" },
                { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/vikram-kumar-5831a9343", label: "LinkedIn" },
                { icon: <Mail size={24} />, href: "mailto:contact@vikramkumar.dev", label: "Email" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-neon transition-all"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
              <div className="h-[1px] w-24 bg-gradient-to-r from-muted to-transparent"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <motion.span 
              className="text-xs text-muted-foreground mb-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Scroll Down
            </motion.span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border border-neon/30 flex justify-center items-start pt-2"
            >
              <motion.div
                animate={{ 
                  height: [6, 12, 6],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="w-1 bg-gradient-to-b from-neon to-lightpurple rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;