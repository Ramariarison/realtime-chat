import { apiFetch } from "./api";

export async function searchUsers(query: string, token: string) {
    return await apiFetch(
        `/users/search?query=${encodeURIComponent(query)}`,
        {
            method: "GET",
            token,
        }
    );
}

export async function sendFriendInvitation(
    userId: number,
    token: string
) {
    return await apiFetch(
        `/friends/invite/${userId}`,
        {
            method: "POST",
            token,
        }
    );
}

export async function getFriendRequests(token: string) {
    return await apiFetch("/friends/requests", {
        method: "GET",
        token,
    });
}

export async function acceptFriendRequest(
    userId: number,
    token: string
) {
    return await apiFetch(
        `/friends/${userId}/accept`,
        {
            method: "POST",
            token,
        }
    );
}

export async function declineFriendRequest(
    userId: number,
    token: string
) {
    return await apiFetch(
        `/friends/${userId}/decline`,
        {
            method: "DELETE",
            token,
        }
    );
}