import type { Metadata } from "next";
import Link from "next/link";
import { FaStore } from "react-icons/fa6";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { RiCalendarLine, RiTimeLine } from "react-icons/ri";
import { blogPosts } from "../../src/data/blogPosts";
import Footer from "../../src/components/footer/Footer";

const SITE_URL = "https://247market.org";

export const metadata: Metadata = {
  title: "Blog — Buying & Selling Guides",
  description:
    "Practical guides for buying and selling online in Nigeria — from pricing a car and spotting scams to taking better listing photos and renting an apartment in Lagos.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "247Market Blog — Buying & Selling Guides",
    description:
      "Practical guides for buying and selling online in Nigeria — pricing, scams, photos, and apartment hunting.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

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
          The 247Market Blog
        </span>
        <h1 className="font-sora text-[36px] font-extrabold text-navy mb-4 leading-[1.2] max-md:text-[26px]">
          Guides for buying &amp; selling smarter
        </h1>
        <p className="text-muted text-base leading-[1.7]">
          Practical, no-fluff advice for trading online in Nigeria — pricing, safety, photos and
          more.
        </p>
      </section>

      <section className="w-[90%] max-w-[900px] mx-auto pb-[100px] grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="bg-white border border-[#e7e2d8] rounded-2xl px-[26px] py-7 flex flex-col transition-[0.25s] hover:-translate-y-1 hover:shadow-[0_18px_30px_-16px_rgba(7,19,40,0.25)] hover:border-transparent"
          >
            <div className="flex items-center gap-4 text-xs text-muted mb-3">
              <span className="flex items-center gap-1.5">
                <RiCalendarLine /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <RiTimeLine /> {post.readTime}
              </span>
            </div>
            <h2 className="font-sora text-navy text-[19px] font-bold mb-2.5 leading-[1.35]">
              {post.title}
            </h2>
            <p className="text-muted text-sm leading-[1.6] mb-4">{post.excerpt}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-accent font-bold text-sm">
              Read article <HiOutlineArrowRight />
            </span>
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
}
