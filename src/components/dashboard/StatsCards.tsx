import {
    Users,
    UserCheck,
    UserLock
} from "lucide-react";

type Props = {
    loading: boolean;
    sum?: number;
    sumValidated?: number;
    sumPending?: number;
};

export default function StatsCards({
    loading,
    sum,
    sumValidated,
    sumPending,
}: Props) {

    const cards = [
        {
            title: "Total Users",
            value: sum,
            icon: Users,
            overlay: "bg-blue-600/40",
        },
        {
            title: "Validated Users",
            value: sumValidated,
            icon: UserCheck,
            overlay: "bg-green-600/40",
        },
        {
            title: "Pending Users",
            value: sumPending,
            icon: UserLock,
            overlay: "bg-red-600/40",
        },
    ];

    return (
        <div className="mt-4 ml-4 mr-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (

                    <div
                        key={index}
                        className="relative shadow-sm flex items-center justify-between rounded-lg p-6 overflow-hidden"
                        style={{
                            backgroundImage: "url('/images/bg-card.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >

                        <div className={`absolute inset-0 ${card.overlay}`}></div>

                        <div className="relative z-10">

                            <p className="text-white text-sm font-semibold">
                                {card.title}
                            </p>

                            {loading ? (

                                <div className="h-8 w-20 mt-2 rounded bg-white/30 animate-pulse"></div>

                            ) : (

                                <h2 className="text-3xl text-white font-bold mt-0.5">
                                    {card.value}
                                </h2>

                            )}

                        </div>

                        <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md text-white rounded-full">
                            <Icon size={32} strokeWidth={2.5} />
                        </div>

                    </div>
                );
            })}
        </div>
    );
}