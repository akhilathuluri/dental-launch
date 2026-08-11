import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '', dark = false }) => {
  return (
    <span
      className={`inline-block text-[11px] sm:text-xs font-medium uppercase tracking-[0.15em] mb-2 sm:mb-3 ${
        dark ? 'text-slate-400' : 'text-slate-500'
      } ${className}`}
    >
      {children}
    </span>
  );
};
