"use client";

import { useLiveVisitorCount } from "@/hooks/useLiveVisitorCount";
import { cn } from "@/lib/utils";

export function LiveVisitorCount({ className }: { className?: string }) {
  const { count, isConnected, error } = useLiveVisitorCount();

  let statusText = "Connecting...";
  let statusColor = "bg-[var(--warning)]";
  
  if (error) {
    statusText = "Reconnecting...";
    statusColor = "bg-[var(--critical)]";
  } else if (isConnected) {
    statusText = `${count.toLocaleString()} live visitors`;
    statusColor = "bg-[var(--primary)]";
  }

  return (
    <div className={cn("flex items-center gap-2 font-mono text-sm text-[var(--text-muted)]", className)}>
      <span className="relative flex h-2.5 w-2.5">
        {isConnected && !error && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[var(--primary)]" />
        )}
        <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", statusColor)} />
      </span>
      <span>{statusText}</span>
    </div>
  );
}
