export interface QuotationItemRequest {
  product_id: string;
  quantity: number;
}

export interface CreateQuotationRequest {
  facility_name: string;
  contact_person: string;
  email: string;
  phone: string;
  notes: string;
  items: QuotationItemRequest[];
}

export interface QuotationItemResponse {
  id: string;
  quotation_request_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit: string;
}

export interface QuotationResponse {
  id: string;
  request_number: string;
  facility_name: string;
  contact_person: string;
  email: string;
  phone: string;
  notes: string | null;
  status: string;
  items: QuotationItemResponse[];
}