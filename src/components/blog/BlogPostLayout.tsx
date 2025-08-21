
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { blogPosts } from "../../data/blogPosts";
import { motion } from "framer-motion";

const BlogPostLayout = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find((post) => post.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-16 container mx-auto px-4 text-center">
        <h1 className="text-3xl font-heading mb-6">Blog Post Not Found</h1>
        <p className="mb-8 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-16"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Button>
        
        <div className="relative h-80 rounded-xl overflow-hidden mb-8">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
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
        
        <h1 className="text-4xl md:text-5xl font-heading mb-6">{post.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-muted/50 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          {/* In a real app, this would be rich text or markdown */}
          <p className="text-lg text-muted-foreground mb-6">{post.summary}</p>
          <p className="mb-4">{post.content}</p>
          <p className="mb-4">This is where the full blog content would go. In a real application, you might use Markdown or a rich text editor to allow formatting of the blog content.</p>
          <p className="mb-4">You could integrate a library like react-markdown to render formatted content, or use a headless CMS to manage your blog posts.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostLayout;
