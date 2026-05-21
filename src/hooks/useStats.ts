import { useEffect, useState } from "react";

import { getStats } from "../services/userService";

export function useStats() {

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);

    const [sum, setSum] = useState<number>();
    const [sumValidated, setSumValidated] = useState<number>();
    const [sumPending, setSumPending] = useState<number>();

    const fetchStats = async () => {

        try {

            setLoading(true);

            const response = await getStats(token);

            setSum(response.sumUsers);

            setSumValidated(
                response.sumValidatedUsers
            );

            setSumPending(
                response.sumPendingUsers
            );

        } catch(error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return {
        loading,
        sum,
        sumValidated,
        sumPending,
    };
}