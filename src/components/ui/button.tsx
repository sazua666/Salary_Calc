import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[var(--primary)] text-[var(--background)] hover:opacity-90 hover:-translate-y-[1px] shadow-[0_0_20px_rgba(16,185,129,0.2)] font-bold": variant === "default",
            "bg-[var(--elevated)]/70 border border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--elevated)]": variant === "secondary",
            "border border-[var(--border-subtle)] bg-transparent hover:bg-[var(--elevated)] text-[var(--text-primary)]": variant === "outline",
            "hover:bg-[var(--elevated)] hover:text-[var(--text-primary)] text-[var(--text-muted)]": variant === "ghost",
            "h-9 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-10 rounded-md px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
