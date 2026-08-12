import { apiClient } from "./client";
import type {
  GetProductsParams,
  ProductsResponse,
  Product,
} from "@/types/product";

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.category_id) {
    searchParams.set("category_id", params.category_id);
  }

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.page_size !== undefined) {
    searchParams.set("page_size", String(params.page_size));
  }

  const queryString = searchParams.toString();

  const endpoint = queryString
    ? `/api/v1/products?${queryString}`
    : "/api/v1/products";

  return apiClient<ProductsResponse>(endpoint);
}

export async function getProduct(
  productId: string,
): Promise<Product> {
  return apiClient<Product>(
    `/api/v1/products/${productId}`,
  );
}