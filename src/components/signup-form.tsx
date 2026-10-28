"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { saveSubmission } from "@/lib/storage";
export function SignupForm({
  kind = "newsletter",
}: {
  kind?: "newsletter" | "community";
}) {
  const id = useId();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  return (
    <form
      className="signup"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("");
        const data = new FormData(e.currentTarget);
        const email = String(data.get("email") ?? "").trim();
        const eventName =
          kind === "community"
            ? "community_early_access_signup"
            : "newsletter_signup";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          trackEvent({ name: eventName, status: "error" });
          setError("Enter a valid email address.");
          e.currentTarget.querySelector("input")?.focus();
          return;
        }
        if (!data.get("consent")) {
          trackEvent({ name: eventName, status: "error" });
          setError("Please give your consent before continuing.");
          e.currentTarget
            .querySelector<HTMLInputElement>('[name="consent"]')
            ?.focus();
          return;
        }
        try {
          const result = saveSubmission(email, kind);
          trackEvent({ name: eventName, status: "success" });
          setError("");
          setMessage(
            result === "duplicate"
              ? "This email is already saved for this demo in this browser. No email has been sent."
              : "Saved in this browser only. This is a local demo; no email has been sent and no live account has been created.",
          );
          e.currentTarget.reset();
        } catch {
          trackEvent({ name: eventName, status: "error" });
          setError(
            "Your browser could not save this signup. Nothing was sent. Please check browser storage and try again.",
          );
        }
      }}
    >
      <label htmlFor={`${id}-email`}>Email address</label>
      <div className="email-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Your email address"
          aria-describedby={`${id}-message ${id}-note`}
          aria-invalid={!!error && error.startsWith("Enter")}
        />
        <button className="button" type="submit">
          {kind === "community" ? "Save me a seat" : "Sign me up"} →
        </button>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          I consent to saving my email in this browser for the {kind} demo.{" "}
          <Link href="/privacy">Privacy policy</Link>
        </span>
      </label>
      <p className="meta demo-note" id={`${id}-note`}>
        Local preview only. No live subscription or email delivery.
      </p>
      <p
        id={`${id}-message`}
        className="form-message"
        role={error ? "alert" : "status"}
      >
        {error || message}
      </p>
    </form>
  );
}
