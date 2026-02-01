import React from "react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({ className, size = "default", ...props }) {
  return (
    <div
      role="status"
      className={cn(
        "animate-spin rounded-full border-primary",
        size === "small" && "h-4 w-4 border-2",
        size === "default" && "h-8 w-8 border-b-2",
        size === "large" && "h-12 w-12 border-4",
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
