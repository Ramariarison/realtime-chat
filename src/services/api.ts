const BASE_URL = "http://localhost:8000/api";

type FetchOptions = {
  method?: string;
  body?: BodyInit | null;
  token?: string;
  isFormData?: boolean;
};

export async function apiFetch(
  endpoint: string,
  options: FetchOptions = {}
) {
  const headers: HeadersInit = {};

  headers["Accept"] = "application/json";
  
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body || null,
  });

  return await response.json();
}