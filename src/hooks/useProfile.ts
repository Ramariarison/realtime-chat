import { useEffect, useState } from "react";

import { useAuth } from "./useAuth.tsx";
import { updateProfile } from "../services/authService";

export function useProfile() {

    const { user, setUser } = useAuth();

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);

    const [avatar, setAvatar] =
        useState<File | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        current_pass: "",
        new_pass: "",
    });

    // Préremplissage
    useEffect(() => {

        if(user) {

            setFormData({
                name: user.name || "",
                email: user.email || "",
                current_pass: "",
                new_pass: "",
            });
        }

    }, [user]);

    // Inputs
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Avatar
    const handleAvatarChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if(e.target.files && e.target.files[0]) {

            setAvatar(e.target.files[0]);
        }
    };

    // Submit
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if(
            formData.name === user?.name &&
            formData.email === user?.email
        ) {

            alert("Aucune modification détectée");

            return;
        }

        try {

            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);

            if(avatar) {
                data.append("avatar", avatar);
            }

            const response =
                await updateProfile(data, token);

            setUser(response.user);

            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

        } catch(error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return {
        user,
        loading,
        avatar,
        formData,
        handleInputChange,
        handleAvatarChange,
        handleSubmit,
    };
}