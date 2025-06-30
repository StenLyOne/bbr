// this is now a server component
import EventManagementClient from "./EventManagementClient";
import { fetchEventPageContent } from "../../../lib/api";

export const dynamic = "force-dynamic"; // if you need ISR/SSR per request

export default async function EventPage() {
  const data = await fetchEventPageContent();
  return <EventManagementClient data={data} />;
}
