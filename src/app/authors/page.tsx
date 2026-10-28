import type { Metadata } from "next";
import Link from "next/link";
import { baseData } from "@/content/fixtures";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contributors",
  description:
    "People credited on SUGARMENU stories. Named biographies are added only when the team supplies them.",
  path: "/authors",
});

export default function AuthorsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contributors", path: "/authors" },
  ];
  return (
    <article className="prose-page">
      <Breadcrumbs plain items={crumbs} />
      <span className="kicker">SUGARMENU</span>
      <h1>Contributors</h1>
      <p className="utility-intro">
        Staff biographies have not been supplied. The credit below is the shared
        editorial attribution already used on the launch drafts.
      </p>
      <ul>
        {baseData.authors.map((author) => (
          <li key={author.slug}>
            <Link href={`/authors/${author.slug}`}>{author.name}</Link>
            <p>{author.bio}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
