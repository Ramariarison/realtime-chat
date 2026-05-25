import { Camera, FileArchiveIcon, RefreshCw, X } from "lucide-react";

import { useAddModal } from "../../hooks/useAddModal";

type AddModalProps = {
    onClose: () => void,
    fetchData: () => Promise<void>
}

export default function AddUserModal({ onClose, fetchData }: AddModalProps) {

    const { handleInputChange, handleAvatarChange, handleSubmit, avatarPreview } = useAddModal(fetchData); 

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            
            <div className="flex bg-gray-100 rounded-md min-w-170">

                <div className="flex flex-col items-center w-62.5 p-10">

                    {/* Image */}
                    <div className="relative h-42 w-42 mb-3">
                        {avatarPreview ? (
                            <img
                                className="h-full w-full rounded-2xl object-cover"
                                src={avatarPreview}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}

                        {/* Voile */}
                        <div className="absolute inset-0 bg-black/10 rounded-2xl flex items-end justify-center pb-4">

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
                            onClick={onClose}
                            className="bg-gray-200 rounded-full p-2 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                    </div>

                    <div className="mt-2">

                        <div className="p-2 flex flex-col gap-2">

                            <label className="ml-2 text-sm text-gray-600">Full name</label>

                            <input
                                onChange={handleInputChange}
                                name="name"
                                type="text" 
                                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div className="p-2 flex flex-col gap-2">

                            <label className="ml-2 text-sm text-gray-600">Email address</label>

                            <input
                                onChange={handleInputChange}
                                name="email"
                                type="email" 
                                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div className="p-2 flex flex-col gap-2">

                            <label className="ml-2 text-sm text-gray-600">Password</label>

                            <input
                                onChange={handleInputChange}
                                name="password"
                                type="password" 
                                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div className="p-2 flex flex-col gap-2">

                            <label className="ml-2 text-sm text-gray-600">Password confirmation</label>

                            <input
                                onChange={handleInputChange}
                                name="password_confirmation"
                                type="password" 
                                className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                    </div>

                    {/* Bouton */}
                    <div className="p-2">
                        <button onClick={handleSubmit} className="mt-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
                            <div className="flex items-center gap-2">
                                <RefreshCw height={14} width={14}/>
                                <span>Add User</span>
                            </div>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}