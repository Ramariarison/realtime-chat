import LeftSide from "../components/profile/SideProfile";
import ProfileContent from "../components/profile/ProfileContent";
import { me } from "../services/userService";
import { useEffect, useState } from "react";

export default function ProfileAdminPage() {

    type Admin = {
        name: string,
        email: string,
        avatar: string,
    };

    const [admin, setAdmin] = useState<Admin | null>(null);

    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAdmin = async () => {
            setLoading(true);
            try {
                const response = await me(token);
                setAdmin(response.user_info);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            };
        }
        fetchAdmin();
    }, []);

    return (
        <div className="flex h-full">

            <LeftSide
                loading={loading}
                src={`http://127.0.0.1:8000/storage/${admin?.avatar}`}
            />

            <ProfileContent
                loading={loading}
                Name={admin?.name}
                Email={admin?.email}
                src={`http://127.0.0.1:8000/storage/${admin?.avatar}`}
            />

        </div>
    )
}