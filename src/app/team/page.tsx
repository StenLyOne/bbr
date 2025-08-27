import { fetchTeamContent } from "../../../lib/api/team";
import TeamClient from "./TeamClient";

export const revalidate = 2;

export default async function TeamPage() {
  const team = await fetchTeamContent();
  return <TeamClient team={team} />;
}
