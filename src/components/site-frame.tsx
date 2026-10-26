"use client";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
export function SiteFrame({ children }: { children: React.ReactNode }) {
  const preview = usePathname() === "/studio/preview";
  return (
    <>
      {!preview && <SiteHeader />}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {!preview && <SiteFooter />}
    </>
  );
}
