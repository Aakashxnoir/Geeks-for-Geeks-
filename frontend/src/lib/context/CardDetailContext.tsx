import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CardDetails {
  title: string;
  subtitle?: string;
  description: string;
  functionality: string;
  stats?: Array<{ label: string; value: string | number }>;
  exportData?: any;
  componentName?: string;
}

interface CardDetailContextType {
  activeDetails: CardDetails | null;
  showDetails: (details: CardDetails) => void;
  hideDetails: () => void;
}

const CardDetailContext = createContext<CardDetailContextType | undefined>(undefined);

export function CardDetailProvider({ children }: { children: ReactNode }) {
  const [activeDetails, setActiveDetails] = useState<CardDetails | null>(null);

  const showDetails = (details: CardDetails) => {
    setActiveDetails(details);
  };

  const hideDetails = () => {
    setActiveDetails(null);
  };

  return (
    <CardDetailContext.Provider value={{ activeDetails, showDetails, hideDetails }}>
      {children}
    </CardDetailContext.Provider>
  );
}

export function useCardDetail() {
  const context = useContext(CardDetailContext);
  if (context === undefined) {
    throw new Error('useCardDetail must be used within a CardDetailProvider');
  }
  return context;
}
