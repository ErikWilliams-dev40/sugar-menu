import { baseData } from "@/content/fixtures";
import { HomeView } from "@/components/editorial-views";
import { pageMetadata } from "@/lib/metadata";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <HomeView data={baseData} />;
}
