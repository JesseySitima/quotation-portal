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

export async function downloadQuotationExcel(
  quotationId: string,
): Promise<Blob> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/quotations/${quotationId}/excel`,
  );

  if (!response.ok) {
    throw new Error("Failed to download Excel quotation");
  }

  return response.blob();
}

export async function downloadQuotationWord(
  quotationId: string,
): Promise<Blob> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/quotations/${quotationId}/word`,
  );

  if (!response.ok) {
    throw new Error("Failed to download Word quotation");
  }

  return response.blob();
}