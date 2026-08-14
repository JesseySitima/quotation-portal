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
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
     <div className="flex items-center gap-1.5">
  <div className="flex h-16 w-auto items-center">
    <Image
      src="/amm-logo.png"
      alt="Action Medeor logo"
      width={40}
      height={40}
      className="object-contain"
      priority
    />
  </div>

  <div>
    <p className="text-sm font-semibold tracking-tight">
      action medeor Malawi Quotation Portal
    </p>

    <p className="text-[11px] text-[#858c86]">{subtitle}</p>
  </div>
</div>

      {rightContent}
    </header>
  );
}
