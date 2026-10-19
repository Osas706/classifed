"use client";

import { useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RiShareForwardLine,
  RiLineChartLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiCodeSSlashLine,
  RiMapPin2Line,
  RiTimeLine,
  RiBriefcase4Line,
  RiSearchLine,
  RiCloseLine,
  RiCheckLine,
  RiSparklingLine,
  RiTeamLine,
  RiRocketLine,
  RiFlashlightLine,
  RiHeartPulseLine,
  RiBuildingLine,
  RiSendPlaneFill,
  RiInformationLine,
  RiAlertLine,
} from "react-icons/ri";
import { HiOutlineArrowRight } from "react-icons/hi2";

export interface JobRole {
  id: string;
  title: string;
  category: "Marketing" | "Growth" | "Operations & Distribution" | "Engineering" | "Customer Support";
  categoryKey: "social" | "marketing" | "distributor" | "other";
  workType: "Remote" | "Hybrid" | "On-site" | "Field";
  location: string;
  experience: string;
  salary: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
  isFeatured?: boolean;
}

// Jobs Data 
const JOBS: JobRole[] = [
  {
    id: "social-media-manager",
    title: "Social Media & Community Manager",
    category: "Marketing",
    categoryKey: "social",
    workType: "Remote",
    location: "Lagos, Nigeria (Remote Friendly)",
    experience: "2+ years",
    salary: "₦250,000 – ₦400,000 / month",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    icon: RiShareForwardLine,
    isFeatured: true,
    overview:
      "Be the authentic voice of 247Market across TikTok, Instagram, X (Twitter), and YouTube. Create viral short-form video content, celebrate African merchants, and nurture an active community of buyers and sellers.",
    responsibilities: [
      "Plan, script, and film high-impact TikTok, Instagram Reels, and YouTube Shorts showcasing marketplace deals and verified sellers.",
      "Manage real-time community engagement, replying to comments, DMs, mentions, and merchant feedback.",
      "Partner with local market creators, micro-influencers, and campus brand reps to drive organic marketplace adoption.",
      "Monitor viral trends, meme culture, and social metrics (reach, CTR, engagement) to refine our social roadmap.",
    ],
    requirements: [
      "2+ years managing social media channels for a consumer brand, startup, or e-commerce platform.",
      "Strong mobile video production and editing skills (CapCut, Premiere, InShot).",
      "Native pulse on Nigerian/African internet culture, slang, humor, and marketplace trends.",
      "Exceptional written communication and brand storytelling ability.",
    ],
    benefits: [
      "100% remote flexibility with home office & internet stipend.",
      "Performance incentives on viral campaigns and community growth.",
      "High creative freedom to experiment with new formats and campaigns.",
      "Health allowance and comprehensive team wellness support.",
    ],
    tags: ["TikTok", "Instagram Reels", "Content Strategy", "Community", "Video Editing"],
  },
  {
    id: "growth-marketer",
    title: "Growth & Performance Marketer",
    category: "Growth",
    categoryKey: "marketing",
    workType: "Hybrid",
    location: "Lagos, Nigeria (Hybrid / Remote)",
    experience: "3+ years",
    salary: "₦350,000 – ₦550,000 / month",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: RiLineChartLine,
    isFeatured: true,
    overview:
      "Spearhead performance marketing, user acquisition funnels, and retention strategies. Scale our active buyer base and merchant ad listings through high-ROI digital campaigns and local growth experiments.",
    responsibilities: [
      "Design, launch, and optimize paid acquisition campaigns across Meta Ads, Google Ads, TikTok Ads, and local ad networks.",
      "Analyze full-funnel buyer and seller journeys: tracking CAC, CAC-to-LTV, listing creation rates, and deal conversion.",
      "Develop creative A/B testing roadmaps for ad hooks, landing pages, and automated onboarding sequences.",
      "Partner with the product team to establish viral referral loops and localized promo campaigns.",
    ],
    requirements: [
      "3+ years in growth marketing or digital advertising with demonstrable experience scaling app or web platforms.",
      "Deep proficiency in Google Analytics 4, Meta Ads Manager, UTM architecture, and conversion attribution.",
      "Strong quantitative mindset with comfort in cohorts, retention curves, and spreadsheets.",
      "Familiarity with African consumer purchase behavior and payment dynamics.",
    ],
    benefits: [
      "Generous growth experiment budget and top-tier analytics tools.",
      "Flexible hybrid working schedule with transport stipends.",
      "Competitive base compensation + quarterly performance bonus.",
      "Mentorship and leadership pathway as the growth team expands.",
    ],
    tags: ["Meta Ads", "Google Ads", "Funnel Optimization", "SEO/SEM", "Cohort Analysis"],
  },
  {
    id: "regional-distributor",
    title: "Regional Distributor & Channel Lead",
    category: "Operations & Distribution",
    categoryKey: "distributor",
    workType: "Field",
    location: "Nationwide (Lagos, Abuja, Kano, Port Harcourt)",
    experience: "3+ years",
    salary: "₦300,000 – ₦480,000 / month + Field Allowances",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    icon: RiTruckLine,
    isFeatured: true,
    overview:
      "Drive on-ground merchant distribution, hub partnerships, and wholesale supplier networks. Coordinate regional distribution partners, trade union ties, and physical marketplace verification points.",
    responsibilities: [
      "Recruit, onboard, and manage regional retail distribution agents and neighborhood pick-up/verification points.",
      "Build relationships with merchant associations in key commercial hubs (e.g., Computer Village, Alaba International, Balogun Market).",
      "Coordinate distribution of 247Market merchant welcome kits, QR displays, and on-site marketing assets.",
      "Supervise on-ground field distribution reps to ensure rapid merchant onboarding and quality compliance.",
    ],
    requirements: [
      "3+ years experience in FMCG distribution, field sales management, or retail logistics operations.",
      "Strong network and comfort navigating commercial open markets and trade associations.",
      "Proven team leadership and localized route planning capabilities.",
      "Excellent negotiation, dispute resolution, and relationship-building skills.",
    ],
    benefits: [
      "Lucrative quarterly channel performance bonuses and field expense stipends.",
      "Official logistics and communication allowances.",
      "Direct leadership exposure across key commercial regions of Africa.",
      "Health insurance coverage and annual performance retreat.",
    ],
    tags: ["Wholesale Distribution", "Field Operations", "Merchant Onboarding", "Channel Sales", "Logistics"],
  },
  {
    id: "customer-support-specialist",
    title: "Trust, Safety & Customer Support Specialist",
    category: "Customer Support",
    categoryKey: "other",
    workType: "Remote",
    location: "Remote (Nigeria)",
    experience: "1+ years",
    salary: "₦200,000 – ₦300,000 / month",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    icon: RiShieldCheckLine,
    overview:
      "Protect our marketplace community by reviewing listings, verifying sellers, and delivering empathetic, prompt support to buyers and merchants.",
    responsibilities: [
      "Handle incoming inquiries from buyers and sellers via email, live chat, and social channels.",
      "Review flagged ads, verify seller credentials, and detect fraudulent listings before publication.",
      "Mediate dispute resolutions between buyers and sellers with utmost fairness and transparency.",
    ],
    requirements: [
      "1+ years customer service experience with strong written English communication.",
      "High emotional intelligence, calm problem-solving ability, and customer empathy.",
      "Experience with ticketing systems and dispute resolution.",
    ],
    benefits: [
      "100% remote setup with workstation allowance.",
      "Continuous training on fraud prevention and trust moderation.",
      "Health allowance and scheduled weekend rotation stipends.",
    ],
    tags: ["Customer Success", "Trust & Safety", "KYC Verification", "Dispute Resolution"],
  },
  {
    id: "frontend-engineer",
    title: "Senior Frontend Engineer (Next.js & React)",
    category: "Engineering",
    categoryKey: "other",
    workType: "Remote",
    location: "Remote (Africa)",
    experience: "4+ years",
    salary: "Competitive Compensation",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    icon: RiCodeSSlashLine,
    overview:
      "Craft modern, blazingly fast, and intuitive user experiences for millions of buyers and sellers across Africa using Next.js, TypeScript, and Tailwind CSS.",
    responsibilities: [
      "Build responsive, high-performance web and PWA features across marketplace discovery, chat, and ad management.",
      "Optimize core web vitals, image delivery, and client-side caching for low-bandwidth mobile devices.",
      "Collaborate closely with product designers and backend engineers to launch seamless commerce features.",
    ],
    requirements: [
      "4+ years deep expertise in React, Next.js (App Router), TypeScript, and Tailwind CSS.",
      "Proven experience building performant consumer-facing web applications.",
      "Passion for clean component architecture and delightful micro-interactions.",
    ],
    benefits: [
      "Flexible remote working hours across African timezones.",
      "Top-tier hardware allowance and learning budget.",
      "Equity/profit-sharing incentives for core contributors.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web Performance"],
  },
];

