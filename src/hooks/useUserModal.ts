import { useState } from "react";
import { updateUser } from "../services/userService";

type User = {
    id: number,
    name: string,
    email: string,
    avatar: string,
    status: number
}

export function useUserModal(
    user: User,
    fetchData: () => Promise<void>
) {

    const token = localStorage.getItem("token");

    const [avatar, setAvatar] = useState<File | null>(null);

    const [avatarPreview, setAvatarPreview] = useState(
        `http://127.0.0.1:8000/storage/${user.avatar}`
    );

    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        status: user.status
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> 
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.name === "status" ? Number(e.target.value) : e.target.value,
        });
    };

    // Avatar
    const handleAvatarChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if(e.target.files && e.target.files[0]) {

            const file = e.target.files[0];

            setAvatar(file);

            // Preview immédiat
            setAvatarPreview(
                URL.createObjectURL(file)
            );
        }
    };

    const handleSubmit = async (
        userId: number
    ) => {

        // Vérification modifications
        if(
            formData.name === user.name &&
            formData.email === user.email &&
            !avatar &&
            formData.status === user.status
        ) {

            alert("Aucune modification détectée");

            return;
        }

        try {

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("status", formData.status.toString());

            // Avatar
            if(avatar) {

                data.append("avatar", avatar);
            }

            await updateUser(userId, data, token);

            // Reset avatar
            setAvatar(null);

            alert("Profil mis à jour avec succès");

            await fetchData();

        } catch(error) {

            console.error(error);
        }
    };

    return {
        formData,
        avatarPreview,
        handleInputChange,
        handleAvatarChange,
        handleSubmit,
    };
}