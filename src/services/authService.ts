import { apiFetch } from "./api";

export async function registerUser(formData: FormData) {

  return await apiFetch("/register", {
    method: "POST",
    body: formData,
  });
}