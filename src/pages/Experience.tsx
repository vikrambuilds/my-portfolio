import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building, Award, Briefcase, Calendar, Star } from "lucide-react";
import { Badge } from "../components/ui/badge";
import React from "react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  title: string;
  company?: string;
  location?: string;
  date: string;
  description: string;
  skills?: string[];
  type: "work" | "education" | "achievement";
  icon: React.ReactNode;
}

const experienceItems: ExperienceItem[] = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "TechInnovate Solutions",
    location: "Bangalore, India",
    date: "April 2026 - Present",
    description: "Developing and maintaining front-end and back-end components for enterprise-level applications. Implementing new features, fixing bugs, and writing unit tests. Collaborating with UX designers to implement responsive UI designs.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    type: "work",
    icon: <Briefcase />,
  },
  {
    id: 2,
    title: "B.Tech in Computer Science",
    company: "Indian Institute of Technology",
    location: "Delhi, India",
    date: "2024 - 2026",
    description: "Specializing in Cybersecurity and AI/ML applications. Maintaining a 3.8/4.0 GPA with a focus on advanced algorithm design, secure systems architecture, and machine learning.",
    skills: ["Data Structures", "Algorithms", "Cybersecurity", "AI/ML", "System Design"],
    type: "education",
    icon: <Building />,
  },
  {
    id: 3,
    title: "Frontend Developer (Part-time)",
    company: "WebVision Designs",
    location: "Remote",
    date: "January 2025 - May 2025",
    description: "Designed and implemented responsive front-end components for client websites. Worked with the design team to transform mockups into functional UI elements. Optimized site performance and accessibility.",
    skills: ["React", "CSS/SCSS", "Next.js", "Responsive Design", "Performance Optimization"],
    type: "work",
    icon: <Briefcase />,
  },
  {
    id: 4,
    title: "National Hackathon Winner",
    company: "TechFest 2024",
    location: "Mumbai, India",
    date: "October 2025",
    description: "Led a team of 4 to develop an AI-powered health monitoring solution that won first place among 200+ teams. The solution used computer vision to detect early symptoms of certain conditions through facial analysis.",
    skills: ["AI", "Python", "OpenCV", "TensorFlow", "Team Leadership"],
    type: "achievement",
    icon: <Award />,
  },
  {
    id: 5,
    title: "Open Source Contributor",
    company: "Various Projects",
    location: "Remote",
    date: "2024 - Present",
    description: "Active contributor to several open-source projects including React component libraries and Node.js utilities. Implemented new features, fixed bugs, and improved documentation for community projects.",
    skills: ["Git", "Open Source", "JavaScript", "Documentation", "Community Engagement"],
    type: "achievement",
    icon: <Star />,
  },
  {
    id: 6,
    title: "Computer Science Fundamentals",
    company: "Online Learning Platforms",
    location: "Self-paced",
    date: "2025 - 2026",
    description: "Completed coursework in computer science fundamentals prior to university. Studied programming basics, web development, and introductory algorithms through platforms like Coursera, edX, and freeCodeCamp.",
    skills: ["JavaScript", "Python", "HTML/CSS", "Algorithms", "Problem Solving"],
    type: "education",
    icon: <Building />,
  },
];

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 });

  // GSAP animation for timeline
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const timeline = timelineRef.current;
    const timelineItems = timeline.querySelectorAll(".timeline-item");
    
    gsap.fromTo(
      timelineItems,
      { 
        opacity: 0, 
        x: (index) => index % 2 === 0 ? -50 : 50,
      },
      { 
        opacity: 1, 
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timeline,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-16">Experience & Achievements</h1>
        
        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
          
          {experienceItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`timeline-item flex justify-between items-start relative ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } mb-16`}
            >
              {/* Content */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "pl-8"}`}
              >
                <div className="mb-2 flex items-center justify-start gap-2 text-neon">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                
                {(item.company || item.location) && (
                  <div className="mb-3 text-muted-foreground">
                    {item.company && <span>{item.company}</span>}
                    {item.company && item.location && <span> • </span>}
                    {item.location && <span>{item.location}</span>}
                  </div>
                )}
                
                <p className="text-muted-foreground mb-4">{item.description}</p>
                
                {item.skills && (
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
              
              {/* Center dot */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center 
                  ${item.type === "work" ? "bg-blue-500/20" : ""}
                  ${item.type === "education" ? "bg-green-500/20" : ""}
                  ${item.type === "achievement" ? "bg-purple-500/20" : ""}
                `}>
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    
                  })}
                </div>
              </div>
              
              {/* Empty space to balance layout */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mt-28">
          <h2 className="text-2xl font-heading text-center mb-12">Testimonials</h2>
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "Vikram is an exceptional problem-solver with a keen eye for detail. His contributions to our team were invaluable, and his ability to learn new technologies quickly is remarkable.",
      author: "Priya Sharma",
      role: "Lead Developer at TechInnovate Solutions",
      avatar: "https://i.pravatar.cc/100?img=26",
    },
    {
      id: 2,
      text: "Working with Vikram was a pleasure. His technical skills combined with his collaborative approach made complex projects run smoothly. He consistently delivered high-quality code on time.",
      author: "Rajesh Patel",
      role: "Project Manager at WebVision Designs",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 3,
      text: "Vikram's innovative thinking and dedication to quality set him apart. He not only identifies problems but comes up with elegant solutions that improve the entire system.",
      author: "Aisha Khan",
      role: "CEO of StartTech Ventures",
      avatar: "https://i.pravatar.cc/100?img=44",
    },
  ];

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(testimonialsRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div ref={testimonialsRef}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={itemVariants}
            className="bg-card rounded-lg p-6 border border-border relative"
          >
            <div className="absolute -top-5 left-6">
              <div className="w-10 h-10 rounded-full overflow-hidden border-4 border-background">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <p className="italic text-muted-foreground mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div>
                  <h3 className="font-medium">{testimonial.author}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Experience;
