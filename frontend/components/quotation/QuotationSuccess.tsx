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
    <section className="mx-auto max-w-2xl rounded-3xl border border-[#dfe4df] bg-white p-8 text-center sm:p-12">
      {/* Success icon */}

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef4ef]">
        <span className="text-2xl text-[#3f8f5f]">
          ✓
        </span>
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#3f8f5f]">
        Request submitted
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
        Your quotation request is on its way.
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#69716b]">
        Thank you, {facilityName}. Our sales team has received your
        request and will get back to you using the contact details
        you provided.
      </p>

      {/* Request number */}

      <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-[#f7f8f6] p-5">
        <p className="text-xs text-[#858c86]">
          Request number
        </p>

        <p className="mt-2 text-lg font-semibold tracking-wide text-[#173f2a]">
          {quotation?.request_number}
        </p>
      </div>

      {/* Email */}

      {quotation?.email_sent && (
        <p className="mt-5 text-xs text-[#69716b]">
          A confirmation has also been sent to{" "}
          <span className="font-medium text-[#171a17]">
            {email}
          </span>
          .
        </p>
      )}

      {/* Downloads */}

      <div className="mt-8 border-t border-[#edf0ed] pt-7">
        <p className="text-sm font-medium">
          Download your request
        </p>

        <p className="mt-1 text-xs text-[#858c86]">
          Keep a copy of your quotation request for your records.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {/* Excel */}

          <button
            type="button"
            onClick={onDownloadExcel}
            disabled={isDownloadingExcel}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe4df] bg-white px-5 text-sm font-medium text-[#173f2a] transition hover:border-[#b9cbbb] hover:bg-[#f7f8f6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDownloadingExcel ? (
              "Preparing Excel..."
            ) : (
              <>
                <span className="text-base">↓</span>
                Download Excel
              </>
            )}
          </button>

          {/* Word */}

          <button
            type="button"
            onClick={onDownloadWord}
            disabled={isDownloadingWord}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe4df] bg-white px-5 text-sm font-medium text-[#173f2a] transition hover:border-[#b9cbbb] hover:bg-[#f7f8f6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDownloadingWord ? (
              "Preparing Word..."
            ) : (
              <>
                <span className="text-base">↓</span>
                Download Word
              </>
            )}
          </button>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onCreateAnother}
          className="h-12 rounded-xl bg-[#173f2a] px-6 text-sm font-medium text-white transition hover:bg-[#205436]"
        >
          Create another request
        </button>

        <a
          href="/"
          className="flex h-12 items-center justify-center rounded-xl border border-[#dfe4df] px-6 text-sm font-medium text-[#69716b] transition hover:border-[#b9cbbb] hover:text-[#173f2a]"
        >
          Back to home
        </a>
      </div>
    </section>
  );
}