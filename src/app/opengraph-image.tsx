import { ogImage, ogSize } from "@/components/og-card";

export const alt = "SUGARMENU — Indulge Yourself.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Lifestyle publication", "Indulge Yourself.");
}
