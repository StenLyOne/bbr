// src/app/our-owned-events/page.tsx

import OwnedEventsClient from "./OwnedEventsClient";
import {
  fetchOwnedEventSettings,
  fetchAllOwnedEvents,
} from "../../../lib/api/events";

export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE ?? 600);

export const revalidate = REVALIDATE_SECONDS;

export default async function OurOwnedEventsPage() {
  const [settings, events] = await Promise.all([
    fetchOwnedEventSettings(),
    fetchAllOwnedEvents(),
  ]);

  return <OwnedEventsClient settings={settings} events={events} />;
}
