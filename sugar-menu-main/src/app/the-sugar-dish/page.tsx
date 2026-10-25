import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "The Sugar Dish",
  description: "Pull up a chair. Spill something.",
};

export default function SugarDishPage() {
  return (
    <>
      <PageIntro
        tone="blush"
        eyebrow="The community"
        title="The Sugar Dish"
        description="Pull up a chair. Spill something."
      />
      <section className="container section-space">
        <h2>What’s on the table</h2>
        <ul className="topic-grid">
          {["Spill", "Ask", "Debate", "Connect"].map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <div className="empty-state">
          <h2>Your seat is coming.</h2>
          <p>
            Early-access registration will open soon. This preview isn’t
            collecting signups yet.
          </p>
        </div>
      </section>
    </>
  );
}
