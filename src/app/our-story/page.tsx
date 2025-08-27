// src/app/our-story/page.tsx
import { fetchOurStoryContent } from "../../../lib/api/story";
import OurStoryClient from "./OurStoryClient";


export const revalidate = 2;

export default async function OurStoryPage() {
  const story = await fetchOurStoryContent(); // серверный вызов к WP
  console.log(story);
  return <OurStoryClient story={story} />;
}
