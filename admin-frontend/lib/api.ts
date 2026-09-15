const API_URL = "http://127.0.0.1:8000";

export async function getQuotations() {
  const response = await fetch(
    `${API_URL}/api/v1/quotations`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quotations");
  }

  return response.json();
}