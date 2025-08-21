import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Database,
  Layout,
  Cpu,
  Server,
  Wrench,
  Cloud,
  Lock
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "other";
  icon?: React.ReactNode;
}

const skills: Skill[] = [
  // Frontend
  { name: "React & React Native", level: 90, category: "frontend", icon: <Layout aria-hidden="true" /> },
  { name: "TypeScript", level: 85, category: "frontend", icon: <Code aria-hidden="true" /> },
  { name: "Redux", level: 80, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "HTML5/CSS3", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "GSAP/Framer Motion", level: 75, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 85, category: "backend", icon: <Server aria-hidden="true" /> },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "MongoDB", level: 75, category: "backend", icon: <Database aria-hidden="true" /> },
  { name: "PostgreSQL", level: 70, category: "backend" },
  { name: "Firebase", level: 85, category: "backend" },
  { name: "REST API Design", level: 90, category: "backend" },
  { name: "GraphQL", level: 65, category: "backend" },
  
  // Tools
  { name: "Git & GitHub", level: 90, category: "tools", icon: <Wrench aria-hidden="true" /> },
  { name: "Docker", level: 70, category: "tools" },
  { name: "AWS", level: 65, category: "tools", icon: <Cloud aria-hidden="true" /> },
  { name: "CI/CD Pipelines", level: 70, category: "tools" },
  { name: "Jest/Testing Library", level: 75, category: "tools" },
  { name: "Webpack/Vite", level: 80, category: "tools" },
  
  // Other
  { name: "Cybersecurity", level: 75, category: "other", icon: <Lock aria-hidden="true" /> },
  { name: "Machine Learning", level: 60, category: "other", icon: <Cpu aria-hidden="true" /> },
  { name: "UI/UX Design", level: 80, category: "other" },
  { name: "Agile Methodology", level: 85, category: "other" },
];

// Group skills by category
const frontendSkills = skills.filter(skill => skill.category === "frontend");
const backendSkills = skills.filter(skill => skill.category === "backend");
const toolsSkills = skills.filter(skill => skill.category === "tools");
const otherSkills = skills.filter(skill => skill.category === "other");

const Skills = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-16">My Skills</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <SkillCategory title="Frontend Development" skills={frontendSkills} icon={<Layout className="text-neon" size={24} aria-hidden="true" />} />
          <SkillCategory title="Backend Development" skills={backendSkills} icon={<Server className="text-neon" size={24} aria-hidden="true" />} />
          <SkillCategory title="Tools & DevOps" skills={toolsSkills} icon={<Wrench className="text-neon" size={24} aria-hidden="true" />} />
          <SkillCategory title="Other Skills" skills={otherSkills} icon={<Cpu className="text-neon" size={24} aria-hidden="true" />} />
        </div>
        
        <div className="mt-20">
          <h2 className="text-2xl font-heading text-center mb-8">Tech Stack Experience</h2>
          <TechStack />
        </div>
      </div>
    </div>
  );
};

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon: React.ReactNode;
}

const SkillCategory = ({ title, skills, icon }: SkillCategoryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <div ref={ref} className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <div className="mr-3 p-2 rounded-md bg-muted">{icon}</div>
        <h2 className="text-xl font-heading">{title}</h2>
      </div>
      
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{skill.name}</span>
              <span className="text-xs text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <motion.div 
                className="skill-progress"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                aria-label={`${skill.name}: ${skill.level}%`}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechStack = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(animationRef, { once: true, amount: 0.1 });

  const techIcons = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "AWS", icon: "https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_aws.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div ref={animationRef} className="py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8"
      >
        {techIcons.map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-card rounded-lg p-3 shadow-lg mb-3">
              <img 
                src={tech.icon} 
                alt={`${tech.name} framework or technology logo`} 
                className="w-full h-full object-contain" 
                loading="lazy" 
              />
            </div>
            <span className="text-sm text-center">{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
