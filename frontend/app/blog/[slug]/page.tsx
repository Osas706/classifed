import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaStore } from "react-icons/fa6";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi2";
import { RiCalendarLine, RiTimeLine } from "react-icons/ri";
import { blogPosts, getBlogPost } from "../../../src/data/blogPosts";
import Footer from "../../../src/components/footer/Footer";

const SITE_URL = "https://247market.org";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Not Found" };

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) return notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "247Market" },
    publisher: { "@type": "Organization", name: "247Market", logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` } },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-sand text-navy-ink font-outfit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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

      <article className="w-[90%] max-w-[720px] mx-auto px-5 pt-5 pb-[90px]">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-accent font-bold text-sm mb-6">
          <HiOutlineArrowLeft /> Back to Blog
        </Link>

        <div className="flex items-center gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1.5">
            <RiCalendarLine /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <RiTimeLine /> {post.readTime}
          </span>
        </div>

        <h1 className="font-sora text-[30px] sm:text-[38px] font-extrabold text-navy mb-6 leading-[1.2]">
          {post.title}
        </h1>

        <div className="flex flex-col gap-5">
          {post.content.map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="font-sora text-navy text-xl font-bold mt-2">
                {block.replace("## ", "")}
              </h2>
            ) : (
              <p key={i} className="text-muted text-base leading-[1.75]">
                {block}
              </p>
            )
          )}
        </div>

        <div className="mt-10 bg-white border border-[#e7e2d8] rounded-2xl px-7 py-8 text-center">
          <h3 className="font-sora text-navy text-lg font-bold mb-2">Ready to trade on 247Market?</h3>
          <p className="text-muted text-sm mb-5">Browse thousands of listings or post your own in minutes.</p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-navy text-white px-[26px] py-3 rounded-full font-bold text-sm transition-[0.25s] hover:bg-navy-deep"
          >
            Go to Marketplace <HiOutlineArrowRight />
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="w-[90%] max-w-[900px] mx-auto pb-[100px]">
          <h2 className="font-sora text-navy text-xl font-bold mb-6 text-center">More from the blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                href={`/blog/${p.slug}`}
                key={p.slug}
                className="bg-white border border-[#e7e2d8] rounded-xl px-5 py-6 transition-[0.2s] hover:-translate-y-1 hover:shadow-[0_14px_26px_-14px_rgba(7,19,40,0.25)]"
              >
                <h3 className="text-navy text-sm font-bold leading-[1.4]">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
