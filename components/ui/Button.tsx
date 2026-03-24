import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  withArrow?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  withArrow,
  fullWidth,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:pointer-events-none relative overflow-hidden";

  // Reduced radius for a more "elite" / professional SaaS look
  const shapeStyles = "rounded-lg";

  const variants = {
    primary: "bg-[#023a97] text-white shadow-[0_2px_15px_rgba(2,58,151,0.25)] hover:shadow-[0_4px_20px_rgba(2,58,151,0.4)] hover:brightness-110 border border-[#023a97]/20",
    outline: "border border-[#023a97]/40 text-[#023a97] hover:border-[#023a97] hover:bg-[#023a97]/5 backdrop-blur-sm",
    ghost: "text-gray-500 hover:text-[#023a97] hover:bg-[#023a97]/5"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs uppercase",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-sm md:text-base"
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${shapeStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {/* Shimmer effect overlay for primary buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
      )}

      <div className="relative z-20 flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
        {withArrow && !isLoading && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </div>
    </button>
  );
};

export default Button;