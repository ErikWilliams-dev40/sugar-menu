"use client";
import Link from "next/link";
import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export function TrackView({ event }: { event: AnalyticsEvent }) {
  const key = JSON.stringify(event);
  useEffect(() => {
    trackEvent(JSON.parse(key) as AnalyticsEvent);
  }, [key]);
  return null;
}

export function TrackedLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackEvent(event)}>
      {children}
    </Link>
  );
}
