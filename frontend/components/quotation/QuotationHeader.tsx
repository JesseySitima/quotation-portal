import Image from "next/image";

interface QuotationHeaderProps {
  subtitle: string;
  rightContent?: React.ReactNode;
}

export default function QuotationHeader({
  subtitle,
  rightContent,
}: QuotationHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Logo + Brand */}
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-12 w-10 shrink-0 items-center sm:h-16 sm:w-auto">
          <Image
            src="/amm-logo.png"
            alt="Action Medeor logo"
            width={40}
            height={40}
            className="h-auto w-10 object-contain sm:w-10"
            priority
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5 tracking-tight text-[#006BB4] sm:text-lg sm:leading-normal">
            action medeor Malawi Quotation Portal
          </p>

          <p className="mt-0.5 text-[10px] text-[#858c86] sm:text-[11px]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Content */}
      {rightContent && (
        <div className="shrink-0">
          {rightContent}
        </div>
      )}
    </header>
  );
}