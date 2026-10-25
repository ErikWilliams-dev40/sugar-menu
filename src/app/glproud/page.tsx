import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "GLProud",
  description:
    "Real stories. Real science. A brighter, bolder you — on your terms.",
};

const topics = [
  "Getting Started",
  "Side Effects Honestly",
  "Eating Well",
  "Strength & Movement",
  "Style & Confidence",
  "Ask the Doctor",
];

export default function GLProudPage() {
  return (
    <>
      <PageIntro
        tone="champagne"
        eyebrow="GLP-1. Health. Lifestyle."
        title="GLProud"
        description="Real stories. Real science. A brighter, bolder you — on your terms."
      />
      <section className="container section-space">
        <h2>On the horizon</h2>
        <ul className="topic-grid">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <div className="empty-state">
          <p>
            Our guide library is taking shape. Articles and clinical review
            attributions will appear when the reviewed content is ready.
          </p>
        </div>
      </section>
    </>
  );
}
