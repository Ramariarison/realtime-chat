import LeftSide from "../components/profile/SideProfile";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profilepage() {
    return (
        <div className="flex h-full">

            <LeftSide />

            <ProfileContent />

        </div>
    )
}