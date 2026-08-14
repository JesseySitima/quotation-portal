export default function QuotationHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#006BB4] text-sm font-bold text-white">
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
        className="text-xs text-[#69716b] transition-colors hover:text-[#006BB4]"
      >
        ← Back
      </a>
    </header>
  );
}