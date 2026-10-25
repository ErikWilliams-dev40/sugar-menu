"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="site-nav">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
