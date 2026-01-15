"use client";

import { useEffect, useRef } from 'react';
import { useAdsterra } from '../../hooks/useAdsterra';

export default function AdsterraBanner300x250({ position = 'sidebar' }) {
  const { loadBanner300x250, adBlockDetected } = useAdsterra();
  const containerRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || adBlockDetected) return;
    
    // Delay untuk sidebar
    const delay = position === 'sidebar' ? 2000 : 4000;
    
    const timer = setTimeout(() => {
      loadBanner300x250(position);
      loadedRef.current = true;
    }, delay);
    
    return () => clearTimeout(timer);
  }, [loadBanner300x250, adBlockDetected, position]);

  if (adBlockDetected) {
    return (
      <div className="adsterra-banner-300x250 w-[300px] h-[250px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
        <p className="text-gray-400 text-sm px-4 text-center">
          Support us by disabling AdBlock
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      id={`container-300x250-${position}`}
      className="adsterra-banner-300x250"
      style={{
        width: '300px',
        height: '250px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Loading placeholder */}
      <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-sm mb-1">Loading 300x250 ad...</div>
          <div className="text-gray-600 text-xs">Thank you for supporting us</div>
        </div>
      </div>
    </div>
  );
}