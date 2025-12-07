// src/components/ui/DesignSystem.jsx
import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 1. Premium Card
export const Card = ({ children, className }) => (
  <div className={cn("bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md", className)}>
    {children}
  </div>
);

// 2. Status Badge
export const Badge = ({ status, children }) => {
  const styles = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-100",
    closed: "bg-rose-50 text-rose-700 border-rose-100",
    soldout: "bg-amber-50 text-amber-700 border-amber-100",
    neutral: "bg-gray-50 text-gray-600 border-gray-100",
  };
  
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide uppercase", styles[status] || styles.neutral)}>
      {children}
    </span>
  );
};

// 3. Modern Button
export const Button = ({ variant = "primary", className, loading, children, ...props }) => {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg focus:ring-slate-900",
    secondary: "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-200",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-gray-100",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600",
  };

  return (
    <button className={cn(base, variants[variant], className)} disabled={loading} {...props}>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};

// 4. Input Field
export const Input = ({ label, error, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>}
    <input
      className={cn(
        "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-slate-900 text-sm transition-all focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none",
        error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
      )}
      {...props}
    />
    {error && <p className="text-xs text-rose-500">{error}</p>}
  </div>
);