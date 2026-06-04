import { apiFetch } from "./api";

export async function startConversation(
    userId: number,
    token: string
) {
    return await apiFetch(
        `/conversations/start/${userId}`,
        {
            method: "POST",
            token,
        }
    );
}

export async function getConversations(token: string) {
    return await apiFetch("/conversations", {
        method: "GET",
        token,
    });
}

export async function getMessages(
    conversationId: number,
    token: string
) {
    return await apiFetch(
        `/conversations/${conversationId}/messages`,
        {
            method: "GET",
            token,
        }
    );
}

export async function sendMessage(
    conversationId: number,
    content: string,
    token: string
) {
    return await apiFetch(
        `/conversations/${conversationId}/messages`,
        {
            method: "POST",
            token,
            body: JSON.stringify({
                content,
            }),
        }
    );
}