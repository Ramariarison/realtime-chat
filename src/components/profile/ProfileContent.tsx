import { Image } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../services/authService";

export default function ProfileContent() {

    const { user, setUser } = useAuth();

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        current_pass: "",
        new_pass: "",
    });

    const [avatar, setAvatar] = useState<File | null>(null);

    // Préremplir les champs
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

    // inputs
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // avatar
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

        // Vérification changement
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

            const response = await updateProfile(data, token);

            setUser(response.user);

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

    return (
        <div className="flex flex-1 justify-center items-center">

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">

                    <div>
                        <label className="block text-sm/6 font-semibold text-gray-900">
                            Name
                        </label>

                        <div className="mt-2">

                            <input
                                name="name"
                                value={formData.name}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                type="text"
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>

                    <div>
                        <label className="block text-sm/6 font-semibold text-gray-900">
                            Email Address
                        </label>

                        <div className="mt-2">

                            <input
                                name="email"
                                value={formData.email}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                type="email"
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>

                    <div className="sm:col-span-2">

                        <label className="block text-sm/6 font-semibold text-gray-900">
                            Current Password
                        </label>

                        <div className="mt-2">

                            <input
                                name="current_pass"
                                value={formData.current_pass}
                                placeholder="Current password"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                type="password"
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>

                    <div className="sm:col-span-2">

                        <label className="block text-sm/6 font-semibold text-gray-900">
                            New Password
                        </label>

                        <div className="mt-2">

                            <input
                                name="new_pass"
                                value={formData.new_pass}
                                placeholder="New password"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                type="password"
                                onChange={handleInputChange}
                                disabled={!formData.current_pass}
                            />

                        </div>
                    </div>

                    {/* Avatar section */}

                    <div>
                        <label className="block text-sm/6 font-semibold text-gray-900">
                            Avatar
                        </label>

                        <div className="mt-2 flex items-center gap-4">

                            <div className="w-12 h-12">

                                <img
                                    src={`http://127.0.0.1:8000/storage/${user?.avatar}?t=${Date.now()}`}
                                    className="w-full h-full rounded-full object-cover"
                                />

                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 rounded-sm text-sm/6 font-semibold cursor-pointer"
                                >
                                    Change
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="sm:col-span-2">

                        <label className="block text-sm/6 font-semibold text-gray-900">
                            Avatar photo
                        </label>

                        {/* Zone upload */}
                        <label
                            htmlFor="avatar-upload"
                            className="mt-2 h-50 border border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center text-center bg-white hover:border-blue-500 transition cursor-pointer overflow-hidden"
                        >

                            {/* Preview image */}
                            {avatar ? (

                                <div className="flex flex-col items-center justify-center h-full">

                                    <img
                                        src={URL.createObjectURL(avatar)}
                                        alt="preview"
                                        className="w-32 h-32 rounded-full object-cover mb-4 flex-shrink-0"
                                    />

                                    <p className="text-sm text-blue-500 font-medium truncate max-w-[220px]">
                                        {avatar.name}
                                    </p>

                                </div>

                            ) : (

                                <div className="flex flex-col items-center justify-center h-full">

                                    {/* Icon */}
                                    <div className="mb-4">
                                        <Image className="w-12 h-12 text-gray-400"/>
                                    </div>

                                    {/* Text */}
                                    <p className="text-sm text-gray-400">
                                        <span className="text-blue-500 font-medium">
                                            Upload a file
                                        </span>{" "}
                                        or drag and drop
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG, GIF up to 1MB
                                    </p>

                                </div>

                            )}

                            {/* Hidden input */}
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />

                        </label>

                    </div>

                    {/* Button */}

                    <div className="mt-2 sm:col-span-2">

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer rounded-sm px-3 py-2 text-white text-sm/6 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 shadow-md"
                        >

                            {loading ? "Updating..." : "Apply"}

                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
}