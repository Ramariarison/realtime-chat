import StatsCards from "../components/dashboard/StatsCards";

import { useStats } from "../hooks/useStats";

export default function Dashboard() {

    const {
        loading,
        sum,
        sumValidated,
        sumPending,
    } = useStats();

    return (

        <div>

            <h1 className="mx-8 text-gray-700 text-xl font-semibold m-4">
                Dashboard
            </h1>

            <StatsCards
                loading={loading}
                sum={sum}
                sumValidated={sumValidated}
                sumPending={sumPending}
            />

        </div>
    );
}