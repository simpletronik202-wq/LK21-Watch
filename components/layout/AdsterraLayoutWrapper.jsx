// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-ad1ee1816ddebc11a35ac98d10fb7142');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/ad1ee1816ddebc11a35ac98d10fb7142/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/0e/dd/aa/0eddaacfb0675163e55b188fa496a91c.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="63c7a0cc6ec7a01e41fd76f689d74a39"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/63/c7/a0/63c7a0cc6ec7a01e41fd76f689d74a39.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}