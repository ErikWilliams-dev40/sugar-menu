"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sections } from "@/content/fixtures";
export function SiteHeader({
  tagline = "Indulge Yourself.",
}: {
  tagline?: string;
}) {
  const search = useRef<HTMLDialogElement>(null),
    menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, [open]);
  const close = () => {
    search.current?.close();
    menu.current?.close();
    setOpen(false);
  };
  const nav = sections.map((s) => (
    <Link
      key={s.slug}
      href={`/${s.slug}`}
      aria-current={pathname === `/${s.slug}` ? "page" : undefined}
      onClick={close}
    >
      {s.name}
    </Link>
  ));
  return (
    <header className="site-header">
      <div className="masthead">
        <Link href="/" className="brand" aria-label="SUGARMENU home">
          SUGARMENU<span>.</span>
          <em>{tagline}</em>
        </Link>
        <div className="header-actions">
          <button
            className="search-trigger"
            onClick={() => {
              search.current?.showModal();
              setOpen(true);
            }}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">⌕</span> Search
          </button>
          <Link className="button small" href="/extra-sugar">
            Subscribe
          </Link>
          <Link className="signin" href="/the-sugar-dish">
            The Sugar Dish
          </Link>
          <button
            className="menu-trigger"
            aria-haspopup="dialog"
            onClick={() => {
              menu.current?.showModal();
              setOpen(true);
            }}
          >
            Menu <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
      <nav aria-label="Main navigation">{nav}</nav>
      <dialog
        ref={search}
        className="search-dialog"
        aria-labelledby="search-heading"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="dialog-head">
          <h2 id="search-heading">What’s on your mind?</h2>
          <button aria-label="Close search" onClick={close}>
            ×
          </button>
        </div>
        <form action="/search" className="signup" onSubmit={close}>
          <label htmlFor="header-query">Search SUGARMENU</label>
          <div className="email-row">
            <input
              id="header-query"
              name="q"
              type="search"
              placeholder="Style, travel, a fresh start…"
              required
            />
            <button className="button">Search →</button>
          </div>
        </form>
        <p className="meta">Explore 30 original launch drafts.</p>
      </dialog>
      <dialog
        ref={menu}
        className="mobile-menu"
        aria-labelledby="menu-heading"
        onClose={() => setOpen(false)}
      >
        <div className="drawer-head">
          <span id="menu-heading">On the menu</span>
          <button onClick={close}>Close ×</button>
        </div>
        <nav aria-label="Mobile navigation">{nav}</nav>
        <Link className="button" href="/extra-sugar" onClick={close}>
          Subscribe →
        </Link>
        <Link className="text-link" href="/the-sugar-dish" onClick={close}>
          Pull up a chair →
        </Link>
      </dialog>
    </header>
  );
}
