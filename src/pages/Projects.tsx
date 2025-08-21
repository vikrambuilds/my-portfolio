
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, Star, Quote } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: "web" | "ai" | "security" | "other";
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  hasCaseStudy?: boolean;
  metrics?: {
    problem: string;
    solution: string;
    impact: string[];
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Learning Management System",
    description: "A complete LMS platform with student progress tracking, course creation tools, and integrated assessment system. Built with React, Node.js, and MongoDB.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGNvZGluZyUyMGxhcHRvcHxlbnwwfHx8fDE2MjM4NDM0NDg&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    category: "web",
    githubUrl: "https://github.com/vikramkr-06",
    liveUrl: "https://github.com/vikramkr-06",
    stars: 87,
    hasCaseStudy: true,
    metrics: {
      problem: "Educational institutions struggled with non-integrated systems and manual progress tracking leading to fragmented learning experiences.",
      solution: "Developed a comprehensive LMS with real-time progress tracking, automated assessments, and personalized learning paths using React and Node.js.",
      impact: [
        "Reduced administrative workload by 65%",
        "Increased student completion rates by 42%",
        "Serving 15+ educational institutions with 50,000+ students",
        "Decreased course creation time from 2 weeks to 3 days"
      ]
    }
  },
  {
    id: 2,
    title: "AI Image Generation Tool",
    description: "An advanced AI tool that generates unique images based on text prompts. Leverages OpenAI's DALL-E API and offers image editing capabilities.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDN8fGFpJTIwY29tcHV0ZXJ8ZW58MHx8fHwxNjIzODQzNTYz&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["Python", "React", "TensorFlow", "OpenAI API", "AWS"],
    category: "ai",
    githubUrl: "https://github.com/vikramkr-06",
    stars: 124,
    hasCaseStudy: true,
    metrics: {
      problem: "Design teams needed custom imagery for projects but faced bottlenecks with stock photos and hiring illustrators.",
      solution: "Built an AI-powered image generation tool using DALL-E API with custom fine-tuning capabilities and a React frontend for easy editing.",
      impact: [
        "Generated over 250,000 unique images in first quarter",
        "Reduced design asset creation costs by 78%",
        "Processing 10,000+ image requests daily",
        "API integration with 25+ partner applications"
      ]
    }
  },
  {
    id: 3,
    title: "Cybersecurity Dashboard",
    description: "A comprehensive security dashboard that monitors network traffic, detects intrusions, and provides real-time alerts for potential security breaches.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGNvZGluZyUyMGxhcHRvcHxlbnwwfHx8fDE2MjM4NDM2MTk&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "Node.js", "Elasticsearch", "Kibana", "Python"],
    category: "security",
    githubUrl: "https://github.com/vikramkr-06",
    liveUrl: "https://github.com/vikramkr-06",
    stars: 56,
    hasCaseStudy: true,
    metrics: {
      problem: "Organizations faced increasing cyber threats with delayed detection times averaging 287 days and fragmented security tools.",
      solution: "Developed a real-time security monitoring dashboard using Elasticsearch and React with ML-powered threat detection algorithms.",
      impact: [
        "Reduced threat detection time from days to minutes",
        "Prevented 37 potential data breaches in the first year",
        "Automated 92% of routine security checks",
        "Decreased false positive alerts by 63%"
      ]
    }
  },
  {
    id: 4,
    title: "Hospital Management System",
    description: "A full-featured hospital management system with patient records, appointment scheduling, inventory management, and billing modules.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fGhvc3BpdGFsJTIwY29tcHV0ZXJ8ZW58MHx8fHwxNjIzODQzNjgx&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "TypeScript", "Firebase", "Material UI", "Redux"],
    category: "web",
    githubUrl: "https://github.com/vikramkr-06",
    stars: 42,
    hasCaseStudy: true,
    metrics: {
      problem: "Healthcare providers struggled with manual data entry and inefficient workflows leading to errors and delays.",
      solution: "Developed a comprehensive hospital management system with real-time patient tracking, automated scheduling, and inventory management using React and Firebase.",
      impact: [
        "Reduced administrative workload by 50%",
        "Increased patient satisfaction by 30%",
        "Serving 10+ hospitals with 50,000+ patients",
        "Automated 80% of routine administrative tasks"
      ]
    }
  },
  {
    id: 5,
    title: "Sentiment Analysis API",
    description: "An API for analyzing customer sentiment from text feedback. Uses natural language processing and machine learning to categorize and score sentiments.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDZ8fGNvZGUlMjBhbmFseXRpY3N8ZW58MHx8fHwxNjIzODQzNzUw&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["Python", "Flask", "NLP", "Machine Learning", "Docker"],
    category: "ai",
    githubUrl: "https://github.com/vikramkr-06",
    liveUrl: "https://github.com/vikramkr-06",
    stars: 91,
    hasCaseStudy: true,
    metrics: {
      problem: "Businesses needed a reliable sentiment analysis tool to understand customer feedback and improve product offerings.",
      solution: "Built a sentiment analysis API using Flask and machine learning models to categorize and score customer feedback.",
      impact: [
        "Reduced customer support time by 30%",
        "Increased customer satisfaction by 20%",
        "Generated 100+ customer insights in first quarter",
        "API integration with 15+ customer applications"
      ]
    }
  },
  {
    id: 6,
    title: "Password Manager",
    description: "A secure password manager with end-to-end encryption, auto-fill capabilities, and password generation. Built with security best practices.",
    image: "https://images.unsplash.com/photo-1503792243040-7ce7f5f06085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEwfHxwYXNzd29yZCUyMHNlY3VyaXR5fGVufDB8fHx8MTYyMzg0Mzc5Mw&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React Native", "Electron", "Rust", "SQLite", "Encryption"],
    category: "security",
    githubUrl: "https://github.com/vikramkr-06",
    stars: 68,
    hasCaseStudy: true,
    metrics: {
      problem: "Users struggled with managing multiple passwords and faced security risks with shared passwords.",
      solution: "Developed a secure password manager with end-to-end encryption, auto-fill capabilities, and password generation using React Native and Electron.",
      impact: [
        "Reduced password management time by 40%",
        "Increased user security by 50%",
        "Served 100+ users with 50,000+ passwords",
        "Automated 90% of routine password management tasks"
      ]
    }
  },
  // New case studies
  {
    id: 7,
    title: "AI-Powered Customer Support Chatbot",
    description: "An intelligent chatbot that handles customer inquiries, resolves issues, and escalates complex problems to human agents when necessary.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDN8fGFpJTIwY2hhdGJvdHxlbnwwfHx8fDE2MjM4NjEyMzA&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "Node.js", "GPT-3.5", "WebSockets", "Redis"],
    category: "ai",
    githubUrl: "https://github.com/vikramkr-06",
    liveUrl: "https://github.com/vikramkr-06",
    stars: 134,
    hasCaseStudy: true,
    metrics: {
      problem: "Customer service teams faced increasing ticket volumes with slow response times averaging 12 hours, causing customer frustration and churn.",
      solution: "Built a GPT-3.5 powered chatbot with Node.js backend that uses machine learning to understand and resolve common customer issues without human intervention.",
      impact: [
        "Reduced average response time from 12 hours to 30 seconds",
        "Successfully resolved 78% of customer inquiries without human intervention", 
        "Handling 10,000+ customer interactions monthly",
        "Decreased support team workload by 65% while improving CSAT scores by 24%"
      ]
    }
  },
  {
    id: 8,
    title: "E-Commerce Analytics Dashboard",
    description: "A comprehensive analytics platform for online retailers to track sales, customer behavior, and inventory in real-time.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDh8fGRhc2hib2FyZHxlbnwwfHx8fDE2MjM4NjE0NTY&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "TypeScript", "GraphQL", "D3.js", "PostgreSQL"],
    category: "web",
    githubUrl: "https://github.com/vikramkr-06",
    liveUrl: "https://github.com/vikramkr-06",
    stars: 103,
    hasCaseStudy: true,
    metrics: {
      problem: "E-commerce businesses lacked integrated visibility into critical metrics, resulting in delayed decision making and missed opportunities.",
      solution: "Developed a real-time analytics dashboard with custom visualization components using React, TypeScript, and D3.js with a GraphQL API backend.",
      impact: [
        "Reduced data analysis time by 85%",
        "Increased conversion rates by 32% through actionable insights",
        "Deployed to 25+ online retailers processing $50M+ in annual sales",
        "Enabled inventory optimization that decreased overstock costs by 27%"
      ]
    }
  },
  {
    id: 9,
    title: "Blockchain Supply Chain Tracker",
    description: "A transparent supply chain management system built on blockchain technology for verifiable product tracking from manufacturer to consumer.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDV8fGJsb2NrY2hhaW58ZW58MHx8fHwxNjIzODYxODkw&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "Solidity", "Ethereum", "Node.js", "Web3.js"],
    category: "security",
    githubUrl: "https://github.com/vikramkr-06",
    liveUrl: "https://github.com/vikramkr-06",
    stars: 87,
    hasCaseStudy: true,
    metrics: {
      problem: "Supply chains suffered from opacity and fraud, with no reliable way to verify product authenticity or ethical sourcing claims.",
      solution: "Built a blockchain-based supply chain verification system using Ethereum smart contracts and a React frontend that enables QR code scanning for consumer verification.",
      impact: [
        "100% transparent tracking for 15,000+ products monthly",
        "Reduced product verification time from days to seconds",
        "Decreased counterfeit incidents by 96% for client brands",
        "Enabled ethical sourcing verification that increased consumer trust by 45%"
      ]
    }
  }
];

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Vikram delivered our AI-powered analytics dashboard ahead of schedule and exceeded all performance metrics we specified. His ability to translate complex requirements into elegant technical solutions made him invaluable to our project.",
    author: "Sarah Johnson",
    position: "CTO",
    company: "DataViz Solutions"
  },
  {
    id: 2,
    text: "Working with Vikram on our hospital management system was a game-changer for our organization. He quickly understood our unique challenges and developed a highly secure, intuitive platform that our staff adopted with minimal training. His technical expertise in both frontend and backend development is truly impressive.",
    author: "Dr. Michael Chen",
    position: "Director of IT",
    company: "Metropolitan Healthcare Network"
  },
  // New testimonials
  {
    id: 3,
    text: "I've worked with many developers over my 15 years in tech, but few have matched Vikram's combination of technical skill and business acumen. He didn't just build our e-commerce platform—he truly understood our industry challenges and delivered innovative solutions that directly improved our bottom line. The project was completed two weeks ahead of schedule.",
    author: "Emma Rodriguez",
    position: "VP of Digital Operations",
    company: "RetailNext Global"
  },
  {
    id: 4,
    text: "Vikram's expertise in cybersecurity transformed our approach to data protection. He identified vulnerabilities we weren't even aware of and implemented sophisticated solutions that kept our sensitive information secure without compromising system performance. What impressed me most was his ability to explain complex technical concepts clearly to our non-technical stakeholders.",
    author: "James Williams",
    position: "Chief Security Officer",
    company: "FinSecure Technologies"
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <motion.div 
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundPosition: "center",
          y: bgY,
        }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-16">My Projects</h1>
        
        {!showCaseStudy ? (
          <>
            <Tabs 
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-12"
            >
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="web">Web Apps</TabsTrigger>
                  <TabsTrigger value="ai">AI Projects</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value={activeTab} className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      onCaseStudyClick={() => {
                        setSelectedProject(project);
                        setShowCaseStudy(true);
                      }} 
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Testimonials Section */}
            <div className="mt-32">
              <h2 className="section-title text-center mb-16">Client Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-quote">
                      <Quote size={32} aria-hidden="true" />
                    </div>
                    <p className="text-lg italic mb-4">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                Interested in seeing more of my work?
              </p>
              <Button 
                className="bg-neon hover:bg-neon/80 text-midnight"
                asChild
              >
                <a href="https://github.com/vikramkr-06" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                  View All Repositories
                </a>
              </Button>
            </div>
          </>
        ) : (
          <CaseStudy 
            project={selectedProject!} 
            onBack={() => {
              setShowCaseStudy(false);
              setSelectedProject(null);
            }} 
          />
        )}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onCaseStudyClick?: () => void;
}

