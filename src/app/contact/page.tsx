// src/app/contact/page.tsx
import ContactClient from "./ContactClient";
import { fetchContactContent } from "../../../lib/api/contacts";

export const revalidate = 60;

export default async function ContactPage() {
  const data = await fetchContactContent();
  return <ContactClient data={data} />;
}
