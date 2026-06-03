import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center py-8">
            <LoaderCircle
                size={40}
                className="text-purple-500 animate-spin"
            />
        </div>
    );
}