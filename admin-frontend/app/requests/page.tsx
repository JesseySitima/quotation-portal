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

export default function RequestsPage() {
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

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Quotation Portal
            </h1>

            <p className="text-sm text-gray-500">
              Administration
            </p>
          </div>

          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Dashboard
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Quotation Requests
            </h2>

            <p className="mt-1 text-gray-500">
              View and manage submitted quotation requests.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading quotation requests...
            </div>
          ) : quotations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No quotation requests found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Request
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Facility
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Contact Person
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Date
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {quotations.map((quotation) => (
                    <tr
                      key={quotation.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {quotation.request_number}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {quotation.facility_name}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {quotation.contact_person}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {quotation.phone}
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
                        {new Date(
                          quotation.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <a
                          href={`/requests/${quotation.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          View
                        </a>
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