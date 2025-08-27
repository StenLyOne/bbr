import { fetchTeamContent } from "../../../lib/api/team";
import TeamClient from "./TeamClient";

import { DEFAULT_REVALIDATE } from "../../../lib/api/config";

export const revalidate = DEFAULT_REVALIDATE;

export default async function TeamPage() {
  const team = await fetchTeamContent();
  return <TeamClient team={team} />;
}
