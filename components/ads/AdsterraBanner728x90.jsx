"use client";

import { useEffect, useRef } from 'react';
import { useAdsterra } from '../../hooks/useAdsterra';

export default function AdsterraBanner728x90({ position = 'top' }) {
  const { loadBanner728x90, adBlockDetected, deviceType } = useAdsterra();
  const containerRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || adBlockDetected) return;
    
    // Untuk mobile, skip 728x90 (terlalu besar)
    if (deviceType === 'mobile') return;
    
    // Delay berdasarkan position
    const delay = position === 'top' ? 1500 : 3000;
    
    const timer = setTimeout(() => {
      loadBanner728x90(position);
      loadedRef.current = true;
    }, delay);
    
    return () => clearTimeout(timer);
  }, [loadBanner728x90, adBlockDetected, deviceType, position]);

  // Jika adblock terdeteksi, tampilkan fallback
  if (adBlockDetected) {
    return (
      <div className="adsterra-banner-728x90 w-[728px] h-[90px] bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
        <p className="text-gray-400 text-sm">
          Please disable AdBlock to see ads
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      id={`container-728x90-${position}`}
      className="adsterra-banner-728x90"
      style={{
        width: '728px',
        height: '90px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Loading placeholder */}
      <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-sm mb-1">Loading 728x90 banner...</div>
          <div className="text-gray-600 text-xs">Ad revenue supports free content</div>
        </div>
      </div>
    </div>
  );
}