import { apiFetch } from "./api";

export async function getUsers(token: string) {

    return await apiFetch("/admin/users", {
        method: "POST",
        token,
    });
}

export async function getStats(token: string) {

    return await apiFetch("/admin/stats", {
        method: "POST",
        token,
    });
}

export async function me(token: string) {

    return await apiFetch("/user/user-info", {
        method: "POST",
        token,
    });
}

export async function valideUser(user: number, token: string) {

    return await apiFetch(`/admin/users/${user}/validate`, {
        method: "POST",
        token,
    });
}