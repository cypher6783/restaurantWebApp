import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95 transition-all duration-200",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent/90 shadow-xl shadow-accent/20 border-none",
        secondary: "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 border-none",
        outline: "border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary",
        ghost: "hover:bg-primary/5 text-primary",
        link: "underline-offset-4 hover:underline text-primary font-bold",
        subtle: "bg-white/40 backdrop-blur-md border border-white/40 text-primary shadow-sm hover:bg-white/60",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-3 rounded-lg",
        lg: "h-14 px-8 rounded-2xl text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "subtle";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
