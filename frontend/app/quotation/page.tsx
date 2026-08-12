"use client";

import { useState } from "react";

export default function QuotationPage() {
  const [facilityName, setFacilityName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#171a17]">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173f2a] text-sm font-bold text-white">
            Q
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight">
              Quotation Portal
            </p>

            <p className="text-[11px] text-[#858c86]">
              Request a quotation
            </p>
          </div>
        </div>

        <a
          href="/"
          className="text-xs text-[#69716b] transition-colors hover:text-[#173f2a]"
        >
          ← Back
        </a>
      </header>

      {/* Main */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-20 pt-8 lg:px-8">
        {/* Page intro */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3f8f5f]">
            Request a quotation
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Tell us a little about you.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-[#69716b]">
            Start with your contact details. Then you&apos;ll be able to
            choose the products you need.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Your details */}
          <section className="rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[11px] font-bold tracking-[0.16em] text-[#3f8f5f]">
                01
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Your details
              </h2>

              <p className="mt-1.5 text-sm text-[#858c86]">
                How can our sales team reach you?
              </p>
            </div>

            <div className="space-y-5">
              {/* Facility */}
              <div>
                <label
                  htmlFor="facilityName"
                  className="mb-2 block text-sm font-medium"
                >
                  Facility / Company
                </label>

                <input
                  id="facilityName"
                  type="text"
                  value={facilityName}
                  onChange={(event) =>
                    setFacilityName(event.target.value)
                  }
                  placeholder="e.g. St. Mary's Hospital"
                  className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                />
              </div>

              {/* Contact person */}
              <div>
                <label
                  htmlFor="contactPerson"
                  className="mb-2 block text-sm font-medium"
                >
                  Contact person
                </label>

                <input
                  id="contactPerson"
                  type="text"
                  value={contactPerson}
                  onChange={(event) =>
                    setContactPerson(event.target.value)
                  }
                  placeholder="Your full name"
                  className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                />
              </div>

              {/* Email + phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="+265 ..."
                    className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Products placeholder */}
          <section className="rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-[11px] font-bold tracking-[0.16em] text-[#3f8f5f]">
                02
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                What do you need?
              </h2>

              <p className="mt-1.5 text-sm text-[#858c86]">
                Search and select the products you&apos;d like us to quote.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-[#cbd4cc] bg-[#fafbfa] p-8 text-center">
              <p className="text-sm font-medium text-[#69716b]">
                Product selection is next
              </p>

              <p className="mt-1 text-xs text-[#858c86]">
                We&apos;ll add search, categories, quantities, and selected
                items here.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}