import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'arrow-up-right' | 'arrow-right' | 'none';
  children: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon = 'none',
  children,
  className = '',
  asAnchor = false,
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 active:scale-[0.98] cursor-pointer';

  const variants = {
    primary: 'bg-white text-[#111827] hover:bg-slate-100 shadow-sm',
    secondary: 'bg-[#587A9C] text-white hover:bg-[#4C6B8A]',
    dark: 'bg-[#141C28] text-white hover:bg-[#1E293B]',
    outline: 'border border-[#141C28]/20 text-[#111827] hover:bg-[#141C28]/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm gap-2',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-2.5',
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const renderIcon = () => {
    if (icon === 'arrow-up-right') return <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />;
    if (icon === 'arrow-right') return <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />;
    return null;
  };

  if (asAnchor && href) {
    return (
      <a href={href} className={`${combinedClass} group`}>
        <span>{children}</span>
        {renderIcon()}
      </a>
    );
  }

  return (
    <button className={`${combinedClass} group`} {...props}>
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
};
