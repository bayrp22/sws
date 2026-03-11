import React from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

interface ResponsiveNavigationProps {
  variant?: 'hero' | 'page';
  animationStage?: number;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({ variant = 'hero', animationStage = 10 }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <Navigation variant={variant} animationStage={animationStage} />
      
      {/* Mobile/Tablet Navigation */}
      <MobileNavigation variant={variant} animationStage={animationStage} />
    </>
  );
};

export default ResponsiveNavigation; 