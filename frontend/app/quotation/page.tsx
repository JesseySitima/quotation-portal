"use client";

import { useState } from "react";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useCreateQuotation } from "@/hooks/useCreateQuotation";
import { useDownloadQuotation } from "@/hooks/useDownloadQuotation";

import type { Product } from "@/types/product";

import QuotationHeader from "@/components/quotation/QuotationHeader";
import CustomerDetails from "@/components/quotation/Customerdetails";
import ProductSearch from "@/components/quotation/ProductSearch";
import SelectedItems, {
  type SelectedItem,
} from "@/components/quotation/SelectedItems";
import QuotationSuccess from "@/components/quotation/QuotationSuccess";
import {
  validateQuotationForm,
  type QuotationFormErrors,
} from "@/lib/validation/quotation";

export default function QuotationPage() {
  // ============================================================
  // CUSTOMER DETAILS
  // ============================================================

  const [facilityName, setFacilityName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState<QuotationFormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
  // SUBMISSION
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
  // DOWNLOADS
  // ============================================================

  const { downloadExcel, downloadWord, isDownloadingExcel, isDownloadingWord } =
    useDownloadQuotation();

  // ============================================================
  // PRODUCT ACTIONS
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

  function removeProduct(productId: string) {
    setSelectedItems((current) =>
      current.filter((item) => item.product.id !== productId),
    );
  }

  function isSelected(productId: string) {
    return selectedItems.some((item) => item.product.id === productId);
  }

  // ============================================================
  // SUBMIT
  // ============================================================

  function handleSubmitQuotation() {
    setHasSubmitted(true);

    const validationErrors = validateQuotationForm(
      {
        facilityName,
        contactPerson,
        email,
        phone,
      },
      selectedItems.length,
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
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
  // RESET
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

    setErrors({});
    setHasSubmitted(false);
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-[#171a17]">
      <QuotationHeader />

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 lg:px-8">
        {/* Intro */}

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
        {/* SUCCESS                                               */}
        {/* ==================================================== */}

        {submittedQuotation ? (
          <QuotationSuccess
            quotation={submittedQuotation.quotation}
            facilityName={facilityName}
            email={email}
            isDownloadingExcel={isDownloadingExcel}
            isDownloadingWord={isDownloadingWord}
            onDownloadExcel={() =>
              downloadExcel(submittedQuotation.quotation.id)
            }
            onDownloadWord={() => downloadWord(submittedQuotation.quotation.id)}
            onCreateAnother={handleCreateAnother}
          />
        ) : (
          <>
            {/* ================================================= */}
            {/* CUSTOMER DETAILS                                  */}
            {/* ================================================= */}

            <CustomerDetails
              facilityName={facilityName}
              contactPerson={contactPerson}
              email={email}
              phone={phone}
              errors={errors}
              onFacilityNameChange={(value) => {
                setFacilityName(value);

                if (hasSubmitted) {
                  setErrors((current) => ({
                    ...current,
                    facilityName: undefined,
                  }));
                }
              }}
              onContactPersonChange={(value) => {
                setContactPerson(value);

                if (hasSubmitted) {
                  setErrors((current) => ({
                    ...current,
                    contactPerson: undefined,
                  }));
                }
              }}
              onEmailChange={(value) => {
                setEmail(value);

                if (hasSubmitted) {
                  setErrors((current) => ({
                    ...current,
                    email: undefined,
                  }));
                }
              }}
              onPhoneChange={(value) => {
                setPhone(value);

                if (hasSubmitted) {
                  setErrors((current) => ({
                    ...current,
                    phone: undefined,
                  }));
                }
              }}
            />

            {/* ================================================= */}
            {/* PRODUCTS                                           */}
            {/* ================================================= */}

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <ProductSearch
                search={search}
                selectedCategory={selectedCategory}
                categories={categories}
                products={products}
                productsLoading={productsLoading}
                productsFetching={productsFetching}
                productsError={productsError}
                onSearchChange={setSearch}
                onCategoryChange={setSelectedCategory}
                onAddProduct={addProduct}
                isSelected={isSelected}
              />

              <SelectedItems
                selectedItems={selectedItems}
                isSubmitting={isSubmitting}
                submitError={submitError}
                submissionError={submissionError}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeProduct}
                onSubmit={handleSubmitQuotation}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
