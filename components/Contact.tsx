"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import type { SlideRenderProps } from "./ScrollExperience";

const ParticleSphere = dynamic(() => import("./ParticleSphere"), { ssr: false });

export default function Contact({ active }: SlideRenderProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div data-slide-content className="grid-bg relative h-full overflow-y-auto px-6 md:px-10 pt-24 pb-16">
      <div className="relative z-10 grid md:grid-cols-3 border hairline">
        <div className="border-r hairline">
          <div className="p-6 border-b hairline">
            <h3 className="text-2xl font-light mb-4">CONTACT</h3>
            <div className="space-y-2 text-sm" style={{ color: "var(--fg-muted)" }}>
              <div>mashoodsajad@gmail.com</div>
              <div>+91 85906 42470</div>
              <a href="#" className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
                <HiOutlineChatBubbleLeftRight size={14} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-light mb-4">INFORMATION</h3>
            <div className="space-y-1 text-sm" style={{ color: "var(--fg-muted)" }}>
              <div>Example Street 1</div>
              <div>1011 AB Amsterdam, The Netherlands</div>
              <div className="pt-2 text-xs" style={{ color: "var(--fg-faint)" }}>
                NL000000000B00
              </div>meshblob
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center border-r hairline min-h-[320px]">
          {/* <ParticleSphere active={active} className="w-64 h-64" /> */}
        </div>

        <div>
          <h3 className="text-2xl font-light p-6 pb-0 mb-2">CONNECT</h3>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              required
              type="text"
              placeholder="Your name"
              className="p-6 border-b hairline text-sm placeholder:text-[var(--fg-faint)]"
            />
            <input
              required
              type="email"
              placeholder="your.email@example.com"
              className="p-6 border-b hairline text-sm placeholder:text-[var(--fg-faint)]"
            />
            <input
              type="tel"
              placeholder="+31 6 1234 5678"
              className="p-6 border-b hairline text-sm placeholder:text-[var(--fg-faint)]"
            />
            <textarea
              required
              placeholder="Tell me about your project..."
              rows={4}
              className="p-6 border-b hairline text-sm resize-none placeholder:text-[var(--fg-faint)]"
            />
            <button
              type="submit"
              className="p-6 text-sm tracking-wide hover:bg-[var(--surface)] transition-colors cursor-pointer"
            >
              {sent ? "Message sent ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between mt-6 border hairline text-sm">
        <div className="px-6 py-4" style={{ color: "var(--fg-muted)" }}>
          vanLent &copy; {new Date().getFullYear()}
        </div>
        <div className="flex">
          <a href="#" className="px-6 py-4 border-l hairline hover:text-[var(--accent)] transition-colors">
            Privacy policy
          </a>
          <a href="#" className="px-6 py-4 border-l hairline hover:text-[var(--accent)] transition-colors">
            Terms of service
          </a>
        </div>
      </div>
    </div>
  );
}
