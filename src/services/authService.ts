import { apiFetch } from "./api";

export async function registerUser(formData: FormData) {

  return await apiFetch("/register", {
    method: "POST",
    body: formData,
  });
}

export async function loginUser(formData: FormData) {

  return await apiFetch("/login", {
    method: "POST",
    body: formData,
  });
}

export async function logoutUser(token: string) {
  
  return await apiFetch("/logout", {
    method: "POST",
    token,
  });
}

export async function updateProfile(
    data: FormData,
    token: string
) {

    return await apiFetch("/user/update", {
        method: "POST",
        token,
        body: data,
    });
}