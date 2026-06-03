import { UsersRound } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
}

export default function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <UsersRound
                size={56}
                className="text-purple-400 mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-700">
                {title}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                {description}
            </p>
        </div>
    );
}