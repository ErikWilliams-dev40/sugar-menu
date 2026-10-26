"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteData } from "@/content/types";
import { readStudio } from "@/lib/studio";
import { STORAGE } from "@/lib/storage";
import { HomeView, ArticleView } from "./editorial-views";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
export function StudioPreview({ slug }: { slug?: string }) {
  const [data, setData] = useState<SiteData | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    const load = () => {
      try {
        setData(readStudio());
        setError("");
      } catch {
        setData(null);
        setError(
          "Saved studio data could not be loaded. Return to the studio to reset it.",
        );
      }
    };
    const timer = setTimeout(load, 0);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE.studio || e.key === null) load();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const article = slug
    ? data?.articles.find((a) => a.slug === slug)
    : undefined;
  return (
    <>
      <div className="preview-toolbar">
        <span className="kicker">
          Separate studio preview · Browser-local saved edits
        </span>
        <p>
          The public site is unchanged. Save in the studio to refresh this
          preview.
        </p>
        <Link className="text-link" href="/studio">
          Back to studio →
        </Link>
        <Link className="text-link" href="/studio/preview">
          Preview homepage →
        </Link>
        <Link className="text-link" href="/">
          Original public site →
        </Link>
      </div>
      {error ? (
        <div className="prose-page" role="alert">
          <h1>Preview unavailable</h1>
          <p>{error}</p>
        </div>
      ) : data ? (
        <>
          <SiteHeader tagline={data.publication.tagline} />
          {slug ? (
            article ? (
              <ArticleView key={slug} article={article} data={data} preview />
            ) : (
              <div className="prose-page">
                <h1>Story not found</h1>
                <Link href="/studio/preview">Return to preview</Link>
              </div>
            )
          ) : (
            <HomeView data={data} preview />
          )}
          <SiteFooter line={data.publication.footerLine} />
        </>
      ) : (
        <p className="inner-shell" role="status">
          Loading your local preview…
        </p>
      )}
    </>
  );
}
