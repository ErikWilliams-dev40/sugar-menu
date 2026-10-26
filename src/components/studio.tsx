"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { baseData } from "@/content/fixtures";
import type { Article, SiteData } from "@/content/types";
import {
  readStudio,
  saveStudio,
  moveItem,
  imageNames,
  allowedDestinations,
} from "@/lib/studio";
import { STORAGE, readSubmissions, type Submission } from "@/lib/storage";
function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label>
      {label}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
function ImageSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label>
      Image
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {imageNames.map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>
    </label>
  );
}
function DestinationSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label>
      Destination
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {Array.from(new Set(allowedDestinations)).map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>
    </label>
  );
}
function SectionEditor({
  sections,
  onChange,
  onInvalid,
}: {
  sections: Article["sections"];
  onChange: (v: Article["sections"]) => void;
  onInvalid: (v: boolean) => void;
}) {
  const [raw, setRaw] = useState(JSON.stringify(sections, null, 2));
  const [error, setError] = useState("");
  return (
    <label>
      Body sections (JSON: heading and text)
      <textarea
        className="body-editor"
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          try {
            const next: unknown = JSON.parse(e.target.value);
            if (
              !Array.isArray(next) ||
              !next.length ||
              !next.every(
                (s) =>
                  s &&
                  typeof s.heading === "string" &&
                  typeof s.text === "string",
              )
            )
              throw new Error();
            setError("");
            onInvalid(false);
            onChange(next);
          } catch {
            setError(
              "Use a nonempty array of objects with heading and text strings. Saving is disabled until this is fixed.",
            );
            onInvalid(true);
          }
        }}
      />
      <span className="error" role="alert">
        {error}
      </span>
    </label>
  );
}
export function Studio() {
  const [data, setData] = useState<SiteData>(() => structuredClone(baseData));
  const [loaded, setLoaded] = useState(false),
    [dirty, setDirty] = useState(false),
    [invalid, setInvalid] = useState(false),
    [selected, setSelected] = useState(0),
    [revision, setRevision] = useState(0);
  const [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [records, setRecords] = useState<Submission[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData(readStudio());
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Could not read studio storage.",
        );
      }
      try {
        setRecords(readSubmissions());
      } catch {
        setMessage(
          "Local signup records could not be read. They have not been overwritten.",
        );
      }
      setLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    const warnOnLink = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const link =
        e.target instanceof Element
          ? e.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const destination = new URL(link.href);
      if (
        destination.pathname === location.pathname &&
        destination.search === location.search
      )
        return;
      if (!window.confirm("Leave the studio and discard unsaved edits?")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", warn);
    document.addEventListener("click", warnOnLink, true);
    return () => {
      window.removeEventListener("beforeunload", warn);
      document.removeEventListener("click", warnOnLink, true);
    };
  }, [dirty]);
  const update = (next: SiteData) => {
    setData(next);
    setDirty(true);
    setMessage("");
  };
  const article = data.articles[selected];
  const editArticle = (patch: Partial<Article>) =>
    update({
      ...data,
      articles: data.articles.map((a, i) =>
        i === selected ? { ...a, ...patch } : a,
      ),
    });
  const reset = () => {
    if (
      !window.confirm(
        "Reset all studio edits to the supplied kit? Local signup records and privacy choices will be kept.",
      )
    )
      return;
    try {
      localStorage.removeItem(STORAGE.studio);
      setData(structuredClone(baseData));
      setDirty(false);
      setInvalid(false);
      setRevision((r) => r + 1);
      setError("");
      setMessage("Studio reset to the supplied kit.");
    } catch {
      setError(
        "Browser storage could not be cleared. Your saved edits have not been reset.",
      );
    }
  };
  const changeArticle = (i: number) => {
    if (
      invalid &&
      !window.confirm(
        "Discard the invalid body text before switching articles?",
      )
    )
      return;
    setInvalid(false);
    setSelected(i);
  };
  return (
    <div className="studio">
      <span className="kicker">The working edition</span>
      <h1>Editorial studio</h1>
      <p className="notice">
        Unauthenticated local demo. Edits and signup records stay in this
        browser. Preview changes separately; the public site always uses the
        original kit. No secure administration, email delivery or publishing is
        connected.
      </p>
      <div className="studio-actions">
        <button
          className="button"
          disabled={!loaded || invalid}
          onClick={() => {
            try {
              saveStudio(data);
              setDirty(false);
              setError("");
              setMessage(
                "Saved in this browser. Open the separate preview to see your edits.",
              );
            } catch (e) {
              setError(
                e instanceof Error
                  ? e.message
                  : "Could not save to browser storage.",
              );
            }
          }}
        >
          Save local edits
        </button>
        <Link
          className="button"
          href="/studio/preview"
          target="_blank"
          rel="noreferrer"
        >
          Open saved preview ↗
        </Link>
        <button className="button" onClick={reset} disabled={!loaded}>
          Reset to kit
        </button>
        <span className="meta">
          {!loaded
            ? "Loading local workspace…"
            : dirty
              ? "Unsaved changes"
              : "Local workspace ready"}
        </span>
      </div>
      <p role="status">{message}</p>
      {error && (
        <p className="notice error" role="alert">
          {error}
        </p>
      )}
      {loaded && (
        <>
          <details className="studio-panel" open>
            <summary>Articles · {data.articles.length} launch drafts</summary>
            <div className="studio-grid">
              <div className="studio-list" aria-label="Choose an article">
                {data.articles.map((a, i) => (
                  <button
                    key={a.slug}
                    className={i === selected ? "active" : ""}
                    aria-pressed={i === selected}
                    onClick={() => changeArticle(i)}
                  >
                    {a.title}
                  </button>
                ))}
              </div>
              <div>
                <p className="meta">
                  /{article.category}/{article.slug} · Draft
                  {article.category === "glproud"
                    ? " · Medical review required; unreviewed"
                    : ""}
                </p>
                <Field
                  label="Article title"
                  value={article.title}
                  onChange={(title) => editArticle({ title })}
                />
                <Field
                  label="Deck"
                  value={article.dek}
                  onChange={(dek) => editArticle({ dek })}
                  multiline
                />
                <Field
                  label="Short version"
                  value={article.shortVersion}
                  onChange={(shortVersion) => editArticle({ shortVersion })}
                  multiline
                />
                <div className="field-grid">
                  <Field
                    label="Topic"
                    value={article.topic}
                    onChange={(topic) => editArticle({ topic })}
                  />
                  <ImageSelect
                    value={article.image}
                    onChange={(image) => editArticle({ image })}
                  />
                </div>
                <Field
                  label="Image alternative text"
                  value={article.alt}
                  onChange={(alt) => editArticle({ alt })}
                />
                <SectionEditor
                  key={`${selected}-${revision}`}
                  sections={article.sections}
                  onChange={(sections) => editArticle({ sections })}
                  onInvalid={(v) => {
                    setInvalid(v);
                    setDirty(true);
                  }}
                />
                <Field
                  label="Takeaways (one per line)"
                  value={article.takeaways.join("\n")}
                  onChange={(v) => editArticle({ takeaways: v.split("\n") })}
                  multiline
                />
                <div className="field-grid">
                  <Field
                    label="SEO title"
                    value={article.seoTitle}
                    onChange={(seoTitle) => editArticle({ seoTitle })}
                  />
                  <Field
                    label="SEO description"
                    value={article.seoDescription}
                    onChange={(seoDescription) =>
                      editArticle({ seoDescription })
                    }
                  />
                </div>
                <label>
                  Author
                  <select
                    value={article.authorSlug}
                    onChange={(e) =>
                      editArticle({ authorSlug: e.target.value })
                    }
                  >
                    {data.authors.map((a) => (
                      <option key={a.slug} value={a.slug}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="meta">
                  Draft dates, provenance, source links and medical-review
                  status are preserved. This demo cannot publish or claim
                  medical review.
                </p>
                <Link
                  className="text-link"
                  target="_blank"
                  rel="noreferrer"
                  href={`/studio/preview?article=${article.slug}`}
                >
                  Preview saved article ↗
                </Link>
              </div>
            </div>
          </details>
          <details className="studio-panel">
            <summary>Hero copy & order</summary>
            {data.heroes.map((h, i) => (
              <fieldset className="studio-panel" key={h.image}>
                <legend>
                  Slide {i + 1} · {h.image}
                </legend>
                <div className="studio-order">
                  <button
                    className="button"
                    disabled={i === 0}
                    aria-label={`Move slide ${i + 1} up`}
                    onClick={() =>
                      update({ ...data, heroes: moveItem(data.heroes, i, -1) })
                    }
                  >
                    ↑
                  </button>
                  <button
                    className="button"
                    disabled={i === 4}
                    aria-label={`Move slide ${i + 1} down`}
                    onClick={() =>
                      update({ ...data, heroes: moveItem(data.heroes, i, 1) })
                    }
                  >
                    ↓
                  </button>
                </div>
                {(["eyebrow", "line1", "line2", "copy", "cta"] as const).map(
                  (key) => (
                    <Field
                      key={key}
                      label={key}
                      value={h[key]}
                      onChange={(v) =>
                        update({
                          ...data,
                          heroes: data.heroes.map((x, j) =>
                            j === i ? { ...x, [key]: v } : x,
                          ),
                        })
                      }
                    />
                  ),
                )}
                <DestinationSelect
                  value={h.href}
                  onChange={(href) =>
                    update({
                      ...data,
                      heroes: data.heroes.map((x, j) =>
                        j === i ? { ...x, href } : x,
                      ),
                    })
                  }
                />
              </fieldset>
            ))}
          </details>
          <details className="studio-panel">
            <summary>Homepage modules</summary>
            <ul className="module-list">
              {data.modules.map((m, i) => (
                <li key={m.id}>
                  <label className="check-label">
                    <input
                      type="checkbox"
                      checked={m.visible}
                      onChange={(e) =>
                        update({
                          ...data,
                          modules: data.modules.map((x) =>
                            x.id === m.id
                              ? { ...x, visible: e.target.checked }
                              : x,
                          ),
                        })
                      }
                    />
                    {m.label}
                  </label>
                  <button
                    disabled={i === 0}
                    aria-label={`Move ${m.label} up`}
                    onClick={() =>
                      update({
                        ...data,
                        modules: moveItem(data.modules, i, -1),
                      })
                    }
                  >
                    ↑
                  </button>
                  <button
                    disabled={i === data.modules.length - 1}
                    aria-label={`Move ${m.label} down`}
                    onClick={() =>
                      update({ ...data, modules: moveItem(data.modules, i, 1) })
                    }
                  >
                    ↓
                  </button>
                </li>
              ))}
            </ul>
          </details>
          <details className="studio-panel">
            <summary>House advertisement</summary>
            {(["eyebrow", "title", "cta"] as const).map((k) => (
              <Field
                key={k}
                label={`Ad ${k}`}
                value={data.ad[k]}
                onChange={(v) =>
                  update({ ...data, ad: { ...data.ad, [k]: v } })
                }
              />
            ))}
            <DestinationSelect
              value={data.ad.href}
              onChange={(href) => update({ ...data, ad: { ...data.ad, href } })}
            />
            <p className="meta">
              The SUGARMENU house ad label always remains visible.
            </p>
          </details>
          <details className="studio-panel">
            <summary>Authors</summary>
            {data.authors.map((a, i) => (
              <div key={a.slug}>
                <Field
                  label="Author name"
                  value={a.name}
                  onChange={(name) =>
                    update({
                      ...data,
                      authors: data.authors.map((x, j) =>
                        i === j ? { ...x, name } : x,
                      ),
                    })
                  }
                />
                <Field
                  label="Author bio"
                  value={a.bio}
                  multiline
                  onChange={(bio) =>
                    update({
                      ...data,
                      authors: data.authors.map((x, j) =>
                        i === j ? { ...x, bio } : x,
                      ),
                    })
                  }
                />
              </div>
            ))}
          </details>
          <details className="studio-panel">
            <summary>Publication display settings</summary>
            <Field
              label="Masthead tagline"
              value={data.publication.tagline}
              onChange={(tagline) =>
                update({
                  ...data,
                  publication: { ...data.publication, tagline },
                })
              }
            />
            <Field
              label="Footer line"
              value={data.publication.footerLine}
              onChange={(footerLine) =>
                update({
                  ...data,
                  publication: { ...data.publication, footerLine },
                })
              }
            />
            <label>
              Hero interval (3–30 seconds)
              <input
                type="number"
                min={3}
                max={30}
                value={data.publication.heroSeconds}
                onChange={(e) =>
                  update({
                    ...data,
                    publication: {
                      ...data.publication,
                      heroSeconds: Number(e.target.value),
                    },
                  })
                }
              />
            </label>
          </details>
          <details className="studio-panel">
            <summary>Local signup records · {records.length}</summary>
            <p>
              These are demo newsletter and community interest records from this
              browser only.
            </p>
            <button
              className="button"
              onClick={() => {
                try {
                  setRecords(readSubmissions());
                  setMessage("Local records refreshed.");
                } catch {
                  setError("Local signup records could not be read.");
                }
              }}
            >
              Refresh records
            </button>
            {records.length ? (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Interest</th>
                      <th>Saved locally</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={`${r.kind}:${r.email}`}>
                        <td>{r.email}</td>
                        <td>{r.kind}</td>
                        <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="delete-record"
                            aria-label={`Remove ${r.email} ${r.kind}`}
                            onClick={() => {
                              if (
                                !window.confirm(
                                  `Remove this local ${r.kind} demo record?`,
                                )
                              )
                                return;
                              try {
                                const next = readSubmissions().filter(
                                  (x) =>
                                    !(x.email === r.email && x.kind === r.kind),
                                );
                                localStorage.setItem(
                                  STORAGE.submissions,
                                  JSON.stringify(next),
                                );
                                setRecords(next);
                                setMessage("Local signup record removed.");
                              } catch {
                                setError(
                                  "The record could not be removed from browser storage.",
                                );
                              }
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="notice">No local signup records yet.</p>
            )}
          </details>
        </>
      )}
    </div>
  );
}
