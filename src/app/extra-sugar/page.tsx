import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Extra Sugar",
  description: "The newsletter your group chat will steal from.",
};

export default function ExtraSugarPage() {
  return (
    <>
      <PageIntro
        tone="blush"
        eyebrow="The newsletter"
        title="Extra Sugar"
        description="The newsletter your group chat will steal from."
      />
      <section className="container section-space">
        <h2>A sweeter week</h2>
        <ul className="topic-grid">
          <li>
            <span className="eyebrow">Monday</span>The Menu
          </li>
          <li>
            <span className="eyebrow">Wednesday</span>Hump Day
          </li>
          <li>
            <span className="eyebrow">Friday</span>Permission Slip
          </li>
        </ul>
        <div className="empty-state">
          <h2>Good things take a little time.</h2>
          <p>
            Subscriptions are coming soon. This preview isn’t collecting email
            addresses yet.
          </p>
        </div>
      </section>
    </>
  );
}
