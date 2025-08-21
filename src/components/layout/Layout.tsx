import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "../animations/PageTransition";
import LoadingScreen from "../animations/LoadingScreen";
import EasterEgg from "../utils/EasterEgg";

const VISITED_KEY = "hasVisited";
const LOADING_DURATION = 4000;

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Memoized loading state handler
  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    sessionStorage.setItem(VISITED_KEY, "true");
  }, []);

  // Simulated loading for first visit
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const hasVisited = sessionStorage.getItem(VISITED_KEY);

    if (!hasVisited) {
      timer = setTimeout(handleLoadingComplete, LOADING_DURATION);
    } else {
      handleLoadingComplete();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [handleLoadingComplete]);

  // Scroll to top on route change
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, loading]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <main className="flex-grow">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </main>
          <Footer />
          <EasterEgg />
        </>
      )}
    </div>
  );
};

export default Layout;