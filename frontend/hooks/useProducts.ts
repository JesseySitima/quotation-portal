import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/lib/api/products";

import type { GetProductsParams } from "@/types/product";

export function useProducts(params: GetProductsParams = {}) {
  return useInfiniteQuery({
    queryKey: ["products", params],

    queryFn: ({ pageParam }) =>
      getProducts({
        ...params,
        page: pageParam,
        page_size: params.page_size ?? 20,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}