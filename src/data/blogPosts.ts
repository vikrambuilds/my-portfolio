
export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: "tech" | "college" | "projects";
  image: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Secure React Applications",
    summary: "Learn how to implement security best practices in your React applications to protect against common vulnerabilities.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl.",
    date: "2026-04-10",
    readTime: "8 min",
    category: "tech",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDV8fHRlY2h8ZW58MHx8fHwxNjIzODQ0MjYx&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "Security", "Web Development"],
    slug: "building-secure-react-applications"
  },
  {
    id: 2,
    title: "My Experience at the National Hackathon",
    summary: "A recap of my team's journey building an AI-powered solution for healthcare at the national hackathon.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl.",
    date: "2025-04-22",
    readTime: "5 min",
    category: "college",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEyfHxoYWNrYXRob258ZW58MHx8fHwxNjIzODQ0MzAw&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["Hackathon", "College", "Team Project"],
    slug: "my-experience-at-the-national-hackathon"
  },
  {
    id: 3,
    title: "Building a Full-Stack E-Learning Platform",
    summary: "How I designed and implemented a full-stack e-learning platform using React, Node.js, and MongoDB.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl.",
    date: "2026-03-15",
    readTime: "10 min",
    category: "projects",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDd8fGUtbGVhcm5pbmd8ZW58MHx8fHwxNjIzODQ0MzMy&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["React", "Node.js", "MongoDB", "Full Stack"],
    slug: "building-a-full-stack-e-learning-platform"
  },
  {
    id: 4,
    title: "The Rise of AI in Modern Web Applications",
    summary: "Examining how AI and machine learning are transforming the way we build and interact with web applications.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl.",
    date: "2024-02-28",
    readTime: "7 min",
    category: "tech",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDN8fGFpfGVufDB8fHx8MTYyMzg0NDM2Mw&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["AI", "Machine Learning", "Web Development"],
    slug: "the-rise-of-ai-in-modern-web-applications"
  },
  {
    id: 5,
    title: "Balancing Engineering Studies and Coding Projects",
    summary: "Tips and strategies for managing academic responsibilities while pursuing personal coding projects.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl.",
    date: "2025-01-17",
    readTime: "6 min",
    category: "college",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fHN0dWR5JTIwY29tcHV0ZXJ8ZW58MHx8fHwxNjIzODQ0Mzk1&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["College", "Time Management", "Personal Growth"],
    slug: "balancing-engineering-studies-and-coding-projects"
  },
  {
    id: 6,
    title: "Creating a Secure Password Manager",
    summary: "A deep dive into the architecture and security considerations of building a password manager application.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl. Sed euismod, diam quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl vitae nisl.",
    date: "2024-12-10",
    readTime: "9 min",
    category: "projects",
    image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDh8fHBhc3N3b3JkfGVufDB8fHx8MTYyMzg0NDQ0Mg&ixlib=rb-4.0.3&q=80&w=800",
    tags: ["Security", "Encryption", "React Native", "Electron"],
    slug: "creating-a-secure-password-manager"
  },
];
