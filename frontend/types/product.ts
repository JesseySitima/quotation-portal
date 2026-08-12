export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  unit: string;
  stock_quantity: number;
  is_available: boolean;
  category_id: string;
}

export interface ProductsResponse {
  items: Product[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface GetProductsParams {
  search?: string;
  category_id?: string;
  page?: number;
  page_size?: number;
}