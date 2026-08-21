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
    <section className="min-w-0 w-full rounded-3xl border border-[#dfe4df] bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <p className="text-[11px] font-bold tracking-[0.16em] text-[#006BB4]">
          02
        </p>

        <h2 className="mt-2 text-lg font-semibold">What do you need?</h2>

        <p className="mt-1.5 text-sm text-[#858c86]">
          Search for products and add them to your request.
        </p>
      </div>

      {/* Search */}
      <div className="relative min-w-0">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by product name..."
          className="box-border h-12 w-full min-w-0 rounded-xl border border-[#dfe4df] bg-[#fafbfa] pl-11 pr-4 text-sm outline-none transition placeholder:text-[#a1a7a2] focus:border-[#006BB4] focus:bg-white focus:ring-2 focus:ring-[#006BB4]/10"
        />

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#858c86]">
          ⌕
        </span>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange("")}
            className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${
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
              onClick={() => onCategoryChange(category.id)}
              className={`max-w-full rounded-full px-3.5 py-2 text-xs font-medium transition ${
                selectedCategory === category.id
                  ? "bg-[#006BB4] text-white"
                  : "border border-[#dfe4df] bg-white text-[#69716b] hover:border-[#9ec7e2]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Products */}
      {/* Products */}
      <div className="mt-5 min-w-0">
        {/* Loading */}
        {productsLoading && (
          <div className="flex min-h-[180px] w-full items-center justify-center rounded-2xl bg-[#fafbfa]">
            <p className="text-sm text-[#69716b]">Searching products...</p>
          </div>
        )}

        {/* Error */}
        {productsError && (
          <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-700">
              We couldn&apos;t load the products.
            </p>

            <p className="mt-1 text-xs text-red-600">Please try again.</p>
          </div>
        )}

        {/* Products */}
        {!productsLoading && !productsError && products.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-medium text-[#858c86]">
              {search.trim() !== ""
                ? "Search results"
                : selectedCategory !== ""
                  ? "Available products"
                  : "Available products"}
            </p>

            <div className="max-h-[420px] w-full min-w-0 space-y-2 overflow-y-auto">
              {products.map((product) => {
                const selected = isSelected(product.id);

                return (
                  <div
                    key={product.id}
                    className="flex w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-[#e5e9e5] p-3.5 transition hover:border-[#b9d5e8]"
                  >
                    {/* Product */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#171a17]">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-[#858c86]">
                        Unit: {product.unit}
                      </p>
                    </div>

                    {/* Add */}
                    <button
                      type="button"
                      onClick={() => onAddProduct(product)}
                      className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-medium transition ${
                        selected
                          ? "bg-[#EAF4FB] text-[#006BB4]"
                          : "bg-[#006BB4] text-white hover:bg-[#005A96]"
                      }`}
                    >
                      {selected ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No products in selected category */}
        {!productsLoading &&
          !productsError &&
          selectedCategory !== "" &&
          search.trim() === "" &&
          products.length === 0 && (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-2xl bg-[#fafbfa] p-6 text-center">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#69716b]">
                  No products in this category
                </p>

                <p className="mt-1 text-xs leading-5 text-[#858c86]">
                  Try selecting another category.
                </p>
              </div>
            </div>
          )}

        {/* No search results */}
        {!productsLoading &&
          !productsError &&
          search.trim() !== "" &&
          products.length === 0 && (
            <div className="flex min-h-[150px] w-full items-center justify-center rounded-2xl bg-[#fafbfa] p-6 text-center">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#69716b]">
                  No products found
                </p>

                <p className="mt-1 text-xs leading-5 text-[#858c86]">
                  Try a different product name.
                </p>
              </div>
            </div>
          )}
      </div>

      {/* Fetching */}
      {productsFetching && !productsLoading && (
        <p className="mt-3 text-center text-[11px] text-[#858c86]">
          Updating results...
        </p>
      )}
    </section>
  );
}
