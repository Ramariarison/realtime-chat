import { createContext, type Dispatch, type SetStateAction } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: "admin" | "normal";
}

export interface AuthContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    login: (data: FormData) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    errorResp: string;
    setErrorResp: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);