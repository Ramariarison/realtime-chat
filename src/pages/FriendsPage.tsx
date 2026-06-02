import Header from "../components/Friend/Header"
import FriendsSection from "../components/Friend/FriendsSection"
import RequestSection from "../components/Friend/RequestSection"
import InviteSection from "../components/Friend/InviteSection"
import { useState } from "react"

export default function FriendsPage() {

    const [activeTab, setActiveTab] = useState('friends');

    return (
        <div>
            <Header
                active={activeTab}
                setActive={setActiveTab}
            />

            { activeTab === 'friends' && <FriendsSection /> }

            { activeTab === 'requests' && <RequestSection /> }

            { activeTab === 'find' && <InviteSection /> }
            
        </div>
    )
}