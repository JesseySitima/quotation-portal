const API_URL = "http://127.0.0.1:8000";

export async function getCategories() {
  const response = await fetch(
    `${API_URL}/api/v1/categories?page=1&page_size=20`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}