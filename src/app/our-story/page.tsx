// src/app/our-story/page.tsx
import { fetchOurStoryContent } from "../../../lib/api/story";
import OurStoryClient from "./OurStoryClient";

export const revalidate = 60;

export default async function OurStoryPage() {
  const story = await fetchOurStoryContent(); // серверный вызов к WP

  return <OurStoryClient story={story} />;
}
