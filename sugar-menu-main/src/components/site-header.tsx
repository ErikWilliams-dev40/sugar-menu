import Link from "next/link";
import { content } from "@/content/repository";
import { Navigation } from "./navigation";

export async function SiteHeader() {
  const sections = await content.getSections();
  const items = [
    ...sections.map((section) => ({
      href: `/${section.slug}`,
      label: section.name,
    })),
    { href: "/the-sugar-dish", label: "The Sugar Dish" },
    { href: "/extra-sugar", label: "Extra Sugar" },
  ];
  return (
    <header className="site-header">
      <div className="masthead">
        <span className="masthead-note">A little more life.</span>
        <Link href="/" className="brand" aria-label="SugarMenu home">
          <span className="wordmark">
            SUGARMENU<span>.</span>
          </span>
          <span className="tagline">Indulge Yourself.</span>
        </Link>
        <Link href="/the-sugar-dish" className="button masthead-join">
          Join
        </Link>
      </div>
      <Navigation items={items} />
    </header>
  );
}
