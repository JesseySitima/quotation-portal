"use client";

import { useState } from "react";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useCreateQuotation } from "@/hooks/useCreateQuotation";
import { useDownloadQuotation } from "@/hooks/useDownloadQuotation";
import type { Product } from "@/types/product";

interface SelectedItem {
  product: Product;
  quantity: number;
}

export default function QuotationPage() {
  // ============================================================
  // CUSTOMER DETAILS
  // ============================================================

  const [facilityName, setFacilityName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // ============================================================
  // PRODUCT SEARCH
  // ============================================================

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ============================================================
  // SELECTED PRODUCTS
  // ============================================================

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // ============================================================
  // SUBMISSION SUCCESS
  // ============================================================

  const [submittedQuotation, setSubmittedQuotation] = useState<any>(null);

  // ============================================================
  // CATEGORIES
  // ============================================================

  const { data: categoriesData } = useCategories();

  const categories = categoriesData?.items ?? [];

  // ============================================================
  // PRODUCTS
  // ============================================================

  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsError,
  } = useProducts({
    search: search || undefined,
    category_id: selectedCategory || undefined,
    page: 1,
    page_size: 20,
  });

  const products = productsData?.items ?? [];

  // ============================================================
  // CREATE QUOTATION
  // ============================================================

  const {
    mutate: submitQuotation,
    isPending: isSubmitting,
    isError: submitError,
    error: submissionError,
  } = useCreateQuotation();

  // ============================================================
  // DOWNLOAD QUOTATION REQUESTS
  // ============================================================
  const { downloadExcel, downloadWord, isDownloadingExcel, isDownloadingWord } =
    useDownloadQuotation();

  // ============================================================
  // ADD PRODUCT
  // ============================================================

  function addProduct(product: Product) {
    setSelectedItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  // ============================================================
  // INCREASE QUANTITY
  // ============================================================

  function increaseQuantity(productId: string) {
    setSelectedItems((current) =>
      current.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  // ============================================================
  // DECREASE QUANTITY
  // ============================================================

  function decreaseQuantity(productId: string) {
    setSelectedItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // ============================================================
  // REMOVE PRODUCT
  // ============================================================

  function removeProduct(productId: string) {
    setSelectedItems((current) =>
      current.filter((item) => item.product.id !== productId),
    );
  }

  // ============================================================
  // CHECK IF PRODUCT IS SELECTED
  // ============================================================

  function isSelected(productId: string) {
    return selectedItems.some((item) => item.product.id === productId);
  }

  // ============================================================
  // SUBMIT QUOTATION
  // ============================================================

  function handleSubmitQuotation() {
    if (!facilityName.trim()) {
      return;
    }

    if (!contactPerson.trim()) {
      return;
    }

    if (!email.trim()) {
      return;
    }

    if (!phone.trim()) {
      return;
    }

    if (selectedItems.length === 0) {
      return;
    }

    submitQuotation(
      {
        facility_name: facilityName.trim(),
        contact_person: contactPerson.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: "",
        items: selectedItems.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: (response) => {
          console.log("Quotation response:", response);

          setSubmittedQuotation(response);
        },

        onError: (error) => {
          console.error("Quotation submission failed:", error);
        },
      },
    );
  }

  // ============================================================
  // RESET FORM
  // ============================================================

  function handleCreateAnother() {
    setSubmittedQuotation(null);

    setFacilityName("");
    setContactPerson("");
    setEmail("");
    setPhone("");

    setSearch("");
    setSelectedCategory("");

    setSelectedItems([]);
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#171a17]">
      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173f2a] text-sm font-bold text-white">
            Q
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight">
              Quotation Portal
            </p>

            <p className="text-[11px] text-[#858c86]">Request a quotation</p>
          </div>
        </div>

        <a
          href="/"
          className="text-xs text-[#69716b] transition-colors hover:text-[#173f2a]"
        >
          ← Back
        </a>
      </header>

      {/* ====================================================== */}
      {/* MAIN                                                    */}
      {/* ====================================================== */}

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 lg:px-8">
        {/* ==================================================== */}
        {/* INTRO                                                  */}
        {/* ==================================================== */}

        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3f8f5f]">
            Request a quotation
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Tell us what you need.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-[#69716b]">
            Add the products you&apos;d like our sales team to quote.
          </p>
        </div>

        {/* ==================================================== */}
        {/* SUCCESS STATE                                         */}
        {/* ==================================================== */}

        {submittedQuotation ? (
          <section className="mx-auto max-w-2xl rounded-3xl border border-[#dfe4df] bg-white p-8 text-center sm:p-12">
            {/* Success icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef4ef]">
              <span className="text-2xl text-[#3f8f5f]">✓</span>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#3f8f5f]">
              Request submitted
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Your quotation request is on its way.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#69716b]">
              Thank you, {facilityName}. Our sales team has received your
              request and will get back to you using the contact details you
              provided.
            </p>

            {/* Request number */}
            <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-[#f7f8f6] p-5">
              <p className="text-xs text-[#858c86]">Request number</p>

              <p className="mt-2 text-lg font-semibold tracking-wide text-[#173f2a]">
                {submittedQuotation.quotation?.request_number}
              </p>
            </div>

            {/* Email confirmation */}
            {submittedQuotation.email_sent && (
              <p className="mt-5 text-xs text-[#69716b]">
                A confirmation has also been sent to{" "}
                <span className="font-medium text-[#171a17]">{email}</span>.
              </p>
            )}

            {/* Downloads */}
            <div className="mt-8 border-t border-[#edf0ed] pt-7">
              <p className="text-sm font-medium">Download your request</p>

              <p className="mt-1 text-xs text-[#858c86]">
                Keep a copy of your quotation request for your records.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {/* Excel */}
                <button
                  type="button"
                  onClick={() => downloadExcel(submittedQuotation.quotation.id)}
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
                  onClick={() => downloadWord(submittedQuotation.quotation.id)}
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
                onClick={() => {
                  setSubmittedQuotation(null);
                  setSelectedItems([]);
                  setFacilityName("");
                  setContactPerson("");
                  setEmail("");
                  setPhone("");
                  setSearch("");
                  setSelectedCategory("");
                }}
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
        ) : (
          <>
            {/* ================================================= */}
            {/* CUSTOMER DETAILS                                  */}
            {/* ================================================= */}

            <section className="rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8">
              <div className="mb-7">
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#3f8f5f]">
                  01
                </p>

                <h2 className="mt-2 text-lg font-semibold">Your details</h2>

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
                    onChange={(event) => setFacilityName(event.target.value)}
                    placeholder="e.g. St. Mary's Hospital"
                    className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                  />
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
                    onChange={(event) => setContactPerson(event.target.value)}
                    placeholder="Your full name"
                    className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                  />
                </div>

                {/* Email / Phone */}

                <div className="grid gap-5 sm:grid-cols-2">
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
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                    />
                  </div>

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
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+265 ..."
                      className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] px-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================= */}
            {/* PRODUCTS + REQUEST                                */}
            {/* ================================================= */}

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              {/* ================================================= */}
              {/* PRODUCT SEARCH                                    */}
              {/* ================================================= */}

              <section className="rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8">
                <div className="mb-7">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#3f8f5f]">
                    02
                  </p>

                  <h2 className="mt-2 text-lg font-semibold">
                    What do you need?
                  </h2>

                  <p className="mt-1.5 text-sm text-[#858c86]">
                    Search for products and add them to your request.
                  </p>
                </div>

                {/* Search */}

                <div className="relative">
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by product name or SKU..."
                    className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] pl-11 pr-4 text-sm outline-none transition focus:border-[#3f8f5f] focus:bg-white focus:ring-2 focus:ring-[#3f8f5f]/10"
                  />

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#858c86]">
                    ⌕
                  </span>
                </div>

                {/* Categories */}

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("")}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                      selectedCategory === ""
                        ? "bg-[#173f2a] text-white"
                        : "border border-[#dfe4df] bg-white text-[#69716b] hover:border-[#b9cbbb]"
                    }`}
                  >
                    All
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                        selectedCategory === category.id
                          ? "bg-[#173f2a] text-white"
                          : "border border-[#dfe4df] bg-white text-[#69716b] hover:border-[#b9cbbb]"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Product Results */}

                <div className="mt-5 space-y-2">
                  {productsLoading && (
                    <div className="rounded-2xl bg-[#fafbfa] p-8 text-center">
                      <p className="text-sm text-[#69716b]">
                        Searching products...
                      </p>
                    </div>
                  )}

                  {productsError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                      <p className="text-sm text-red-700">
                        We couldn&apos;t load the products.
                      </p>

                      <p className="mt-1 text-xs text-red-600">
                        Please try again.
                      </p>
                    </div>
                  )}

                  {!productsLoading &&
                    !productsError &&
                    search.trim() === "" && (
                      <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-[#dfe4df] bg-[#fafbfa] p-8 text-center">
                        <div>
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef4ef] text-[#3f8f5f]">
                            ⌕
                          </div>

                          <p className="mt-4 text-sm font-medium text-[#69716b]">
                            Start by searching for an item
                          </p>

                          <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#858c86]">
                            Search by product name or SKU to find what you need.
                          </p>
                        </div>
                      </div>
                    )}

                  {!productsLoading &&
                    !productsError &&
                    search.trim() !== "" &&
                    products.length === 0 && (
                      <div className="rounded-2xl bg-[#fafbfa] p-8 text-center">
                        <p className="text-sm font-medium">No products found</p>

                        <p className="mt-1 text-xs text-[#858c86]">
                          Try a different product name or SKU.
                        </p>
                      </div>
                    )}

                  {!productsLoading &&
                    !productsError &&
                    search.trim() !== "" &&
                    products.length > 0 &&
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-[#e5e9e5] p-4 transition hover:border-[#cbd8cd]"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-[#858c86]">
                            {product.sku} · {product.unit}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => addProduct(product)}
                          className={`shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition ${
                            isSelected(product.id)
                              ? "bg-[#eef4ef] text-[#3f8f5f]"
                              : "bg-[#173f2a] text-white hover:bg-[#205436]"
                          }`}
                        >
                          {isSelected(product.id) ? "Added" : "Add"}
                        </button>
                      </div>
                    ))}
                </div>

                {productsFetching && !productsLoading && (
                  <p className="mt-3 text-center text-[11px] text-[#858c86]">
                    Updating results...
                  </p>
                )}
              </section>

              {/* ================================================= */}
              {/* YOUR REQUEST                                      */}
              {/* ================================================= */}

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
                              onClick={() => removeProduct(item.product.id)}
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
                                  decreaseQuantity(item.product.id)
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
                                  increaseQuantity(item.product.id)
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

                    {/* Request summary */}

                    <div className="mt-6 border-t border-[#edf0ed] pt-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#69716b]">
                          Total items
                        </span>

                        <span className="text-sm font-semibold">
                          {selectedItems.reduce(
                            (total, item) => total + item.quantity,
                            0,
                          )}
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
                    onClick={handleSubmitQuotation}
                    disabled={isSubmitting || selectedItems.length === 0}
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
            </div>
          </>
        )}
      </section>
    </main>
  );
}
