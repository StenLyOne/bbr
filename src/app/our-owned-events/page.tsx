// src/app/our-owned-events/page.tsx

import OwnedEventsClient from "./OwnedEventsClient";
import {
  fetchOwnedEventSettings,
  fetchAllOwnedEvents,
} from "../../../lib/api/events";

export const revalidate = 2;

export default async function OurOwnedEventsPage() {
  const [settings, events] = await Promise.all([
    fetchOwnedEventSettings(),
    fetchAllOwnedEvents(),
  ]);

  return <OwnedEventsClient settings={settings} events={events} />;
}
