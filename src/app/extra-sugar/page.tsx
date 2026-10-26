import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { SignupForm } from "@/components/signup-form";
export const metadata = {
  title: "Extra Sugar",
  description:
    "The best stories, excellent distractions, and your next good idea.",
};
export default function ExtraSugar() {
  return (
    <>
      <section className="hub-hero newsletter-hero">
        <div>
          <span className="kicker">A little extra. Just for you.</span>
          <h1>Extra Sugar</h1>
          <p className="dek">
            The best stories, excellent distractions, and your next good idea.
          </p>
          <p>
            The best stories. The juiciest finds. A little more good taste in
            your inbox.
          </p>
          <a className="button" href="#signup">
            Sign me up →
          </a>
        </div>
        <EditorialImage name="hero-5" eager />
      </section>
      <div className="inner-shell">
        <section className="signup-panel" id="signup">
          <h2>A sweeter inbox starts here.</h2>
          <p>
            This local preview lets you try the signup experience. Email
            delivery is not connected.
          </p>
          <SignupForm />
        </section>
        <div className="faq">
          <h2>A little clarity</h2>
          <details>
            <summary>Will this send me an email?</summary>
            <p>
              No. Your demo signup is stored only in this browser. A live
              subscription service is not configured.
            </p>
          </details>
          <details>
            <summary>Where are previous editions?</summary>
            <p>
              There are no published editions yet. Visit the{" "}
              <Link href="/newsletter-archive">newsletter archive</Link> for its
              current status.
            </p>
          </details>
          <details>
            <summary>How do I remove my demo signup?</summary>
            <p>
              Use the local signup records panel in the{" "}
              <Link href="/studio">editorial studio demo</Link>, or clear this
              site’s browser storage.
            </p>
          </details>
        </div>
      </div>
    </>
  );
}
