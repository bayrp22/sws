import { useState, useEffect, useRef } from 'react';

interface UseSequentialAnimationOptions {
  /** Array of delay times in milliseconds for each animation stage */
  delays?: number[];
  /** Whether to start the animation immediately on mount */
  autoStart?: boolean;
}

/**
 * Hook for creating sequential load-in animations across pages
 * Based on the animation system from the home page HeroSection
 */
export const useSequentialAnimation = (options: UseSequentialAnimationOptions = {}) => {
  const {
    delays = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800],
    autoStart = true
  } = options;

  const [animationStage, setAnimationStage] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const startAnimation = () => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    // Reset animation stage
    setAnimationStage(0);

    // Set up animation sequence
    delays.forEach((delay, index) => {
      const timeout = setTimeout(() => setAnimationStage(index + 1), delay);
      timeoutsRef.current.push(timeout);
    });
  };

  const resetAnimation = () => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
    setAnimationStage(0);
  };

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  /**
   * Helper function to get visibility class for a specific stage
   * @param stage - The stage number this element should appear at
   * @returns 'visible' if the current animation stage is >= the target stage
   */
  const getVisibilityClass = (stage: number): string => {
    return animationStage >= stage ? 'visible' : '';
  };

  /**
   * Helper function to get full animation class string
   * @param stage - The stage number this element should appear at
   * @param animationClass - The base animation class (e.g., 'animate-fade-in-up')
   * @returns Full class string with visibility
   */
  const getAnimationClass = (stage: number, animationClass: string): string => {
    return `${animationClass} ${getVisibilityClass(stage)}`;
  };

  return {
    animationStage,
    startAnimation,
    resetAnimation,
    getVisibilityClass,
    getAnimationClass,
    isVisible: (stage: number) => animationStage >= stage
  };
}; 