import { ChevronRight } from "lucide-react";

export default function LeftSide() {
  return (
    <div className="w-80 md:w-96 bg-white flex flex-col h-full items-center justify-center text-center px-6">
      
      <div className="w-32 h-32 mb-6">
        <img
          className="h-full w-full rounded-full object-cover"
          src="/images/Image.jpg"
        />
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Let's get you set up
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Set up your profile to get the best experience. Add your personal
        information, update your preferences, and make your account truly yours.
      </p>

      <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
        <ChevronRight className="w-6 h-6 text-white" />
      </div>

    </div>
  );
}