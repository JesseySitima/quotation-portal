import { useQuery } from "@tanstack/react-query";

import {
  getProducts,
} from "@/lib/api/products";

import type {
  GetProductsParams,
} from "@/types/product";

export function useProducts(
  params: GetProductsParams = {},
) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}