const PERKS = [
  {
    icon: RiRocketLine,
    title: "High Impact Mission",
    desc: "Empower everyday African entrepreneurs and small business owners to sell around the clock without middlemen.",
  },
  {
    icon: RiFlashlightLine,
    title: "Fast-Paced Innovation",
    desc: "Work with ambitious builders where decisions are made swiftly and good ideas go straight into production.",
  },
  {
    icon: RiTeamLine,
    title: "Remote-First Flexibility",
    desc: "Work from anywhere with internet access. We focus on outcomes, clear communication, and balanced lives.",
  },
  {
    icon: RiHeartPulseLine,
    title: "Competitive Pay & Health",
    desc: "Fair compensation benchmarks, wellness packages, performance bonuses, and tools to do your best work.",
  },
];

export default function CareerClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeJobModal, setActiveJobModal] = useState<JobRole | null>(null);
  const [talentEmail, setTalentEmail] = useState<string>("");
  const [talentRole, setTalentRole] = useState<string>("Marketing");
  const [talentSubmitting, setTalentSubmitting] = useState<boolean>(false);

  // Trigger toast notification when user attempts to apply
  const handleApplyClick = (job: JobRole) => {
    // Show toast message explicitly stating that the offer is not currently available
    toast.warn(
      `Offer not currently available for ${job.title}. We are currently reviewing existing submissions and not accepting new applications at this time.`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
  };

  const handleTalentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!talentEmail) return;

    setTalentSubmitting(true);
    setTimeout(() => {
      setTalentSubmitting(false);
      setTalentEmail("");
      toast.info(
        "Offer not currently available. Thank you for your interest — your email has been saved to our talent alert pool for future openings!",
        {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        }
      );
    }, 500);
  };

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "social" && job.categoryKey === "social") ||
        (selectedCategory === "marketing" && (job.categoryKey === "marketing" || job.categoryKey === "social")) ||
        (selectedCategory === "distributor" && job.categoryKey === "distributor") ||
        (selectedCategory === "other" && job.categoryKey === "other");

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* Toast container configured for clear visibility */}
      <ToastContainer
        position="top-center"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Hero Section */}
      <section className="overflow-hidden relative pt-6 pb-12 sm:pt-10 sm:pb-16">
        <div className="w-[90%] max-w-[1000px] mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-accent font-bold text-xs uppercase tracking-wider mb-5">
            <RiSparklingLine className="text-sm" />
            <span>Join Our Mission • We&apos;re Growing</span>
          </div>

          <h1 className="font-sora text-3xl sm:text-5xl font-extrabold text-navy mb-5 tracking-tight leading-[1.18]">
            Build the future of <span className="underline text-accent decoration-accent/30 underline-offset-8">African commerce</span>.
          </h1>

          <p className="text-muted text-base sm:text-lg max-w-[720px] mx-auto leading-relaxed mb-8">
            247Market connects everyday buyers and sellers across Nigeria and Africa with
            transparent, verified, middleman-free trade. Explore our open positions in marketing,
            community growth, distribution, and engineering.
          </p>

          <div className="flex flex-wrap gap-3 justify-center items-center pt-2 text-sm font-medium sm:gap-6 text-navy-ink/80">
            <span className="flex items-center gap-1.5 bg-white border border-[#e7e2d8] px-3.5 py-1.5 rounded-full shadow-sm">
              <RiTeamLine className="text-base text-accent" /> Fast-Growing Team
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-[#e7e2d8] px-3.5 py-1.5 rounded-full shadow-sm">
              <RiFlashlightLine className="text-base text-accent" /> High Ownership
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-[#e7e2d8] px-3.5 py-1.5 rounded-full shadow-sm">
              <RiBuildingLine className="text-base text-accent" /> Remote & Hybrid Roles
            </span>
          </div>
        </div>
      </section>

      {/* Perks / Culture Section */}
      <section className="w-[90%] max-w-[1100px] mx-auto pb-14 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="bg-white border border-[#e7e2d8] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-center items-center mb-4 w-11 h-11 rounded-xl bg-accent-soft text-accent">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="mb-2 text-base font-bold font-sora text-navy">{perk.title}</h3>
                <p className="text-xs leading-relaxed text-muted sm:text-sm">{perk.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="w-[90%] max-w-[1100px] mx-auto pb-16 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#e7e2d8] pb-6">
          <div>
            <span className="inline-block text-[13px] font-bold tracking-[0.06em] uppercase text-accent mb-2">
              Current Openings
            </span>
            <h2 className="text-2xl font-extrabold font-sora sm:text-3xl text-navy">
              Available Positions ({filteredJobs.length})
            </h2>
            <p className="mt-1 text-sm text-muted">
              Find your next career chapter and help power 24/7 commerce across Africa.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-[280px]">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-lg pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#e7e2d8] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 p-1 text-sm -translate-y-1/2 text-muted hover:text-navy"
                aria-label="Clear search"
              >
                <RiCloseLine />
              </button>
            )}
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 items-center mb-8">
          {[
            { id: "all", label: "All Roles" },
            { id: "social", label: "Social Media Management" },
            { id: "marketing", label: "Marketing & Growth" },
            { id: "distributor", label: "Distributors & Operations" },
            { id: "other", label: "Other Departments" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-navy text-white shadow-sm"
                  : "bg-white text-navy/70 border border-[#e7e2d8] hover:bg-sand hover:text-navy"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Job Listings List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-[#e7e2d8] rounded-2xl p-10 text-center">
            <RiInformationLine className="mx-auto mb-3 text-4xl text-muted" />
            <h3 className="mb-1 text-lg font-bold font-sora text-navy">No roles matched your search</h3>
            <p className="text-muted text-sm max-w-[400px] mx-auto mb-4">
              Try adjusting your search query or reset your department filter to view other openings.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 text-xs font-semibold text-white rounded-full transition-all bg-navy hover:bg-navy-deep"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredJobs.map((job) => {
              const Icon = job.icon;
              return (
                <div
                  key={job.id}
                  className="bg-white border border-[#e7e2d8] rounded-2xl p-5 sm:p-7 transition-all duration-200 hover:border-accent/40 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex flex-1 gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <Icon className="text-2xl" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${job.badgeColor}`}>
                          {job.category}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sand text-navy/70 border border-[#e7e2d8]">
                          {job.workType}
                        </span>
                        {job.isFeatured && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent text-white flex items-center gap-1">
                            <RiSparklingLine className="text-xs" /> Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold leading-snug font-sora sm:text-xl text-navy">
                        {job.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-muted sm:text-sm line-clamp-2">
                        {job.overview}
                      </p>

                      <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-navy/70 pt-1 font-medium">
                        <span className="flex gap-1 items-center">
                          <RiMapPin2Line className="text-accent" /> {job.location}
                        </span>
                        <span className="flex gap-1 items-center">
                          <RiBriefcase4Line className="text-accent" /> {job.experience}
                        </span>
                        <span className="flex gap-1 items-center">
                          <RiTimeLine className="text-accent" /> {job.salary}
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] bg-sand px-2 py-0.5 rounded-md text-navy/60 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-end gap-2.5 pt-2 md:pt-0 border-t sm:border-t-0 border-[#e7e2d8]/60 shrink-0">
                    <button
                      onClick={() => setActiveJobModal(job)}
                      className="flex-1 sm:flex-initial text-center px-4 py-2.5 rounded-xl border border-[#e7e2d8] text-navy font-bold text-xs sm:text-sm hover:bg-sand transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl bg-navy text-white font-bold text-xs sm:text-sm hover:bg-navy-deep transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Apply Now</span>
                      <HiOutlineArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Talent Network Alert Section */}
      <section className="w-[90%] max-w-[1100px] mx-auto pb-16 px-4">
        <div className="overflow-hidden relative p-6 text-white bg-gradient-to-br rounded-3xl shadow-xl from-navy to-navy-deep sm:p-10">
          <div className="relative z-10 max-w-[620px]">
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-accent-soft mb-2.5">
              Don&apos;t see the right match?
            </span>
            <h2 className="mb-3 text-2xl font-extrabold text-white font-sora sm:text-3xl">
              Join Our Talent Network
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base">
              We&apos;re continuously growing our social media, regional distribution, and marketing
              operations across Nigeria. Leave your email and we&apos;ll notify you when new opportunities open.
            </p>

            <form onSubmit={handleTalentSubmit} className="flex flex-col gap-3 sm:flex-row">
              <select
                value={talentRole}
                onChange={(e) => setTalentRole(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-xl px-3.5 py-3 text-sm outline-none focus:border-accent focus:bg-white/15 transition-all"
              >
                <option value="Social Media" className="text-navy">Social Media Management</option>
                <option value="Marketing" className="text-navy">Marketing & Growth</option>
                <option value="Distributor" className="text-navy">Distribution & Field Ops</option>
                <option value="Engineering" className="text-navy">Engineering & Tech</option>
                <option value="Other" className="text-navy">Other Roles</option>
              </select>

              <input
                type="email"
                required
                value={talentEmail}
                onChange={(e) => setTalentEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-sm text-white rounded-xl border transition-all outline-none bg-white/10 border-white/20 placeholder-white/50 focus:border-accent focus:bg-white/15"
              />

              <button
                type="submit"
                disabled={talentSubmitting}
                className="flex gap-2 justify-center items-center px-6 py-3 text-sm font-bold whitespace-nowrap rounded-xl shadow-md transition-all bg-accent hover:bg-accent/90 text-navy-ink"
              >
                <span>{talentSubmitting ? "Joining..." : "Get Notified"}</span>
                <RiSendPlaneFill className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Detailed Job Modal */}
      {activeJobModal && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-navy-deep/60 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-[680px] w-full max-h-[90vh] overflow-y-auto border border-[#e7e2d8] shadow-2xl relative">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-[#e7e2d8] p-5 sm:p-6 flex items-start justify-between gap-4 z-10">
              <div className="flex gap-3 items-center">
                <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-accent-soft text-accent shrink-0">
                  <activeJobModal.icon className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sora sm:text-xl text-navy">
                    {activeJobModal.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted mt-0.5">
                    <span>{activeJobModal.category}</span>
                    <span>•</span>
                    <span>{activeJobModal.workType}</span>
                    <span>•</span>
                    <span>{activeJobModal.location}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveJobModal(null)}
                className="text-muted hover:text-navy p-1.5 rounded-lg hover:bg-sand transition-all"
                aria-label="Close dialog"
              >
                <RiCloseLine className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-6 sm:p-6">
              {/* Notice banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
                <RiAlertLine className="text-amber-600 text-lg shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Application Notice:</span> Openings are high-demand and
                  currently undergoing cohort review. Clicking apply below will confirm availability status.
                </div>
              </div>

              {/* Overview */}
              <div>
                <h4 className="font-sora text-sm font-bold text-navy mb-2 uppercase tracking-wider text-[11px]">
                  About The Role
                </h4>
                <p className="text-muted text-sm sm:text-[15px] leading-relaxed">
                  {activeJobModal.overview}
                </p>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-sand/60 p-4 rounded-xl border border-[#e7e2d8]">
                <div>
                  <span className="text-[11px] text-muted uppercase font-bold block">Location</span>
                  <span className="text-xs font-semibold sm:text-sm text-navy">{activeJobModal.location}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted uppercase font-bold block">Experience</span>
                  <span className="text-xs font-semibold sm:text-sm text-navy">{activeJobModal.experience}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted uppercase font-bold block">Estimated Salary</span>
                  <span className="text-xs font-semibold sm:text-sm text-navy">{activeJobModal.salary}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="mb-3 text-sm font-bold font-sora text-navy">Key Responsibilities</h4>
                <ul className="space-y-2 text-sm text-navy/80">
                  {activeJobModal.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <RiCheckLine className="text-accent text-base shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="mb-3 text-sm font-bold font-sora text-navy">Requirements & Skills</h4>
                <ul className="space-y-2 text-sm text-navy/80">
                  {activeJobModal.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <RiCheckLine className="text-accent text-base shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="mb-3 text-sm font-bold font-sora text-navy">What We Offer</h4>
                <ul className="space-y-2 text-sm text-navy/80">
                  {activeJobModal.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <RiCheckLine className="text-accent text-base shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-[#e7e2d8] p-5 sm:p-6 flex items-center justify-between gap-4">
              <button
                onClick={() => setActiveJobModal(null)}
                className="px-5 py-2.5 rounded-xl border border-[#e7e2d8] text-navy font-bold text-sm hover:bg-sand transition-all"
              >
                Close
              </button>
              <button
                onClick={() => handleApplyClick(activeJobModal)}
                className="px-6 py-2.5 rounded-xl bg-navy text-white font-bold text-sm hover:bg-navy-deep transition-all shadow flex items-center gap-2"
              >
                <span>Submit Application</span>
                <HiOutlineArrowRight className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
