import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '', dark = false }) => {
  return (
    <span
      className={`inline-block text-xs sm:text-[13px] font-normal tracking-tight mb-2 ${
        dark ? 'text-slate-400' : 'text-[#64748B]'
      } ${className}`}
    >
      {children}
    </span>
  );
};
