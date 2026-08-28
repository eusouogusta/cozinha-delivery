import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-cream hover:bg-primary-dark",
    secondary:
      "bg-transparent text-charcoal border border-border hover:bg-border/40",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
