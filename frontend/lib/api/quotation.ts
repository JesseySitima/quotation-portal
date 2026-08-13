import { apiClient } from "./client";

import type {
  CreateQuotationRequest,
  QuotationResponse,
} from "@/types/quotation";

export async function createQuotation(
  data: CreateQuotationRequest,
): Promise<QuotationResponse> {
  return apiClient<QuotationResponse>("/api/v1/quotations", {
    method: "POST",
    body: JSON.stringify(data),
  });
}