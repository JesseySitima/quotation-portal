"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_URL = "http://127.0.0.1:8000";

type QuotationItem = {
  id: string;
  quotation_request_id: string;
  product_id: string;
  product_name: string;
  sku: string | null;
  quantity: number;
  unit: string;
};

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

type QuotationResponse = {
  quotation: Quotation;
  items: QuotationItem[];
};

export default function QuotationDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<QuotationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingDone, setMarkingDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/v1/quotations/${id}`)
      .then(async (response) => {
        if (!response.ok) {
          const result = await response.json().catch(() => null);

          throw new Error(
            result?.detail || "Failed to load quotation"
          );
        }

        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message || "Failed to load quotation.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  async function markAsDone() {
    if (!data) return;

    setMarkingDone(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/v1/quotations/${id}/status`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        throw new Error(
          result?.detail || "Failed to mark quotation as done"
        );
      }

      const result = await response.json();

      setData({
        ...data,
        quotation: result.quotation,
      });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to mark quotation as done."
      );
    } finally {
      setMarkingDone(false);
    }
  }

  function printQuotation() {
    window.print();
  }

  function downloadPDF() {
    window.print();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-gray-500">
            Loading quotation...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <a
            href="/requests"
            className="text-sm text-blue-600 hover:text-blue-800 no-print"
          >
            ← Back to Requests
          </a>

          <div className="mt-6 bg-white rounded-xl border p-6">
            <p className="text-red-600">
              {error || "Quotation not found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const quotation = data.quotation;

  const formattedDate = new Date(
    quotation.created_at
  ).toLocaleString();

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 18mm;
          }

          body {
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .print-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .print-card {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            break-inside: avoid;
          }

          table {
            width: 100% !important;
          }

          tr {
            break-inside: avoid;
          }
        }
      `}</style>

      <main className="min-h-screen bg-gray-100 print:bg-white">
        {/* HEADER */}
        <header className="bg-white border-b no-print">
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

        <div className="print-container max-w-5xl mx-auto px-6 py-8">
          {/* BACK LINK */}
          <a
            href="/requests"
            className="text-sm text-blue-600 hover:text-blue-800 no-print"
          >
            ← Back to Requests
          </a>

          {/* TITLE + ACTIONS */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {quotation.request_number}
              </h2>

              <p className="mt-1 text-gray-500">
                Quotation request
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 no-print">
              {/* PRINT */}
              <button
                onClick={printQuotation}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                🖨️ Print
              </button>

              {/* DOWNLOAD PDF */}
              <button
                onClick={downloadPDF}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                📄 Download PDF
              </button>

              {/* MARK AS DONE */}
              {quotation.status === "DONE" ? (
                <span className="inline-flex rounded-lg bg-green-100 px-4 py-2.5 text-sm font-medium text-green-700">
                  ✓ DONE
                </span>
              ) : (
                <button
                  onClick={markAsDone}
                  disabled={markingDone}
                  className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {markingDone
                    ? "Marking as Done..."
                    : "Mark as Done"}
                </button>
              )}
            </div>
          </div>

          {/* PRINT HEADER */}
          <div className="hidden print:block mt-8">
            <div className="border-b pb-5">
              <h1 className="text-2xl font-bold text-gray-900">
                QUOTATION REQUEST
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Action Medeor Malawi
              </p>

              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <span className="font-medium">
                    Request Number:
                  </span>{" "}
                  {quotation.request_number}
                </div>

                <div>
                  <span className="font-medium">
                    Date:
                  </span>{" "}
                  {formattedDate}
                </div>
              </div>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 no-print">
              {error}
            </div>
          )}

          {/* REQUEST INFORMATION */}
          <div className="mt-8 bg-white rounded-xl border p-6 print-card">
            <h3 className="text-lg font-semibold text-gray-900">
              Request Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-sm text-gray-500">
                  Facility
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {quotation.facility_name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Contact Person
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {quotation.contact_person}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {quotation.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {quotation.email || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Date Submitted
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {formattedDate}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {quotation.status}
                </p>
              </div>
            </div>

            {quotation.notes && (
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Notes
                </p>

                <p className="mt-1 text-gray-900">
                  {quotation.notes}
                </p>
              </div>
            )}
          </div>

          {/* REQUESTED ITEMS */}
          <div className="mt-8 bg-white rounded-xl border overflow-hidden print-card">
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Requested Items
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      #
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Item
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      SKU
                    </th>

                    <th className="text-right px-6 py-4 font-medium text-gray-600">
                      Quantity
                    </th>

                    <th className="text-left px-6 py-4 font-medium text-gray-600">
                      Unit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {data.items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.product_name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {item.sku || "—"}
                      </td>

                      <td className="px-6 py-4 text-right font-medium text-gray-900">
                        {item.quantity.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {item.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PRINT FOOTER */}
          <div className="hidden print:block mt-10 pt-5 border-t text-sm text-gray-500">
            <div className="flex justify-between">
              <span>
                {quotation.request_number}
              </span>

              <span>
                Generated from Quotation Portal
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}