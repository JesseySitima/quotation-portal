"use client";

import Link from "next/link";
import QuotationHeader from "@/components/quotation/QuotationHeader";
import HelpPopover from "@/components/quotation/HelpPopover";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  useCategories();
  useProducts({
    search: undefined,
    category_id: undefined,
    page: 1,
    page_size: 20,
  });
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#171a17]">
      {/* Header */}
      <QuotationHeader
        subtitle="Simple. Fast. Convenient."
        rightContent={
          <div className="flex items-center gap-4 text-xs text-[#69716b] sm:gap-6">
            <HelpPopover
              whatsappNumber="265881063608"
              phoneNumber="265881063608"
            />

            <span className="h-4 w-px bg-[#dfe4df]" />
          </div>
        }
      />

      {/* Main */}
      <section className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-6 pb-16 pt-8 lg:px-8">
        <div className="w-full">
          {/* Hero */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Need a quotation?
            </h1>
            <h2 className="mt-2 text-base font-medium tracking-[-0.02em] text-[#006BB4] sm:text-xl lg:text-2xl">
              Make your request in two easy steps.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#69716b] sm:text-lg">
              Tell us what you need and we&apos;ll get back to you.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col items-center">
              <Link
                href="/quotation"
                className="group flex h-12 items-center gap-3 rounded-xl bg-[#006BB4] px-7 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005A96] hover:shadow-lg"
              >
                Start a quotation request
              </Link>

              <p className="mt-3 text-xs text-[#8a918b]">
                No sign-up or login required
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mx-auto mt-20 max-w-3xl border-t border-[#dfe4df] pt-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
              {/* Step 1 */}
              <div>
                <span className="text-[11px] font-bold tracking-[0.15em] text-[#006BB4]">
                  01
                </span>

                <h3 className="mt-2 text-sm font-semibold">
                  Choose your items
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#858c86]">
                  Search for what you need, then add the quantities.
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <span className="text-[11px] font-bold tracking-[0.15em] text-[#006BB4]">
                  02
                </span>

                <h3 className="mt-2 text-sm font-semibold">
                  Submit your request
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#858c86]">
                  Provide your contact details and send your quotation request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
