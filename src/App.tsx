
import React from 'react';
import {Toaster} from "react-hot-toast"
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from './components/theme-provider';
import { AccessibilityProvider } from './hooks/useAccessibility';
import SEO from "./components/SEO";
import BackToTop from "./components/BackToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BlogPostLayout from "./components/blog/BlogPostLayout";

// Layout
import Layout from "./components/layout/Layout";

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <AccessibilityProvider>
            <TooltipProvider>
              <SEO />
              <Toaster position='top-center' />
              <BrowserRouter>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPostLayout />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </AnimatePresence>
              </BrowserRouter>
              <BackToTop />
            </TooltipProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

export default App
