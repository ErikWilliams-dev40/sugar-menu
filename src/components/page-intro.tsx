export function PageIntro({
  eyebrow,
  title,
  description,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "dark" | "blush" | "champagne";
}) {
  return (
    <section className={`page-intro tone-${tone}`}>
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="dek">{description}</p>
      </div>
    </section>
  );
}
