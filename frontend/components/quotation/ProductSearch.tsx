import type { Product } from "@/types/product";

interface Category {
  id: string;
  name: string;
}

interface ProductSearchProps {
  search: string;
  selectedCategory: string;

  categories: Category[];
  products: Product[];

  productsLoading: boolean;
  productsFetching: boolean;
  productsError: boolean;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;

  onAddProduct: (product: Product) => void;
  isSelected: (productId: string) => boolean;
}

export default function ProductSearch({
  search,
  selectedCategory,
  categories,
  products,
  productsLoading,
  productsFetching,
  productsError,
  onSearchChange,
  onCategoryChange,
  onAddProduct,
  isSelected,
}: ProductSearchProps) {
  return (
    <section className="rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8">
      <div className="mb-7">
        <p className="text-[11px] font-bold tracking-[0.16em] text-[#006BB4]">
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
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by product name or SKU..."
          className="h-12 w-full rounded-xl border border-[#dfe4df] bg-[#fafbfa] pl-11 pr-4 text-sm outline-none transition focus:border-[#006BB4] focus:bg-white focus:ring-2 focus:ring-[#006BB4]/10"
        />

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#858c86]">
          ⌕
        </span>
      </div>

      {/* Categories */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
            selectedCategory === ""
              ? "bg-[#006BB4] text-white"
              : "border border-[#dfe4df] bg-white text-[#69716b] hover:border-[#9ec7e2]"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() =>
              onCategoryChange(category.id)
            }
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
              selectedCategory === category.id
                ? "bg-[#006BB4] text-white"
                : "border border-[#dfe4df] bg-white text-[#69716b] hover:border-[#9ec7e2]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products */}
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4FB] text-[#006BB4]">
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
              <p className="text-sm font-medium">
                No products found
              </p>

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
              className="flex items-center justify-between gap-4 rounded-2xl border border-[#e5e9e5] p-4 transition hover:border-[#b9d5e8]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {product.name}
                </p>

                <p className="mt-1 text-xs text-[#858c86]">
                  {product.unit}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onAddProduct(product)}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition ${
                  isSelected(product.id)
                    ? "bg-[#EAF4FB] text-[#006BB4]"
                    : "bg-[#006BB4] text-white hover:bg-[#005A96]"
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
  );
}