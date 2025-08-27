// this is now a server component
import EventManagementClient from "./EventManagementClient";
import { fetchEventManagementContent } from "../../../lib/api/events";

export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE ?? 600);

export const revalidate = REVALIDATE_SECONDS;

export default async function EventPage() {
  const data = await fetchEventManagementContent();
  return <EventManagementClient data={data} />;
}