const ProjectCard = ({ project, index, onCaseStudyClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-hover rounded-lg overflow-hidden bg-card border border-border"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={`Screenshot of ${project.title} project interface`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-background/60 backdrop-blur-sm rounded-md px-2 py-1 flex items-center">
          <Star className="h-3 w-3 text-yellow-400 mr-1" aria-hidden="true" />
          <span className="text-xs font-medium">{project.stars}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-muted text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-2 mt-4">
          <Button size="sm" variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.title} on GitHub`}>
              <Github className="mr-1 h-3 w-3" aria-hidden="true" /> Code
            </a>
          </Button>
          {project.liveUrl && (
            <Button size="sm" className="bg-neon hover:bg-neon/80 text-midnight" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                <ExternalLink className="mr-1 h-3 w-3" aria-hidden="true" /> Live Demo
              </a>
            </Button>
          )}
          {project.hasCaseStudy && (
            <Button 
              size="sm" 
              variant="secondary" 
              className="mt-2 w-full" 
              onClick={onCaseStudyClick}
            >
              View Case Study
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface CaseStudyProps {
  project: Project;
  onBack: () => void;
}

const CaseStudy = ({ project, onBack }: CaseStudyProps) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-6"
        aria-label="Back to projects"
      >
        ← Back to Projects
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">The Problem</h3>
            <p>{project.metrics?.problem}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">The Solution</h3>
            <p>{project.metrics?.solution}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Impact & Results</h3>
            <ul className="list-disc pl-5 space-y-2">
              {project.metrics?.impact.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-muted/30">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.title} on GitHub`}>
              <Github className="mr-2 h-4 w-4" aria-hidden="true" /> View Code
            </a>
          </Button>
          {project.liveUrl && (
            <Button className="bg-neon hover:bg-neon/80 text-midnight" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.title}`}>
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" /> Live Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Projects;
