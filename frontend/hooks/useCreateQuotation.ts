import { useMutation } from "@tanstack/react-query";

import { createQuotation } from "@/lib/api/quotation";
import type {
  CreateQuotationRequest,
} from "@/types/quotation";

export function useCreateQuotation() {
  return useMutation({
    mutationFn: (data: CreateQuotationRequest) =>
      createQuotation(data),
  });
}