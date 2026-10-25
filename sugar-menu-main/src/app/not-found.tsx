import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section-space">
      <p className="eyebrow">404 · Off the menu</p>
      <h1>This one isn’t on the menu.</h1>
      <p>Let’s find you something sweeter.</p>
      <Link className="button button-dark" href="/">
        Back to the menu →
      </Link>
    </section>
  );
}
