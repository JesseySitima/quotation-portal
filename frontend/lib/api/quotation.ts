import { apiClient } from "./client";

import type {
  CreateQuotationApiResponse,
  CreateQuotationRequest,
} from "@/types/quotation";

export async function createQuotation(
  data: CreateQuotationRequest,
): Promise<CreateQuotationApiResponse> {
  return apiClient<CreateQuotationApiResponse>(
    "/api/v1/quotations",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}