import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral";
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  const variants = {
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    error: "bg-rose-100 text-rose-700 border-rose-200",
    info: "bg-sky-100 text-sky-700 border-sky-200",
    neutral: "bg-primary/5 text-primary border-primary/10",
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
