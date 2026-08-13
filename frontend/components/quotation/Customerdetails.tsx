interface CustomerDetailsProps {
  facilityName: string;
  contactPerson: string;
  email: string;
  phone: string;

  errors: {
    facilityName?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
  };

  onFacilityNameChange: (value: string) => void;
  onContactPersonChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export default function CustomerDetails({
  facilityName,
  contactPerson,
  email,
  phone,
  errors,
  onFacilityNameChange,
  onContactPersonChange,
  onEmailChange,
  onPhoneChange,
}: CustomerDetailsProps) {
  return (
    <section className="rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8">
      <div className="mb-7">
        <p className="text-[11px] font-bold tracking-[0.16em] text-[#3f8f5f]">
          01
        </p>

        <h2 className="mt-2 text-lg font-semibold">
          Your details
        </h2>

        <p className="mt-1.5 text-sm text-[#858c86]">
          How can our sales team reach you?
        </p>
      </div>

      <div className="space-y-5">

        {/* Facility */}
        <div>
          <label
            htmlFor="facilityName"
            className="mb-2 block text-sm font-medium"
          >
            Facility / Company
          </label>

          <input
            id="facilityName"
            type="text"
            value={facilityName}
            onChange={(event) =>
              onFacilityNameChange(event.target.value)
            }
            placeholder="e.g. St. Mary's Hospital"
            className={`h-12 w-full rounded-xl border bg-[#fafbfa] px-4 text-sm outline-none transition focus:bg-white focus:ring-2 ${
              errors.facilityName
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                : "border-[#dfe4df] focus:border-[#3f8f5f] focus:ring-[#3f8f5f]/10"
            }`}
          />

          {errors.facilityName && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.facilityName}
            </p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="contactPerson"
            className="mb-2 block text-sm font-medium"
          >
            Contact person
          </label>

          <input
            id="contactPerson"
            type="text"
            value={contactPerson}
            onChange={(event) =>
              onContactPersonChange(event.target.value)
            }
            placeholder="Your full name"
            className={`h-12 w-full rounded-xl border bg-[#fafbfa] px-4 text-sm outline-none transition focus:bg-white focus:ring-2 ${
              errors.contactPerson
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                : "border-[#dfe4df] focus:border-[#3f8f5f] focus:ring-[#3f8f5f]/10"
            }`}
          />

          {errors.contactPerson && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.contactPerson}
            </p>
          )}
        </div>

        {/* Email / Phone */}
        <div className="grid gap-5 sm:grid-cols-2">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                onEmailChange(event.target.value)
              }
              placeholder="you@example.com"
              className={`h-12 w-full rounded-xl border bg-[#fafbfa] px-4 text-sm outline-none transition focus:bg-white focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                  : "border-[#dfe4df] focus:border-[#3f8f5f] focus:ring-[#3f8f5f]/10"
              }`}
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium"
            >
              Phone number
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                onPhoneChange(event.target.value)
              }
              placeholder="+265 ..."
              className={`h-12 w-full rounded-xl border bg-[#fafbfa] px-4 text-sm outline-none transition focus:bg-white focus:ring-2 ${
                errors.phone
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                  : "border-[#dfe4df] focus:border-[#3f8f5f] focus:ring-[#3f8f5f]/10"
              }`}
            />

            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}