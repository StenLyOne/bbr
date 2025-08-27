import HomeClient from "../../components/pages/HomeClient";
import { fetchHomeView } from "../../lib/api/home";

export const revalidate = 2;

export default async function Page() {
  const {
    hero,
    mission,
    events,
    mission_secondary,
    partners,
    latest,
    ownedEvents,
  } = await fetchHomeView();

  return (
    <HomeClient
      hero={hero}
      mission={mission}
      events={events}
      missionSecondary={mission_secondary}
      partners={partners}
      latest={latest}
      ownedEvents={ownedEvents}
    />
  );
}
