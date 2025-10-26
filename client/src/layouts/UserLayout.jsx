import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";

const UserLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-[#1A2238]">
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            <div className="relative flex-1 p-6 bg-gradient-to-r from-[#2D3A5A] via-[#1A2238] to-[#2D3A5A] transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;