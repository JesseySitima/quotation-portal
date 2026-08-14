import Link from "next/link";
import QuotationHeader from "@/components/quotation/QuotationHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#171a17]">
      {/* Header */}
      <QuotationHeader
        subtitle="Simple. Fast. Convenient."
        rightContent={
          <div className="hidden items-center gap-6 text-xs text-[#69716b] sm:flex">
            <span>Need help?</span>

            <span className="h-4 w-px bg-[#dfe4df]" />

            <span>No account required</span>
          </div>
        }
      />

      {/* Main */}
      <section className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-6 pb-16 pt-8 lg:px-8">
        <div className="w-full">
          {/* Hero */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#006BB4]">
              Welcome
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Need a quotation?
            </h1>

            <h2 className="mt-2 text-xl font-medium tracking-[-0.03em] text-[#006BB4] sm:text-3xl lg:text-4xl">
              Let&apos;s make it simple.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#69716b] sm:text-lg">
              Tell us what you need, send your request to our sales team, and
              we&apos;ll get back to you.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col items-center">
              <Link
                href="/quotation"
                className="group flex h-14 items-center gap-3 rounded-2xl bg-[#006BB4] px-8 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005A96] hover:shadow-lg"
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              {/* Step 1 */}
              <div>
                <span className="text-[11px] font-bold tracking-[0.15em] text-[#006BB4]">
                  01
                </span>

                <h3 className="mt-2 text-sm font-semibold">
                  Choose your items
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#858c86]">
                  Browse categories or search for exactly what you need.
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <span className="text-[11px] font-bold tracking-[0.15em] text-[#006BB4]">
                  02
                </span>

                <h3 className="mt-2 text-sm font-semibold">
                  Tell us what you need
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#858c86]">
                  Add quantities and provide your contact details.
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <span className="text-[11px] font-bold tracking-[0.15em] text-[#006BB4]">
                  03
                </span>

                <h3 className="mt-2 text-sm font-semibold">
                  Send your request
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#858c86]">
                  Our sales team will review it and get back to you.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="pointer-events-none mx-auto mt-14 flex max-w-3xl justify-center">
            <div className="flex items-center gap-2">
              <span className="h-px w-12 bg-[#dfe4df]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#006BB4]" />
              <span className="h-px w-12 bg-[#dfe4df]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
