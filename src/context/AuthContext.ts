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
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);