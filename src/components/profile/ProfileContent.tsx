import { Image } from "lucide-react";

export default function ProfileContent() {
    return (
        <div className="flex flex-1 justify-center items-center">  
            <form action="#">
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="" className="block text-sm/6 font-semibold text-gray-900">Name</label>
                        <div className="mt-2">
                            <input placeholder="Andry" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm/6 font-semibold text-gray-900">Email</label>
                        <div className="mt-2">
                            <input placeholder="andry@gmail.com" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" type="text" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm/6 font-semibold text-gray-900">Password</label>
                        <div className="mt-2">
                            <input placeholder="Password" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" type="text" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm/6 font-semibold text-gray-900">Password confirmation</label>
                        <div className="mt-2">
                            <input placeholder="Password confirmation" className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" type="text" />
                        </div>
                    </div>

                    { /* Avatar section */ }

                    <div>
                        <label className="block text-sm/6 font-semibold text-gray-900">Avatar</label>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="w-12 h-12">
                                <img 
                                    src="/images/emily.jpg"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <button className="px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 rounded-sm text-sm/6 font-semibold cursor-pointer">
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm/6 font-semibold text-gray-900">Avatar photo</label>
                        <div className="mt-2 border border-dashed border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-white hover:border-blue-500 transition cursor-pointer">

                            { /* Icon */ }
                            <div className="mb-4">
                                <Image className="w-12 h-12 text-gray-400"/>
                            </div>

                            { /* Text */ }
                            <p className="text-sm text-gray-400">
                                <span className="text-blue-500 font-medium">Upload a file</span>{" "}
                                or drag and drop
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, GIF up to 10MB
                            </p>

                        </div>
                    </div>

                    { /* Button */ }

                    <div className="mt-2 sm:col-span-2">
                        <button className="w-full rounded-sm px-3 py-2 text-white text-sm/6 font-semibold bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
                            Apply
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}