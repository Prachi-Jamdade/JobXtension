"use client";

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ 
  value, 
  duration = 1500,
  className = "text-2xl font-bold"
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Store the previous value before updating
    previousValue.current = displayValue;
    
    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Start a new animation
    startTimeRef.current = null;
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate the current value using easeOutExpo for a nice effect
      const easeOutExpo = (t: number) => (t === 1) ? 1 : 1 - Math.pow(2, -10 * t);
      const easedProgress = easeOutExpo(progress);
      
      // Calculate the new display value
      const newValue = Math.floor(previousValue.current + (value - previousValue.current) * easedProgress);
      setDisplayValue(newValue);
      
      // Continue the animation if not complete
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure we end with the exact target value
        setDisplayValue(value);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Clean up on unmount
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);
  
  return (
    <div className="relative">
      <span className={className}>{displayValue}</span>
      {/* Add a subtle highlight effect when the value changes */}
      {value > previousValue.current && value > 0 && (
        <span 
          className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center"
          style={{ animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
      )}
    </div>
  );
}