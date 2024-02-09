import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

interface LabelWrapperProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}
function InputWrapper({
  label,
  children,
  className,
  error,
}: LabelWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="font-semibold text-gray-700">{label}</label>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export { Input, InputWrapper };
