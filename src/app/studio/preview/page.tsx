import { StudioPreview } from "@/components/studio-preview";
export const metadata = { title: "Studio preview · Local demo" };
export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ article?: string }>;
}) {
  return <StudioPreview slug={(await searchParams).article} />;
}
