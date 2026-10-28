import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <section className="prose-page">
      <p className="kicker">404 · Off the menu</p>
      <h1>This one isn’t on the menu.</h1>
      <p>Let’s find you something sweeter.</p>
      <Link className="button" href="/">
        Back to the menu →
      </Link>
    </section>
  );
}
