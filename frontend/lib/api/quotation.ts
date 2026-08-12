import { apiClient } from "./client";
import type {
  CreateQuotationRequest,
} from "@/types/quotation";

export async function createQuotation(
  data: CreateQuotationRequest,
) {
  return apiClient("/api/v1/quotations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}