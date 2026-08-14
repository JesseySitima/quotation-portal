interface QuotationSuccessProps {
  quotation: any;
  facilityName: string;
  email: string;
  isDownloadingExcel: boolean;
  isDownloadingWord: boolean;
  onDownloadExcel: () => void;
  onDownloadWord: () => void;
  onCreateAnother: () => void;
}

export default function QuotationSuccess({
  quotation,
  facilityName,
  email,
  isDownloadingExcel,
  isDownloadingWord,
  onDownloadExcel,
  onDownloadWord,
  onCreateAnother,
}: QuotationSuccessProps) {
  return (
    <section className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <div className="text-center">
        {/* Success icon - smaller and cleaner */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <svg
            className="h-7 w-7 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading - simplified */}
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Request submitted
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Thanks! We’ve received your request and will get back to you soon. You
          can download a copy below for your records.
        </p>

        {/* Email confirmation - one line */}
        {quotation?.email_sent && (
          <p className="mt-4 text-sm text-gray-600">
            ✓ Confirmation sent to{" "}
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        )}

        {/* Download buttons - horizontal, compact */}
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={onDownloadExcel}
            disabled={isDownloadingExcel}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-50"
          >
            {isDownloadingExcel ? "Loading..." : "Excel .xlsx"}
          </button>
          <button
            type="button"
            onClick={onDownloadWord}
            disabled={isDownloadingWord}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
          >
            {isDownloadingWord ? "Loading..." : "Word .docx"}
          </button>
        </div>

        {/* Actions - clean buttons */}
        <div className="mt-6 space-y-2">
          <button
            onClick={onCreateAnother}
            className="w-full rounded-lg bg-[#006BB4] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#005A96]"
          >
            New request
          </button>

          <a
            href="/"
            className="block w-full rounded-lg px-4 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
          >
            Back to home
          </a>
        </div>
      </div>
    </section>
  );
}
