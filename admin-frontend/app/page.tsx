"use client";

import { useEffect, useState } from "react";
import { getQuotations } from "@/lib/api";

type Quotation = {
  id: string;
  request_number: string;
  facility_name: string;
  contact_person: string;
  email: string | null;
  phone: string;
  notes: string | null;
  status: string;
  created_at: string;
};

export default function Home() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuotations()
      .then((data) => {
        setQuotations(data);
      })
      .catch((error) => {
        console.error("Failed to load quotations:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const pendingCount = quotations.filter(
    (quotation) => quotation.status === "PENDING",
  ).length;

  const completedCount = quotations.filter(
    (quotation) => quotation.status === "DONE",
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#171a17]">
      {/* Header */}
      <header className="border-b border-[#dfe4df] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <h1 className="text-xl font-semibold tracking-[-0.02em] text-[#171a17]">
              Quotation Portal
            </h1>

            <p className="mt-0.5 text-sm text-[#69716b]">
              Administration
            </p>
          </div>

          <button className="text-sm text-[#69716b] transition-colors hover:text-[#006BB4]">
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#171a17]">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-[#69716b]">
            Manage quotation requests and product catalog.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Pending */}
          <div className="rounded-2xl border border-[#dfe4df] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#69716b]">
                  Pending Requests
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#171a17]">
                  {loading ? "..." : pendingCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7df] text-[#9a7410]">
                <span className="text-sm font-bold">P</span>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-[#dfe4df] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#69716b]">
                  Completed Requests
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#171a17]">
                  {loading ? "..." : completedCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#21834b]">
                <span className="text-sm font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div className="rounded-2xl border border-[#dfe4df] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#69716b]">
                  Product Catalog
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#171a17]">
                  Active
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f4fa] text-[#006BB4]">
                <span className="text-sm font-bold">C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Requests */}
          <div className="rounded-2xl border border-[#dfe4df] bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4fa] text-[#006BB4]">
              <span className="text-sm font-bold">01</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-[#171a17]">
              Quotation Requests
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#69716b]">
              View submitted requests, review quotation items, and
              mark completed requests.
            </p>

            <a
              href="/requests"
              className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#006BB4] px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005A96] hover:shadow-md"
            >
              View Requests
            </a>
          </div>

          {/* Catalog */}
          <div className="rounded-2xl border border-[#dfe4df] bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f4fa] text-[#006BB4]">
              <span className="text-sm font-bold">02</span>
            </div>

            <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-[#171a17]">
              Product Catalog
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#69716b]">
              Upload the latest quotation item catalog received
              from BC and keep the product list up to date.
            </p>

            <a
              href="/catalog"
              className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#006BB4] px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#005A96] hover:shadow-md"
            >
              Manage Catalog
            </a>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#dfe4df] bg-white shadow-sm">
          <div className="border-b border-[#dfe4df] px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#171a17]">
                  Recent Requests
                </h3>

                <p className="mt-1 text-sm text-[#69716b]">
                  Latest quotation requests submitted through the portal.
                </p>
              </div>

              <a
                href="/requests"
                className="text-sm font-medium text-[#006BB4] hover:text-[#005A96]"
              >
                View all
              </a>
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-[#69716b]">
              Loading quotation requests...
            </div>
          ) : quotations.length === 0 ? (
            <div className="p-6 text-sm text-[#69716b]">
              No quotation requests found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#dfe4df] bg-[#f7f8f6]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#69716b]">
                      Request
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#69716b]">
                      Facility
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#69716b]">
                      Contact
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#69716b]">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#69716b]">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#edf0ed]">
                  {quotations.map((quotation) => (
                    <tr
                      key={quotation.id}
                      className="transition-colors hover:bg-[#f7f8f6]"
                    >
                      <td className="px-6 py-4 font-medium text-[#171a17]">
                        {quotation.request_number}
                      </td>

                      <td className="px-6 py-4 text-[#69716b]">
                        {quotation.facility_name}
                      </td>

                      <td className="px-6 py-4 text-[#69716b]">
                        {quotation.contact_person}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            quotation.status === "DONE"
                              ? "bg-[#eaf6ef] text-[#21834b]"
                              : "bg-[#fff7df] text-[#9a7410]"
                          }`}
                        >
                          {quotation.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-[#858c86]">
                        {new Date(
                          quotation.created_at,
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}