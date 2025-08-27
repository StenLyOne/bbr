// this is now a server component
import EventManagementClient from "./EventManagementClient";
import { fetchEventManagementContent } from "../../../lib/api/events";
import { DEFAULT_REVALIDATE } from "../../../lib/api/config";

export const revalidate = DEFAULT_REVALIDATE;

export default async function EventPage() {
  const data = await fetchEventManagementContent();
  return <EventManagementClient data={data} />;
}
