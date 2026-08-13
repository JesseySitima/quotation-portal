import { useState } from "react";

import {
  downloadQuotationExcel,
  downloadQuotationWord,
} from "@/lib/api/quotation";

export function useDownloadQuotation() {
  const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);
  const [isDownloadingWord, setIsDownloadingWord] = useState(false);

  async function downloadExcel(quotationId: string) {
    try {
      setIsDownloadingExcel(true);

      const blob = await downloadQuotationExcel(quotationId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `quotation-${quotationId}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } finally {
      setIsDownloadingExcel(false);
    }
  }

  async function downloadWord(quotationId: string) {
    try {
      setIsDownloadingWord(true);

      const blob = await downloadQuotationWord(quotationId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `quotation-${quotationId}.docx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } finally {
      setIsDownloadingWord(false);
    }
  }

  return {
    downloadExcel,
    downloadWord,
    isDownloadingExcel,
    isDownloadingWord,
  };
}