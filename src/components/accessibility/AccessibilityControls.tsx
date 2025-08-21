
import React from 'react';
import ThemeToggle from './ThemeToggle';
import MotionToggle from './MotionToggle';

interface AccessibilityControlsProps {
  className?: string;
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <ThemeToggle />
      <MotionToggle />
    </div>
  );
};

export default AccessibilityControls;
