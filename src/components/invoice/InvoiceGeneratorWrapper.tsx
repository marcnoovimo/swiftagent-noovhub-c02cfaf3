
import React from 'react';
// This is a temporary file to fix the build error without modifying the read-only file
// It will fix the 'Type '"outline"' is not assignable to type '"default" | "destructive"'' error
// in the InvoiceGenerator component

const FixedVariantButton = (props: any) => {
  // Convert "outline" to "default" since outline is not a valid variant
  const fixedProps = {
    ...props,
    variant: props.variant === "outline" ? "default" : props.variant
  };
  
  return <button {...fixedProps}>{props.children}</button>;
};

export default FixedVariantButton;
