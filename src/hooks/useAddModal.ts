import { useState } from "react";
import { addUser } from "../services/userService";


export function useAddModal(fetchData: () => Promise<void>) {

    const [formData, setFormData] = useState({
        avatar: '',
        name: '',
        email:'',
        password: '',
        password_confirmation: ''
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string)
        };
        reader.readAsDataURL(file)
        }
    };

    const handleSubmit = async () => {

        if (!formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.password_confirmation
        ) {

            alert("Please fill each fields !");
            return;
        }

        if(formData.password !== formData.password_confirmation) {

            alert("There is a difference between the password and the password confirmation !");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);

            if(avatarFile) {
                data.append("avatar", avatarFile);
            }

            await addUser(data, token);

            setAvatarFile(null);

            // Reset avatar
            setAvatarFile(null);

            alert("Account added successfully");

            await fetchData();

        } catch (error) {
            console.error(error)
        }

    }

    return {
        avatarFile,
        avatarPreview,
        handleInputChange,
        handleAvatarChange,
        handleSubmit
    }

}