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

        // Vérification modifications
        if(
            formData.name === user?.name &&
            formData.email === user?.email &&
            !avatar &&
            !formData.current_pass &&
            !formData.new_pass
        ) {

            alert("Aucune modification détectée");

            return;
        }

        try {

            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);

            // Password
            if(formData.current_pass) {

                data.append(
                    "current_pass",
                    formData.current_pass
                );
            }

            if(formData.new_pass) {

                data.append(
                    "new_pass",
                    formData.new_pass
                );
            }

            // Avatar
            if(avatar) {

                data.append("avatar", avatar);
            }

            const response =
                await updateProfile(data, token);

            // Reset avatar
            setAvatar(null);

            // Reset passwords
            setFormData(prev => ({
                ...prev,
                current_pass: "",
                new_pass: "",
            }));

            // Update user
            setUser(response.user);

            // Update localStorage
            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            alert("Profil mis à jour avec succès");

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