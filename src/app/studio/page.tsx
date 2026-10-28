import { Studio } from "@/components/studio";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "Editorial studio, local demo",
  description:
    "Unattended local editing. Saved changes stay in this browser and are not published.",
  path: "/studio",
  index: false,
});
export default function StudioPage() {
  return <Studio />;
}
