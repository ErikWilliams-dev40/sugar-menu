import { EditorialImage } from "@/components/editorial-image";
import { DishPreview } from "@/components/editorial-views";
import { SignupForm } from "@/components/signup-form";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "The Sugar Dish",
  description: "Your next chapter deserves good company.",
  path: "/the-sugar-dish",
  index: false,
});
export default function SugarDish() {
  return (
    <>
      <section className="hub-hero dish-hero">
        <div>
          <span className="eyebrow">
            Your next chapter deserves good company.
          </span>
          <h1>The Sugar Dish</h1>
          <p className="dek">Real women. Real stories. No filters.</p>
          <p>
            Honest conversations. Excellent recommendations. People who get it.
            Our community is taking shape — and there’s a seat with your name on
            it.
          </p>
          <a className="button" href="#signup">
            Save me a seat →
          </a>
        </div>
        <EditorialImage
          name="hero-1"
          eager
          sizes="(max-width: 800px) 100vw, 50vw"
        />
      </section>
      <section className="inner-shell">
        <h2 className="section-heading">A taste of what’s coming</h2>
        <DishPreview />
        <div className="signup-panel" id="signup">
          <h2>There’s a seat for you.</h2>
          <p>
            Try our interest form. Member conversations open in phase two; this
            preview saves your interest only in this browser.
          </p>
          <SignupForm kind="community" />
        </div>
      </section>
    </>
  );
}
