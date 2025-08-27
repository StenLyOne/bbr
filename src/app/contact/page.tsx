// src/app/contact/page.tsx
import ContactClient from "./ContactClient";
import { fetchContactContent } from "../../../lib/api/contacts";

import { DEFAULT_REVALIDATE } from "../../../lib/api/config";

export const revalidate = DEFAULT_REVALIDATE;

export default async function ContactPage() {
  const data = await fetchContactContent();
  return <ContactClient data={data} />;
}
