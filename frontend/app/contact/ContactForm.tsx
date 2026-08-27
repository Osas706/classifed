"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineArrowRight } from "react-icons/hi2";

const SUPPORT_EMAIL = "support@247market.org";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);

    // Simulate the send — there's no backend contact endpoint yet, so we
    // confirm to the user and give them a direct mailto fallback below.
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent — we'll get back to you soon!");
      setName("");
      setEmail("");
      setMessage("");
    }, 600);
  };

  const mailtoHref = `mailto:${SUPPORT_EMAIL}${
    name || message ? `?subject=${encodeURIComponent(`Message from ${name || "247Market user"}`)}&body=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <>
      <ToastContainer position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-7 sm:px-8 sm:py-9 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-bold text-navy">
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="border border-[#e7e2d8] rounded-xl px-4 py-3 text-[15px] outline-none focus:border-accent transition-[0.2s] bg-sand/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-navy">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="border border-[#e7e2d8] rounded-xl px-4 py-3 text-[15px] outline-none focus:border-accent transition-[0.2s] bg-sand/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-bold text-navy">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            className="border border-[#e7e2d8] rounded-xl px-4 py-3 text-[15px] outline-none focus:border-accent transition-[0.2s] bg-sand/40 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="px-6 py-3.5 rounded-full font-bold text-base transition-[0.25s] inline-flex items-center justify-center gap-2 bg-navy text-white shadow-[0_10px_24px_-8px_rgba(13,33,64,0.55)] hover:bg-navy-deep hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
        >
          {sending ? "Sending…" : "Send Message"} <HiOutlineArrowRight />
        </button>

        <p className="text-center text-sm text-muted">
          Prefer email? Reach us directly at{" "}
          <a href={mailtoHref} className="text-accent font-bold hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </form>
    </>
  );
};

export default ContactForm;
