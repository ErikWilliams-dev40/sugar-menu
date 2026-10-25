import Link from "next/link";
import { content } from "@/content/repository";
import { PlaceholderImage } from "@/components/placeholder-image";
import { StoryCard } from "@/components/story-card";

export default async function HomePage() {
  const [sections, slides, articles] = await Promise.all([
    content.getSections(),
    content.getHeroSlides(),
    content.getArticles(),
  ]);
  const hero = slides[0];
  return (
    <>
      {hero && (
        <section className="home-hero">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>
              {hero.headline}
              <em>{hero.accent}</em>
            </h1>
            <p>{hero.copy}</p>
            <Link className="button" href={hero.href}>
              {hero.cta} →
            </Link>
          </div>
          <PlaceholderImage className="hero-image" caption={hero.shot} />
        </section>
      )}
      <section
        className="container section-space"
        aria-labelledby="on-the-menu"
      >
        <div className="section-heading">
          <p className="eyebrow">Something for every appetite</p>
          <h2 id="on-the-menu">On the menu</h2>
        </div>
        <div className="category-grid">
          {sections.map((section) => (
            <Link
              className="category-card"
              key={section.slug}
              href={`/${section.slug}`}
            >
              <PlaceholderImage caption={section.shot} />
              <div className="card-copy">
                <h3>{section.name}</h3>
                <p className="eyebrow">{section.eyebrow}</p>
                <p>{section.description}</p>
                <span className="text-link">Explore →</span>
              </div>
            </Link>
          ))}
          <Link className="category-card promo-card" href="/the-sugar-dish">
            <p className="eyebrow">The Community.</p>
            <h3>The Sugar Dish</h3>
            <p>Pull up a chair. Spill something.</p>
            <span className="text-link">Take a look →</span>
          </Link>
          <Link className="category-card promo-card" href="/extra-sugar">
            <p className="eyebrow">The Newsletter.</p>
            <h3>Extra Sugar</h3>
            <p>The best stories. The juiciest finds. Straight to your inbox.</p>
            <span className="text-link">Meet Extra Sugar →</span>
          </Link>
        </div>
      </section>
      <section className="container section-space" aria-labelledby="stories">
        <div className="section-heading">
          <p className="eyebrow">A first taste</p>
          <h2 id="stories">The reading room</h2>
        </div>
        <div className="story-grid">
          {articles.map((article) => (
            <StoryCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
