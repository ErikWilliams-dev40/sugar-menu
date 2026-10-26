"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { STORAGE } from "@/lib/storage";
export function CookiePreferencesButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("sugarmenu:privacy"))}
    >
      Cookie preferences
    </button>
  );
}
export function PrivacyChoice() {
  const [visible, setVisible] = useState(false),
    [preferences, setPreferences] = useState(false),
    [analytics, setAnalytics] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    const open = () => {
      setVisible(true);
      setPreferences(false);
    };
    const timer = setTimeout(() => {
      try {
        const saved = JSON.parse(
          localStorage.getItem(STORAGE.consent) ?? "null",
        );
        if (saved?.version !== 1 || typeof saved.analytics !== "boolean")
          setVisible(true);
        else setAnalytics(saved.analytics);
      } catch {
        setVisible(true);
      }
    }, 0);
    window.addEventListener("sugarmenu:privacy", open);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("sugarmenu:privacy", open);
    };
  }, []);
  const save = (choice: boolean) => {
    try {
      localStorage.setItem(
        STORAGE.consent,
        JSON.stringify({
          version: 1,
          analytics: choice,
          updatedAt: new Date().toISOString(),
        }),
      );
      setAnalytics(choice);
      setError("");
      setVisible(false);
    } catch {
      setError(
        "Your choice could not be saved. Optional analytics remain off.",
      );
    }
  };
  if (!visible) return null;
  return (
    <section className="cookie-choice" aria-labelledby="privacy-title">
      <h2 id="privacy-title">A little privacy. As it should be.</h2>
      <p>
        Essential access cookies support access when needed. Optional anonymous
        analytics are your choice. This local preview uses browser storage and
        has no analytics service connected.
      </p>
      {preferences && (
        <label className="privacy-toggle">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />{" "}
          Allow optional anonymous analytics when available
        </label>
      )}
      <div>
        {preferences ? (
          <button className="button" onClick={() => save(analytics)}>
            Save preferences
          </button>
        ) : (
          <>
            <button className="button" onClick={() => save(true)}>
              Accept analytics
            </button>
            <button className="button" onClick={() => save(false)}>
              Reject analytics
            </button>
          </>
        )}
        <button
          className="text-link"
          onClick={() => setPreferences(!preferences)}
        >
          {preferences ? "Back" : "Preferences"}
        </button>
        <Link
          className="text-link"
          href="/cookies"
          onClick={() => setVisible(false)}
        >
          Cookie details
        </Link>
        <button
          className="text-link"
          aria-label="Dismiss privacy choices"
          onClick={() => setVisible(false)}
        >
          Close ×
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
