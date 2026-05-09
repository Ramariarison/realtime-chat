const BASE_URL = "http://localhost:8000/api";

type FetchOptions = {
  method?: string;
  body?: BodyInit | null;
  token?: string;
};

export async function apiFetch(
  endpoint: string,
  options: FetchOptions = {}
) {

  const headers: HeadersInit = {};

  // Ajouter token si existe
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body || null,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur serveur");
  }

  return data;
}