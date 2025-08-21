
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "../../data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col md:flex-row gap-6 border-b border-border pb-10"
    >
      <div className="w-full md:w-1/3">
        <Link to={`/blog/${post.slug}`} className="block relative h-48 md:h-full rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>
      <div className="w-full md:w-2/3">
        <div className="flex gap-4 items-center mb-3">
          <Badge 
            variant="outline" 
            className={`
              ${post.category === "tech" ? "bg-blue-500/10 text-blue-500" : ""}
              ${post.category === "college" ? "bg-green-500/10 text-green-500" : ""}
              ${post.category === "projects" ? "bg-purple-500/10 text-purple-500" : ""}
            `}
          >
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </Badge>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>{formatDate(post.date)}</span>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-heading mb-3">
          <Link to={`/blog/${post.slug}`} className="hover:text-neon transition-colors">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-muted-foreground mb-4">
          {post.summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-muted/50 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button
          variant="link"
          className="pl-0 text-neon hover:text-neon/80"
          asChild
        >
          <Link to={`/blog/${post.slug}`}>Read Article</Link>
        </Button>
      </div>
    </motion.article>
  );
};

export default BlogCard;