import { StudioPreview } from "@/components/studio-preview";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "Studio preview, local demo",
  description: "A browser-local preview. It is not the published site.",
  path: "/studio/preview",
  index: false,
});
export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ article?: string }>;
}) {
  return <StudioPreview slug={(await searchParams).article} />;
}
