// src/app/contact/page.tsx
import ContactClient from "./ContactClient";
import { fetchContactContent } from "../../../lib/api/contacts";

export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE ?? 600);

export const revalidate = REVALIDATE_SECONDS;

export default async function ContactPage() {
  const data = await fetchContactContent();
  return <ContactClient data={data} />;
}
