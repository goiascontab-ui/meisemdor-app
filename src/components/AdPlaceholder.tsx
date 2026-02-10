import React from "react";
import { AdSense } from "./AdSense";

export function AdPlaceholder({ slot = "1234567890", className = "" }: { slot?: string; className?: string }) {
  // In development show a non-intrusive placeholder to avoid loading real ads
  if (process.env.NODE_ENV === "development") {
    return (
      <div className={`w-full bg-muted rounded-lg border border-border p-4 text-center text-sm text-muted-foreground ${className}`}>
        Espaço para anúncio (placeholder)
      </div>
    );
  }

  // In production, render the AdSense unit safely
  return (
    <div className={className}>
      <AdSense slot={slot} format="auto" />
    </div>
  );
}

