import React from "react";
import { Outlet } from "react-router-dom";
import { Copyright } from "./Copyright";
import Navbar from "./navigation/Navbar";

const AppLayout = () => {
    return (
        <div className="min-h-screen h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow absolute mb-auto h-10 top-24 container mx-auto px-4 sm:px-6">
                <Outlet />
                <Copyright />
            </main>
        </div>
    )
}

export default AppLayout;