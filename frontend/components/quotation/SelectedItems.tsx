import type { Product } from "@/types/product";

export interface SelectedItem {
  product: Product;
  quantity: number;
}

interface SelectedItemsProps {
  selectedItems: SelectedItem[];

  isSubmitting: boolean;
  submitError: boolean;
  submissionError: unknown;

  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onSubmit: () => void;
}

export default function SelectedItems({
  selectedItems,
  isSubmitting,
  submitError,
  submissionError,
  onIncrease,
  onDecrease,
  onRemove,
  onSubmit,
}: SelectedItemsProps) {
  const totalQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <section className="h-fit rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8 lg:sticky lg:top-6">
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#3f8f5f]">
              YOUR REQUEST
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Selected items
            </h2>
          </div>

          {selectedItems.length > 0 && (
            <span className="rounded-full bg-[#eef4ef] px-3 py-1 text-xs font-semibold text-[#3f8f5f]">
              {selectedItems.length}{" "}
              {selectedItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        <p className="mt-1.5 text-sm text-[#858c86]">
          Review the quantities before continuing.
        </p>
      </div>

      {selectedItems.length === 0 ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-[#dfe4df] bg-[#fafbfa] p-6 text-center">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4ef] text-[#3f8f5f]">
              +
            </div>

            <p className="mt-4 text-sm font-medium text-[#69716b]">
              Your request is empty
            </p>

            <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#858c86]">
              Add products from the left and they&apos;ll appear here.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="divide-y divide-[#edf0ed]">
            {selectedItems.map((item) => (
              <div
                key={item.product.id}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-[#858c86]">
                      {item.product.unit}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onRemove(item.product.id)
                    }
                    className="shrink-0 text-xs text-[#9a6b6b] transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#858c86]">
                    Quantity
                  </span>

                  <div className="flex items-center rounded-xl border border-[#dfe4df]">
                    <button
                      type="button"
                      onClick={() =>
                        onDecrease(item.product.id)
                      }
                      className="flex h-9 w-9 items-center justify-center text-[#69716b] transition hover:text-[#173f2a]"
                    >
                      −
                    </button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onIncrease(item.product.id)
                      }
                      className="flex h-9 w-9 items-center justify-center text-[#69716b] transition hover:text-[#173f2a]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#edf0ed] pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#69716b]">
                Total items
              </span>

              <span className="text-sm font-semibold">
                {totalQuantity}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Submission */}

      <div className="mt-8 border-t border-[#edf0ed] pt-6">
        {submitError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              We couldn&apos;t submit your quotation request.
            </p>

            <p className="mt-1 text-xs text-red-600">
              {submissionError instanceof Error
                ? submissionError.message
                : "Please try again."}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={
            isSubmitting || selectedItems.length === 0
          }
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173f2a] text-sm font-medium text-white transition hover:bg-[#205436] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            "Sending request..."
          ) : (
            <>
              Send quotation request

              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </button>

        <p className="mt-3 text-center text-[11px] leading-5 text-[#858c86]">
          Your request will be sent to our sales team.
          <br />
          They will contact you using the details provided.
        </p>
      </div>
    </section>
  );
}