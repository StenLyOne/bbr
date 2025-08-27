// src/app/our-story/page.tsx
import { fetchOurStoryContent } from "../../../lib/api/story";
import OurStoryClient from "./OurStoryClient";

export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE ?? 600);

export const revalidate = REVALIDATE_SECONDS;

export default async function OurStoryPage() {
  const story = await fetchOurStoryContent(); // серверный вызов к WP
  console.log(story)
  return <OurStoryClient story={story} />;
}
