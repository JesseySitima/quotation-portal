"use client";

import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

type UploadResult = {
  message: string;
  filename: string;
  rows_processed: number;
  new_products: number;
  existing_products: number;
  products_updated: number;
};

export default function CatalogPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) {
      setError("Please select an Excel file first.");
      return;
    }

    setUploading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${API_URL}/api/v1/catalog/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (typeof data.detail === "object") {
          throw new Error(
            data.detail.message || "Catalog upload failed.",
          );
        }

        throw new Error(
          data.detail || "Catalog upload failed.",
        );
      }

      setResult(data);
      setFile(null);

      const fileInput = document.getElementById(
        "catalog-file",
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Catalog upload failed.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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
            Back to Dashboard
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Product Catalog
        </h2>

        <p className="mt-1 text-gray-500">
          Upload the latest product catalog received from BC.
        </p>

        <div className="mt-8 bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Upload Latest Catalog
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Use the official BC Excel template with these columns:
          </p>

          <div className="mt-4 rounded-lg bg-gray-50 border p-4">
            <p className="text-sm font-medium text-gray-700">
              No. &nbsp; | &nbsp; Description &nbsp; | &nbsp;
              Storage Place &nbsp; | &nbsp; Base Unit of Measure
            </p>
          </div>

          <div className="mt-6">
            <label
              htmlFor="catalog-file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Excel File
            </label>

            <input
              id="catalog-file"
              type="file"
              accept=".xlsx,.xlsm"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setError("");
                setResult(null);
              }}
              className="block w-full text-sm text-gray-700
                file:mr-4 file:rounded-lg file:border-0
                file:bg-black file:px-4 file:py-2
                file:text-sm file:font-medium file:text-white
                hover:file:bg-gray-800"
            />
          </div>

          {file && (
            <div className="mt-4 rounded-lg border bg-gray-50 p-4">
              <p className="text-sm text-gray-700">
                Selected file:
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {file.name}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5">
              <p className="font-semibold text-green-800">
                Catalog uploaded successfully
              </p>

              <p className="mt-1 text-sm text-green-700">
                {result.filename}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                <div className="bg-white rounded-lg border p-4">
                  <p className="text-xs text-gray-500">
                    Rows Processed
                  </p>

                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {result.rows_processed}
                  </p>
                </div>

                <div className="bg-white rounded-lg border p-4">
                  <p className="text-xs text-gray-500">
                    New Products
                  </p>

                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {result.new_products}
                  </p>
                </div>

                <div className="bg-white rounded-lg border p-4">
                  <p className="text-xs text-gray-500">
                    Updated Products
                  </p>

                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {result.existing_products}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Upload Catalog"}
            </button>

            <a
              href="/"
              className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </a>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            How the upload works
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>
              • No. is used as the product SKU.
            </li>

            <li>
              • Description becomes the product name.
            </li>

            <li>
              • Storage Place determines the product category.
            </li>

            <li>
              • Base Unit of Measure becomes the product unit.
            </li>

            <li>
              • Existing products are updated using their SKU.
            </li>

            <li>
              • Stock quantities are not changed by the catalog upload.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}