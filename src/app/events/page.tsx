// this is now a server component
import EventManagementClient from "./EventManagementClient";
import { fetchEventManagementContent } from "../../../lib/api/events";
export const revalidate = 2;

export default async function EventPage() {
  const data = await fetchEventManagementContent();
  return <EventManagementClient data={data} />;
}
