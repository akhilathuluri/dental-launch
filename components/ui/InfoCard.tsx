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
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
          <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#111827] tracking-tight">{title}</h3>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-[#111827] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </div>
        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </a>
  );
};
