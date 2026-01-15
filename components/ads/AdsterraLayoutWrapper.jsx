"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAdsterra } from '../../hooks/useAdsterra';
import AdsterraNativeBanner from './AdsterraNativeBanner';
import AdsterraBanner728x90 from './AdsterraBanner728x90';
import AdsterraBanner300x250 from './AdsterraBanner300x250';

export default function AdsterraLayoutWrapper() {
  const pathname = usePathname();
  const { 
    initializeAds, 
    loadSocialBar, 
    deviceType 
  } = useAdsterra();

  useEffect(() => {
    // Delay sedikit untuk pastikan DOM siap
    const timer = setTimeout(() => {
      initializeAds();
      
      // Load social bar untuk halaman detail
      if (pathname.includes('/movie/') || pathname.includes('/tv/') || pathname.includes('/watch/')) {
        setTimeout(() => loadSocialBar(), 10000); // 10 detik delay
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, initializeAds, loadSocialBar]);

  // Tentukan halaman type
  const isHomePage = pathname === '/';
  const isDetailPage = pathname.includes('/movie/') || pathname.includes('/tv/') || pathname.includes('/watch/');
  const isSearchPage = pathname.includes('/search');

  return (
    <div className="adsterra-layout-wrapper">
      {/* Header Banner - SELALU muncul */}
      <div className="w-full bg-gray-900/50 py-2">
        <div className="container mx-auto px-4">
          <AdsterraNativeBanner position="header" />
        </div>
      </div>

      {/* 728x90 TOP Banner - Hanya di homepage & desktop */}
      {deviceType === 'desktop' && (isHomePage || isSearchPage) && (
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 py-4 border-y border-gray-700">
          <div className="container mx-auto px-4 flex justify-center">
            <AdsterraBanner728x90 position="top" />
          </div>
        </div>
      )}

      {/* 300x250 Sidebar Banner - Hanya di detail pages */}
      {isDetailPage && (
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-30">
          <div className="bg-gray-900/90 backdrop-blur-sm p-2 rounded-lg shadow-2xl">
            <AdsterraBanner300x250 position="sidebar" />
          </div>
        </div>
      )}

      {/* Middle Native Banner - Setelah konten utama */}
      {(isHomePage || isDetailPage) && (
        <div className="w-full my-8">
          <div className="container mx-auto px-4">
            <AdsterraNativeBanner position="middle" />
          </div>
        </div>
      )}

      {/* 728x90 BOTTOM Banner - Hampir semua halaman */}
      <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 py-4 border-y border-gray-700 mt-8">
        <div className="container mx-auto px-4 flex justify-center">
          <AdsterraBanner728x90 position="bottom" />
        </div>
      </div>

      {/* Footer Native Banner */}
      <div className="w-full bg-gray-900/50 py-4">
        <div className="container mx-auto px-4">
          <AdsterraNativeBanner position="footer" />
        </div>
      </div>
    </div>
  );
}