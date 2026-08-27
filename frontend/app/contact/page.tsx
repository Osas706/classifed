import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaStore } from "react-icons/fa6";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { RiMailLine, RiTimeLine, RiMapPinLine } from "react-icons/ri";
import Footer from "../../src/components/footer/Footer";
import ContactForm from "./ContactForm";

const SITE_URL = "https://247market.org";
const SUPPORT_EMAIL = "support@247market.org";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the 247Market team. Send us a message or email support@247market.org — we're happy to help.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact 247Market",
    description: "Get in touch with the 247Market team — we're happy to help.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-sand text-navy-ink font-outfit">
      <header className="w-[90%] max-w-[1100px] mx-auto px-5 py-4 sm:py-6 flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
        <Link href="/" className="font-sora text-lg sm:text-[22px] font-extrabold text-navy flex items-center shrink-0">
          247
          <span className="text-navy-ink ml-px flex items-center gap-1">
            Market <FaStore />
          </span>
        </Link>

        <Link
          href="/app"
          className="w-full sm:w-auto justify-center bg-navy text-white px-4 sm:px-[22px] py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-[15px] flex items-center gap-2 transition-[0.25s] hover:bg-navy-deep"
        >
          Go to Marketplace <HiOutlineArrowRight />
        </Link>
      </header>

      <section className="w-[90%] max-w-[780px] mx-auto text-center px-5 pt-5 pb-[50px]">
        <span className="inline-block text-[13px] font-bold tracking-[0.06em] uppercase text-accent mb-3.5">
          Contact Us
        </span>
        <h1 className="font-sora text-[36px] font-extrabold text-navy mb-4 leading-[1.2] max-md:text-[26px]">
          We&apos;d love to hear from you
        </h1>
        <p className="text-muted text-base leading-[1.7]">
          Questions, feedback, or need a hand with your account? Send us a message and we&apos;ll
          get back to you as soon as we can.
        </p>
      </section>

      <section className="w-[90%] max-w-[900px] mx-auto pb-[100px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        <div className="flex flex-col gap-5">
          <div className="relative w-full h-[200px] sm:h-[240px] rounded-2xl overflow-hidden bg-[#f3ecdd]">
            <Image
              src="/contact-us.jpeg"
              alt="Illustration of a 247Market support agent ready to help buyers and sellers get in touch"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-6 flex items-start gap-4">
            <RiMailLine className="text-[24px] text-accent bg-accent-soft p-2 rounded-[10px] box-content shrink-0" />
            <div>
              <h3 className="font-sora text-navy font-bold text-[15px] mb-1">Email us</h3>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent font-bold text-sm hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-6 flex items-start gap-4">
            <RiTimeLine className="text-[24px] text-accent bg-accent-soft p-2 rounded-[10px] box-content shrink-0" />
            <div>
              <h3 className="font-sora text-navy font-bold text-[15px] mb-1">Response time</h3>
              <p className="text-muted text-sm">We typically reply within 1–2 business days.</p>
            </div>
          </div>

          <div className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-6 flex items-start gap-4">
            <RiMapPinLine className="text-[24px] text-accent bg-accent-soft p-2 rounded-[10px] box-content shrink-0" />
            <div>
              <h3 className="font-sora text-navy font-bold text-[15px] mb-1">Where we operate</h3>
              <p className="text-muted text-sm">Nigeria, Ghana, and across Africa.</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}
