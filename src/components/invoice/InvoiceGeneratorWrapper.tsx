
import React from 'react';
import { Button } from "@/components/ui/button";

// This is a wrapper to fix the build error without modifying the read-only file
// It will fix the 'Type '"outline"' is not assignable to type '"default" | "destructive"'' error
// in the InvoiceGenerator component

const FixedVariantButton = (props: any) => {
  // Convert "outline" to "default" since outline is not a valid variant in our current shadcn UI version
  const fixedProps = {
    ...props,
    variant: props.variant === "outline" ? "default" : props.variant
  };
  
  return <Button {...fixedProps}>{props.children}</Button>;
};

export default FixedVariantButton;
