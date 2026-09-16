"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LiveDateTime({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      // Format: 16 Sep 2026 · 4:42 PM IST
      const datePart = new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(now);
      
      const timePart = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(now);

      setTimeStr(`${datePart} · ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className={cn("text-sm text-[var(--text-muted)]", className)}>Loading local time...</div>;
  }

  return (
    <div className={cn("text-sm text-[var(--text-muted)]", className)}>
      Local time: <br className="md:hidden" /> {timeStr}
    </div>
  );
}
