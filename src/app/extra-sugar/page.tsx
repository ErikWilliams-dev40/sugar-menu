import { EditorialImage } from "@/components/editorial-image";
import { JsonLd } from "@/components/json-ld";
import { SignupForm } from "@/components/signup-form";
import { newsletterFaq } from "@/content/utility";
import { pageMetadata } from "@/lib/metadata";
import { faqStructuredData } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Extra Sugar",
  description:
    "The best stories, excellent distractions, and your next good idea.",
  path: "/extra-sugar",
  index: false,
});
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
        <EditorialImage
          name="hero-5"
          eager
          sizes="(max-width: 800px) 100vw, 50vw"
        />
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
        <JsonLd data={faqStructuredData(newsletterFaq)} />
        <div className="faq">
          <h2>A little clarity</h2>
          {newsletterFaq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
