// app/site/contact/page.tsx  →  /contact
import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our expert team. Whether you're looking to buy, sell, or rent - we're here to guide you.",
};

export default function ContactPage() {
  return <ContactClient />;
}
