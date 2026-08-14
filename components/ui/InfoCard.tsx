import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, href = "#appointment", className = "" }) => {
  return (
    <a
      href={href}
      className={`group relative flex flex-col justify-center py-2 px-3 sm:py-3.5 sm:px-4.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-0.5">
          <h3 className="text-[11px] sm:text-sm font-semibold text-[#111827] tracking-tight">{title}</h3>
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-[#111827] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </div>
        <p className="text-[10px] sm:text-xs text-slate-500 leading-tight sm:leading-snug font-normal line-clamp-1 sm:line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  );
};
