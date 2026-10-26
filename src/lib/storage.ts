export const STORAGE = {
  studio: "sugarmenu:studio:v1",
  submissions: "sugarmenu:submissions:v1",
  consent: "sugarmenu:consent:v1",
};
export interface Submission {
  email: string;
  kind: "newsletter" | "community";
  consent: true;
  createdAt: string;
}
export function readSubmissions(): Submission[] {
  const raw = localStorage.getItem(STORAGE.submissions);
  if (!raw) return [];
  const value: unknown = JSON.parse(raw);
  if (
    !Array.isArray(value) ||
    !value.every(
      (x) =>
        x &&
        typeof x.email === "string" &&
        ["newsletter", "community"].includes(x.kind) &&
        x.consent === true &&
        typeof x.createdAt === "string",
    )
  )
    throw new Error("Invalid local signup data");
  return value;
}
export function saveSubmission(email: string, kind: Submission["kind"]) {
  const records = readSubmissions();
  const normalized = email.trim().toLowerCase();
  if (records.some((x) => x.email === normalized && x.kind === kind))
    return "duplicate";
  records.push({
    email: normalized,
    kind,
    consent: true,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE.submissions, JSON.stringify(records));
  return "saved";
}
