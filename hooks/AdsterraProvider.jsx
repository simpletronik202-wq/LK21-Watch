"use client";

import { createContext, useContext } from 'react';
import { useAdsterra } from './useAdsterra';

const AdsterraContext = createContext();

export function AdsterraProvider({ children }) {
  const adsterra = useAdsterra();

  return (
    <AdsterraContext.Provider value={adsterra}>
      {children}
    </AdsterraContext.Provider>
  );
}

export const useAdsterraContext = () => useContext(AdsterraContext);