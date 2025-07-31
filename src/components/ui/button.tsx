import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg hover:shadow-glow hover:scale-[1.02] hover:-translate-y-0.5 rounded-full border border-primary/20",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg rounded-lg",
        outline:
          "border border-border bg-surface/80 backdrop-blur-md text-foreground hover:bg-surface-elevated hover:border-accent/50 hover:shadow-md rounded-lg",
        secondary:
          "bg-surface/80 backdrop-blur-md border border-border text-foreground hover:bg-surface-elevated hover:border-accent/30 hover:shadow-md rounded-lg",
        ghost: "hover:bg-surface/50 hover:text-accent rounded-lg",
        link: "text-accent underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-accent to-accent-secondary text-accent-foreground shadow-lg hover:shadow-glow-accent hover:scale-[1.02] rounded-full border border-accent/20",
        glass: "bg-surface-glass/50 backdrop-blur-xl border border-border/50 text-foreground hover:bg-surface-elevated hover:border-accent/30 hover:shadow-lg rounded-xl"
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 px-4 py-2 text-sm rounded-lg",
        lg: "h-12 px-8 py-3 text-base rounded-xl",
        xl: "h-14 px-10 py-4 text-lg rounded-2xl",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
