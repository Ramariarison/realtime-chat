import LeftSide from "../components/profile/SideProfile";
import ProfileContent from "../components/profile/ProfileContent";
import { useAuth } from "../hooks/useAuth";

export default function ProfileAdminPage() {

    const { user, isLoading } = useAuth();

    return (
        <div className="flex h-full">

            <LeftSide
                loading={isLoading}
                src={`http://127.0.0.1:8000/storage/${user?.avatar}`}
            />

            <ProfileContent/>

        </div>
    )
}