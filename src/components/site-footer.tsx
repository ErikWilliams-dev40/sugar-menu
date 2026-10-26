import Link from "next/link";
import { sections } from "@/content/fixtures";
import { CookiePreferencesButton } from "./privacy";
export function SiteFooter({
  line = "Consider this your permission slip. The rest of your life is calling.",
}: {
  line?: string;
}) {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link className="footer-brand" href="/">
            SUGARMENU<span>.</span>
          </Link>
          <p className="footer-dek">{line}</p>
        </div>
        <div>
          <h3>The Menu</h3>
          {sections.slice(0, 8).map((s) => (
            <Link key={s.slug} href={`/${s.slug}`}>
              {s.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>A Little More</h3>
          <Link href="/about">About SugarMenu</Link>
          <Link href="/partnerships">Partner with us</Link>
          <Link href="/masthead">Masthead</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/stories">All stories</Link>
        </div>
        <div>
          <h3>Pull Up a Chair</h3>
          <Link href="/the-sugar-dish">The Sugar Dish</Link>
          <Link href="/extra-sugar">Extra Sugar</Link>
          <Link href="/newsletter-archive">Newsletter archive</Link>
          <Link href="/studio">Editorial studio</Link>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} SUGARMENU.</span>
        <div>
          {[
            ["privacy", "Privacy"],
            ["terms", "Terms"],
            ["accessibility", "Accessibility"],
            ["medical-disclaimer", "Medical disclaimer"],
            ["editorial-independence", "Editorial independence"],
          ].map(([slug, label]) => (
            <Link key={slug} href={`/${slug}`}>
              {label}
            </Link>
          ))}
          <CookiePreferencesButton />
        </div>
      </div>
      <p className="preview-note">
        Private editorial preview · Original launch drafts · Illustrative
        AI-generated photography
      </p>
    </footer>
  );
}
