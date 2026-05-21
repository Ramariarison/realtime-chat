import { ChevronRight } from "lucide-react";

// Props
type Props = {
  loading: boolean,
  src: string,
};

export default function LeftSide({ loading, src }: Props) {

  const load = loading;

  return (
    <div className="p-6 w-80 md:w-96 bg-gray-100 flex flex-col h-full justify-center items-center text-center">
      { load ? ( 
        <div className="w-42 h-42 rounded-full mb-6 bg-white animate-pulse">
        </div>
       ) : ( 
        <div className="w-42 h-42 mb-6">
          <img
            className="h-full w-full rounded-full object-cover"
            src={src}
          />
        </div>
      )}

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