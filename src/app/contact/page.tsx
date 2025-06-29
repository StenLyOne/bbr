// src/app/contact/page.tsx
import ContactClient from "./ContactClient";
import { fetchContactContent } from "../../../lib/api";

export default async function ContactPage() {
  const data = await fetchContactContent();
  return <ContactClient data={data} />;
}
