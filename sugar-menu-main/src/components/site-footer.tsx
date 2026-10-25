import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark" href="/">
          SUGARMENU<span>.</span>
        </Link>
        <p className="tagline">
          Consider this your permission slip.
          <br />
          The rest of your life is calling.
        </p>
      </div>
      <nav aria-label="Footer">
        <Link href="/sweet-talk">Sweet Talk</Link>
        <Link href="/glproud">GLProud</Link>
        <Link href="/the-sugar-dish">The Sugar Dish</Link>
        <Link href="/extra-sugar">Extra Sugar</Link>
      </nav>
      <p className="footer-note">
        SugarMenu preview · Sample editorial and photography placeholders.
      </p>
    </footer>
  );
}
