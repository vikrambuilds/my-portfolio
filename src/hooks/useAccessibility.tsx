import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';

interface AccessibilityContextType {
  prefersReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check local storage first
    const savedPreference = localStorage.getItem('reduced-motion');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    
    // Otherwise check system preference
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    // Apply the class to the root element
    const htmlElement = document.documentElement;
    
    if (prefersReducedMotion) {
      htmlElement.classList.add('reduce-motion');
    } else {
      htmlElement.classList.remove('reduce-motion');
    }
    
    // Save to localStorage
    localStorage.setItem('reduced-motion', String(prefersReducedMotion));
  }, [prefersReducedMotion]);

  const toggleReducedMotion = () => {
    setPrefersReducedMotion((prev) => !prev);
  };

  return (
    <AccessibilityContext.Provider value={{ prefersReducedMotion, toggleReducedMotion }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return context;
};
