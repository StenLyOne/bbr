// src/app/our-story/page.tsx
import { fetchOurStoryContent } from "../../../lib/api/story";
import OurStoryClient from "./OurStoryClient";

import { DEFAULT_REVALIDATE } from "../../../lib/api/config";

export const revalidate = DEFAULT_REVALIDATE;

export default async function OurStoryPage() {
  const story = await fetchOurStoryContent(); // серверный вызов к WP
  console.log(story);
  return <OurStoryClient story={story} />;
}
