import { apiClient } from "./client";
import type { Category, PaginatedResponse } from "@/types/category";

export async function getCategories(
  page = 1,
  pageSize = 20
): Promise<PaginatedResponse<Category>> {
  return apiClient<PaginatedResponse<Category>>(
    `/api/v1/categories?page=${page}&page_size=${pageSize}`
  );
}