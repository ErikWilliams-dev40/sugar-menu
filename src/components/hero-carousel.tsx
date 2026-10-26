"use client";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, useRef } from "react";
import type { HeroSlide } from "@/content/types";
import { EditorialImage } from "./editorial-image";
const subscribeMotion = (notify: () => void) => {
  const m = matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", notify);
  return () => m.removeEventListener("change", notify);
};
const subscribeVisibility = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};
export function HeroCarousel({
  slides,
  seconds = 7,
}: {
  slides: HeroSlide[];
  seconds?: number;
}) {
  const [{ index, loaded }, setSlide] = useState({ index: 0, loaded: [0] });
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
  const running = !paused && !hover && !focus && !hidden && !reduced;
  const interval = Math.max(3, Math.min(30, seconds)) * 1000;
  useEffect(() => {
    if (!running || slides.length < 2) return;
    const timer = setInterval(
      () =>
        setSlide((current) => {
          const next = (current.index + 1) % slides.length;
          return {
            index: next,
            loaded: Array.from(new Set([...current.loaded, next])),
          };
        }),
      interval,
    );
    return () => clearInterval(timer);
  }, [running, interval, slides.length]);
  const select = (i: number) => {
    const next = (i + slides.length) % slides.length;
    setSlide((current) => ({
      index: next,
      loaded: Array.from(new Set([...current.loaded, next])),
    }));
    setPaused(true);
  };
  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="The SUGARMENU cover stories"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setFocus(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          select(index + (e.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const t = touch.current;
        if (t) {
          const dx = e.changedTouches[0].clientX - t.x,
            dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
            select(index + (dx < 0 ? 1 : -1));
        }
        touch.current = null;
      }}
    >
      <h1 className="sr-only">SUGARMENU — Indulge Yourself.</h1>
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            className={`hero-slide${i === index ? " active" : ""}`}
            aria-hidden={i !== index}
            inert={i !== index}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {loaded.includes(i) && (
              <EditorialImage
                name={slide.image}
                hero
                eager={i === 0}
                className="hero-photo"
              />
            )}
            <div className="hero-scrim" />
            <div className="hero-copy">
              <p className="eyebrow">{slide.eyebrow}</p>
              <h2>
                {slide.line1}
                <em>{slide.line2}</em>
              </h2>
              <p className="hero-dek">{slide.copy}</p>
              <Link className="button" href={slide.href}>
                {slide.cta} →
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-controls">
        <div className="hero-tabs" aria-label="Choose a slide">
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === index ? "selected" : ""}
              aria-label={`Show slide ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => select(i)}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <span className="slide-count" aria-live={running ? "off" : "polite"}>
          {index + 1} of {slides.length}
        </span>
        <button aria-label="Previous slide" onClick={() => select(index - 1)}>
          ‹
        </button>
        <button aria-label="Next slide" onClick={() => select(index + 1)}>
          ›
        </button>
        <button
          className="pause"
          disabled={reduced}
          aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
          onClick={() => setPaused(!paused)}
        >
          {reduced ? "Still" : paused ? "Play" : "Pause"}
        </button>
        <span className="progress" aria-hidden="true">
          <i
            key={`${index}-${running}`}
            style={{
              animationDuration: `${interval}ms`,
              animationPlayState: running ? "running" : "paused",
            }}
          />
        </span>
      </div>
    </section>
  );
}
