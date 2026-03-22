import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // Base styles
    let classes = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:pointer-events-none disabled:opacity-50 ';
    
    // Variant styles
    if (variant === 'default') {
      classes += 'bg-primary-500 text-slate-900 shadow hover:bg-primary-700 ';
    } else if (variant === 'accent') {
      classes += 'bg-accent-500 text-slate-900 shadow-sm hover:bg-accent-500/90 ';
    } else if (variant === 'outline') {
      classes += 'border border-neutral-200 bg-transparent shadow-sm hover:bg-neutral-100 hover:text-neutral-900 ';
    } else if (variant === 'ghost') {
      classes += 'hover:bg-neutral-100 hover:text-neutral-900 ';
    }

    // Size styles
    if (size === 'default') {
      classes += 'h-11 px-4 py-2 ';
    } else if (size === 'sm') {
      classes += 'h-9 rounded-md px-3 text-xs ';
    } else if (size === 'lg') {
      classes += 'h-12 rounded-md px-8 text-base ';
    } else if (size === 'icon') {
      classes += 'h-11 w-11 ';
    }

    if (className) {
      classes += className;
    }

    return (
      <Comp
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
