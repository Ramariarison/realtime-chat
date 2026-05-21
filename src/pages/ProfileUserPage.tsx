import LeftSide from "../components/profile/SideProfile";
import ProfileContent from "../components/profile/ProfileContent";
import { useEffect, useState } from "react";
import { me } from "../services/userService";

export default function Profilepage() {

    type User = {
        name: string,
        email: string,
        avatar: string
    };

    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await me(token);
                setUser(response.user_info);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [])

    return (
        <div className="flex h-full">

            <LeftSide 
                loading={loading}
                src={`http://127.0.0.1:8000/storage/${user?.avatar}`}
            />

            <ProfileContent
                loading={loading}
                Name={user?.name}
                Email={user?.email}
                src={`http://127.0.0.1:8000/storage/${user?.avatar}`}
            />

        </div>
    )
}