import type { Product } from "@/types/product";
import { useState } from "react";

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
  onQuantityChange: (productId: string, quantity: number) => void;
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
  onQuantityChange,
  onRemove,
  onSubmit,
}: SelectedItemsProps) {
  const totalQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const [quantityInputs, setQuantityInputs] = useState<Record<string, string>>(
    {},
  );

  return (
    <section className="h-fit rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8 lg:sticky lg:top-6">
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#006BB4]">
              YOUR REQUEST
            </p>

            <h2 className="mt-2 text-lg font-semibold">Selected items</h2>
          </div>

          {selectedItems.length > 0 && (
            <span className="rounded-full bg-[#EAF4FB] px-3 py-1 text-xs font-semibold text-[#006BB4]">
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
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4FB] text-[#006BB4]">
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
              <div key={item.product.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.product.name}</p>

                    <p className="mt-1 text-xs text-[#858c86]">
                      {item.product.unit}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(item.product.id)}
                    className="shrink-0 text-xs text-[#9a6b6b] transition hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#858c86]">Quantity</span>

                  <div className="flex items-center rounded-xl border border-[#dfe4df]">
                    <button
                      type="button"
                      onClick={() => {
                        const newQuantity = item.quantity - 1;

                        if (newQuantity >= 1) {
                          onDecrease(item.product.id);

                          setQuantityInputs((current) => ({
                            ...current,
                            [item.product.id]: newQuantity.toLocaleString(),
                          }));
                        }
                      }}
                      className="flex h-9 w-9 items-center justify-center text-[#69716b] transition hover:text-[#006BB4]"
                    >
                      −
                    </button>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={
                        quantityInputs[item.product.id] !== undefined
                          ? quantityInputs[item.product.id]
                          : item.quantity.toLocaleString()
                      }
                      onChange={(event) => {
                        // Remove commas and anything that isn't a digit
                        const rawValue = event.target.value
                          .replace(/,/g, "")
                          .replace(/\D/g, "");

                        setQuantityInputs((current) => ({
                          ...current,
                          [item.product.id]: rawValue,
                        }));

                        if (rawValue === "") {
                          return;
                        }

                        const quantity = Number(rawValue);

                        if (Number.isInteger(quantity) && quantity >= 1) {
                          onQuantityChange(item.product.id, quantity);
                        }
                      }}
                      onBlur={() => {
                        const value = quantityInputs[item.product.id];

                        if (!value) {
                          setQuantityInputs((current) => ({
                            ...current,
                            [item.product.id]: item.quantity.toLocaleString(),
                          }));
                          return;
                        }

                        const quantity = Number(value.replace(/,/g, ""));

                        if (!Number.isInteger(quantity) || quantity < 1) {
                          setQuantityInputs((current) => ({
                            ...current,
                            [item.product.id]: item.quantity.toLocaleString(),
                          }));
                          return;
                        }

                        setQuantityInputs((current) => ({
                          ...current,
                          [item.product.id]: quantity.toLocaleString(),
                        }));

                        onQuantityChange(item.product.id, quantity);
                      }}
                      onFocus={(event) => {
                        // Remove commas while editing
                        const rawValue = event.target.value.replace(/,/g, "");

                        setQuantityInputs((current) => ({
                          ...current,
                          [item.product.id]: rawValue,
                        }));

                        // Put cursor at the end
                        requestAnimationFrame(() => {
                          event.target.select();
                        });
                      }}
                      className="h-9 w-20 border-x border-[#dfe4df] bg-white text-center text-sm font-medium outline-none focus:bg-[#fafbfa] focus:text-[#006BB4]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newQuantity = item.quantity + 1;

                        onIncrease(item.product.id);

                        setQuantityInputs((current) => ({
                          ...current,
                          [item.product.id]: newQuantity.toLocaleString(),
                        }));
                      }}
                      className="flex h-9 w-9 items-center justify-center text-[#69716b] transition hover:text-[#006BB4]"
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
              <span className="text-sm text-[#69716b]">Total items</span>

              <span className="text-sm font-semibold">
                {totalQuantity.toLocaleString()}
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
          disabled={isSubmitting || selectedItems.length === 0}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#006BB4] text-sm font-medium text-white transition hover:bg-[#005A96] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending request..." : <>Send quotation request</>}
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
