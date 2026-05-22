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

    // Token JWT
    if(options.token) {

        headers["Authorization"] =
            `Bearer ${options.token}`;
    }

    // Content-Type
    if(
        options.body &&
        !(options.body instanceof FormData)
    ) {

        headers["Content-Type"] =
            "application/json";
    }

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            method: options.method || "GET",
            headers,
            body: options.body || null,
        }
    );

    // Validation Laravel
    if(response.status === 422) {

        const errorData = await response.json();

        const errorMessages = Object
            .values(errorData.errors || {})
            .flat()
            .join(", ");

        throw new Error(
            errorMessages ||
            errorData.message ||
            "Erreur de validation"
        );
    }

    // Token expiré
    if(response.status === 401 && options.token) {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        // Redirection login
        window.location.replace("/");

        throw new Error(
            "Session expirée, veuillez vous reconnecter."
        );
    }

    // Autres erreurs
    if(!response.ok) {

        const errorData =
            await response
                .json()
                .catch(() => ({}));

        throw new Error(
            errorData.message ||
            `Erreur ${response.status}: ${response.statusText}`
        );
    }

    return await response.json();
}