import { fetchTeamContent } from "../../../lib/api/team";
import TeamClient from "./TeamClient";

export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE ?? 600);

export const revalidate = REVALIDATE_SECONDS;

export default async function TeamPage() {
  const team = await fetchTeamContent();
  return <TeamClient team={team} />;
}
