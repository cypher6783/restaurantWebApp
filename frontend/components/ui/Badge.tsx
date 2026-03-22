import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral";
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
    warning: "bg-amber-50 text-amber-700 border-amber-100/50",
    error: "bg-rose-50 text-rose-700 border-rose-100/50",
    info: "bg-sky-50 text-sky-700 border-sky-100/50",
    neutral: "bg-primary/5 text-primary/80 border-primary/10 tracking-widest uppercase text-[9px] font-black",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
