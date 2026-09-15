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
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Quotation Portal
            </h1>
            <p className="text-sm text-gray-500">Administration</p>
          </div>

          <button className="text-sm text-gray-600 hover:text-gray-900">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

        <p className="mt-1 text-gray-500">
          Manage quotation requests and product catalog.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Pending Requests</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {loading ? "..." : pendingCount}
            </p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Completed Requests</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              {loading ? "..." : completedCount}
            </p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Catalog</p>

            <p className="text-3xl font-bold text-gray-900 mt-2">—</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Quotation Requests
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              View submitted requests and mark them as completed.
            </p>
            <a
              href="/requests"
              className="inline-block mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              View Requests
            </a>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Catalog
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Upload the latest quotation item catalog.
            </p>

            <button className="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
              Manage Catalog
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl border overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Requests
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-gray-500">
              Loading quotation requests...
            </div>
          ) : quotations.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No quotation requests found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium text-gray-600">
                      Request
                    </th>

                    <th className="text-left px-6 py-3 font-medium text-gray-600">
                      Facility
                    </th>

                    <th className="text-left px-6 py-3 font-medium text-gray-600">
                      Contact
                    </th>

                    <th className="text-left px-6 py-3 font-medium text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-3 font-medium text-gray-600">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {quotations.map((quotation) => (
                    <tr key={quotation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {quotation.request_number}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {quotation.facility_name}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {quotation.contact_person}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            quotation.status === "DONE"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {quotation.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {new Date(quotation.created_at).toLocaleDateString()}
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
