import { X, RefreshCw, FileArchiveIcon, Camera } from "lucide-react"

import { useUserModal } from "../../hooks/useUserModal"

type User = {
    id: number,
    name: string,
    email: string,
    avatar: string,
}

type UserModalProps = {
    user: User,
    onClose: () => void,
    fetchData: () => Promise<void>
}

export default function UserModal({ user, onClose, fetchData }: UserModalProps) {

    const { formData, handleInputChange, handleSubmit, avatarPreview, handleAvatarChange } = useUserModal(user, fetchData);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            
            <div className="flex bg-gray-100 rounded-md min-w-170">

                <div className="flex flex-col items-center w-62.5 p-10">

                    {/* Image */}
                    <div className="relative h-42 w-42 mb-3">

                        <img
                            className="h-full w-full rounded-2xl object-cover"
                            src={avatarPreview}
                        />

                        {/* Voile */}
                        <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-end justify-center pb-4">

                            <div className="bg-white/50 p-2 rounded-full">
                                <Camera className="w-4 h-4 text-black"/>
                            </div>

                        </div>

                        {/* Input file */}
                        <label className="absolute inset-0 cursor-pointer">

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />

                        </label>

                    </div>

                    {/* Desc */}
                    <div className="p-2 flex items-center justify-center gap-2 bg-gray-200 rounded-sm w-42">
                        <FileArchiveIcon height={16} width={16}/>
                        <span className="text-sm font-semibold">
                            Account details
                        </span>
                    </div>

                </div>

                <div className="p-12 flex-1 flex-col bg-white rounded-r-md">

                    <div className="p-2 flex justify-between">

                        <h2 className="font-semibold text-2xl">
                            Account details
                        </h2>

                        <button 
                            className="bg-gray-200 rounded-full p-2 transition-colors cursor-pointer"
                            onClick={onClose}
                        >
                            <X className="w-4 h-4" />
                        </button>

                    </div>

                    <div className="mt-2">

                        <div className="p-2 flex flex-col gap-2">

                            <label className="ml-2 text-sm text-gray-600">Full name</label>

                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text" 
                                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div className="p-2 flex flex-col gap-2">

                            <label className="ml-2 text-sm text-gray-600">Email address</label>

                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="text" 
                                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                    </div>

                    {/* Bouton */}
                    <div className="p-2">
                        <button onClick={() => handleSubmit(formData.id)} className="mt-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
                            <div className="flex items-center gap-2">
                                <RefreshCw height={14} width={14}/>
                                <span>Update</span>
                            </div>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}