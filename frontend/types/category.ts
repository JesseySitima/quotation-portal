export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}