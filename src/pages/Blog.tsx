
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import BlogCard from "../components/blog/BlogCard";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredPosts = blogPosts
    .filter(post => 
      activeTab === "all" || post.category === activeTab
    )
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-16">Blog & Insights</h1>
        
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search posts by title, tag, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Tabs 
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-10"
        >
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="college">College</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-10">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl mb-2">No posts found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Blog;
