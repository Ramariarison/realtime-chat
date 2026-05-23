import { useEffect, useState } from "react";
import { destroy, getUsers, valideUser } from "../services/userService";

export function useUsersList() {

       type User = {
        id: number;
        avatar: string;
        name: string;
        email: string;
        status: number
    };

    const [users, setUsers] = useState<User[]>([]);

    const [message, setMessage] = useState('');

    const [showMessage, setShowMessage] = useState(false);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const token = localStorage.getItem("token");

    // Fetch global
    const fetchData = async () => {

        setLoading(true);

        try {

            // Users
            const usersResponse = await getUsers(token);
            setUsers(usersResponse.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    // Initial loading
    useEffect(() => {
        fetchData();
    }, []);

    const filteredUsers = users.filter((user) => {

            const matchSearch = user.name.toLowerCase().includes(search.toLowerCase());

            const matchStatus = statusFilter === "All" || user.status.toString() === statusFilter;

            return matchSearch && matchStatus;
        }
    );

    // Validate user
    const handleValideUser = async (userId: number) => {

        try {

            const response = await valideUser(userId, token);

            if (response && response.message) {
                setMessage(response.message);
            }

            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            await fetchData();

        } catch (error) {

            console.error(error);
        }
    }

    // Supprimer utilisateur
    const handleDeleteUser = async (userId: number) => {

        try {

            const response = await destroy(userId, token);

            if(response && response.message) {
                setMessage(response.message);
            }

            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            await fetchData();

        } catch (error) {

            console.error(error);

        }

    }

    return {
        message,
        showMessage,
        setShowMessage,
        loading,
        setSearch,
        statusFilter,
        setStatusFilter,
        filteredUsers,
        handleValideUser,
        handleDeleteUser,
    };
}