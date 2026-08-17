"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";

interface HelpPopoverProps {
  whatsappNumber: string;
  phoneNumber: string;
}

export default function HelpPopover({
  whatsappNumber,
  phoneNumber,
}: HelpPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close with Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="group flex items-center gap-1.5 text-xs text-[#69716b] transition-colors duration-200 hover:text-[#006BB4]"
      >
        <span>Need help?</span>
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Help options"
          className="absolute right-0 top-full z-50 mt-3 w-64 origin-top-right animate-[helpIn_180ms_ease-out] overflow-hidden rounded-2xl border border-[#e2e6e2] bg-white p-2 shadow-[0_12px_40px_rgba(23,26,23,0.10)]"
        >
          {/* Header */}
          <div className="px-3 pb-2.5 pt-2">
            <p className="text-sm font-semibold text-[#171a17]">Need a hand?</p>

            <p className="mt-1 text-xs leading-5 text-[#858c86]">
              Our team is happy to help with your quotation.
            </p>
          </div>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f8f5]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5fa] text-[#006BB4] transition-transform duration-200 group-hover:scale-105">
              <MessageCircle size={19} strokeWidth={1.8} />
            </span>

            <span className="min-w-0">
              <span className="block text-xs font-semibold text-[#171a17]">
                WhatsApp
              </span>

              <span className="mt-0.5 block text-[11px] text-[#858c86]">
                Chat with our team
              </span>
            </span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${phoneNumber}`}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f8f5]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5fa] text-[#006BB4] transition-transform duration-200 group-hover:scale-105">
              <Phone size={18} strokeWidth={1.8} />
            </span>

            <span className="min-w-0">
              <span className="block text-xs font-semibold text-[#171a17]">
                Call us
              </span>

              <span className="mt-0.5 block text-[11px] text-[#858c86]">
                Speak with our team
              </span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
