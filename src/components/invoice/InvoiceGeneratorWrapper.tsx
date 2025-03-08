
import React from 'react';
import { Button } from "@/components/ui/button";

// This component is a wrapper to fix the button variant type issue
// It uses the correct variant types from shadcn/ui Button component
export const FixedVariantButton = ({ 
  children, 
  onClick, 
  className,
  disabled,
  type
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};

// Export a separate success variant button that uses the correct variant
export const SuccessButton = ({ 
  children, 
  onClick, 
  className,
  disabled,
  type
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className={`bg-green-500 hover:bg-green-600 ${className || ""}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};
