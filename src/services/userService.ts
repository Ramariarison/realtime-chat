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

export async function destroy(user: number, token: string) {

    return await apiFetch(`/admin/users/${user}/delete`, {
        method: "DELETE",
        token,
    });
}

export async function updateUser(user: number, data: FormData, token: string) {

    return await apiFetch(`/admin/users/${user}/update-user`, {
        method: "POST",
        body: data,
        token,
    })
}

export async function addUser(data: FormData, token: string) {

    return await apiFetch('/admin/users/add', {
        method: "POST",
        body: data,
        token,
    })
}