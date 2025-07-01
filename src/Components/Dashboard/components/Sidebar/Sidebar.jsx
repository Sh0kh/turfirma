import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";

export default function Sidebar({ active, onclose }) {
    const [role] = useState("admin");
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const groupedMenuItems = [
        {
            section: "Asosiy",
            items: [
                {
                    id: 1,
                    title: "Dashboard",
                    path: "/",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h5.25V15h4.5v5.25H19.5V10.5" />
                        </svg>
                    )
                },
                {
                    id: 1,
                    title: "Foydalanuvchilar",
                    path: "/client",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="1.09em" height="1em" viewBox="0 0 26 24"><path fill="currentColor" d="M22.313 17.295a7.44 7.44 0 0 0-4.089-2.754l-.051-.011l-1.179 1.99a1.003 1.003 0 0 1-1 1c-.55 0-1-.45-1.525-1.774v-.032a1.25 1.25 0 1 0-2.5 0v.033v-.002c-.56 1.325-1.014 1.774-1.563 1.774a1.003 1.003 0 0 1-1-1l-1.142-1.994a7.47 7.47 0 0 0-4.126 2.746l-.014.019a4.5 4.5 0 0 0-.655 2.197v.007c.005.15 0 .325 0 .5v2a2 2 0 0 0 2 2h15.5a2 2 0 0 0 2-2v-2c0-.174-.005-.35 0-.5a4.5 4.5 0 0 0-.666-2.221l.011.02zM7.968 5.29c0 2.92 1.82 7.21 5.25 7.21c3.37 0 5.25-4.29 5.25-7.21v-.065a5.25 5.25 0 1 0-10.5 0v.068zm11.234 1.72c0 1.902 1.186 4.698 3.42 4.698c2.195 0 3.42-2.795 3.42-4.698v-.052a3.421 3.421 0 0 0-6.842 0v.055v-.003zm-19.2 1.6c0 1.902 1.186 4.698 3.42 4.698c2.195 0 3.42-2.795 3.42-4.698v-.052a3.421 3.421 0 0 0-6.842 0v.055v-.003z"></path></svg>
                    )
                },
                {
                    id: 1,
                    title: "Tariflar",
                    path: "/category",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m7 0a4 4 0 1 1-3.995 4.2L13 17l.005-.2A4 4 0 0 1 17 13"></path></svg>
                    )
                },
                {
                    id: 1,
                    title: "To‘lovlar",
                    path: "/payment",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M23.8 3a1.5 1.5 0 0 0-1.5-1.5h-14A1.5 1.5 0 0 0 6.8 3v8a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5Zm-2 7.25a.25.25 0 0 1-.25.25H9.05a.25.25 0 0 1-.25-.25V3.78a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25Z"></path><path fill="currentColor" d="M13.3 7.03a2 2 0 1 0 4 0a2 2 0 1 0-4 0m6.9 9.5l-3.53 1.17a.23.23 0 0 0-.15.14A2 2 0 0 1 14.7 19h-4a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .5-.5h4a1 1 0 0 0 0-2h-3.5a7.15 7.15 0 0 0-4-1.5H5.14a4 4 0 0 0-1.79.5l-3 1.51a.25.25 0 0 0-.13.22v5.4a.26.26 0 0 0 .13.22a.25.25 0 0 0 .25 0l3.22-2a1 1 0 0 1 .85-.1c10 3.36 6.63 3.37 17.87-2.31a.52.52 0 0 0 .06-.94a2.48 2.48 0 0 0-2.4-.47"></path></svg>
                    )
                },
                {
                    id: 1,
                    title: "Havolalar",
                    path: "/links",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M17.74 2.76a4.32 4.32 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.32 4.32 0 0 1 6.1 0M8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0m-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.32 4.32 0 0 1-6.1 0a4.32 4.32 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0"></path></svg>
                    )
                },
                {
                    id: 1,
                    title: "Bot sozlamalari",
                    path: "/bot/settings",
                    icon: (
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"></path></svg>
                    )
                },
            ]
        }
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Card className="h-[95%] w-[280px] fixed top-[15px] left-[15px] z-50 shadow-xl bg-white/30 backdrop-blur-md border border-white/20 px-6 py-6 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-md flex items-center justify-center text-black font-bold text-xl">
                            St
                        </div>
                        <span className="text-xl font-semibold text-gray-800"></span>
                    </div>
                    <div className="flex flex-col gap-6">
                        {groupedMenuItems.map((group) => (
                            <div key={group.section}>
                                <Typography variant="small" color="gray" className="mb-2 uppercase font-medium text-xs tracking-widest">
                                    {group.section}
                                </Typography>
                                <div className="flex flex-col gap-2">
                                    {group.items.map((item) => (
                                        <NavLink
                                            key={item.id}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 
                                                ${isActive
                                                    ? "bg-white/80 text-blue-600 font-semibold shadow-md"
                                                    : "text-gray-700 hover:bg-white/40 hover:text-blue-600"}`
                                            }
                                        >
                                            <span className="w-6 h-6">{item.icon}</span>
                                            <span className="text-sm">{item.title}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Mobile Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[49] transition-opacity duration-300 ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={onclose}
            />

            {/* Mobile Sidebar */}
            <div
                className={`md:hidden fixed top-0 left-0 h-screen w-[280px] z-50 transform transition-transform duration-300 ease-in-out ${active ? "translate-x-0" : "-translate-x-full"}`}
            >
                <Card
                    className="h-full w-full shadow-xl bg-white/95 backdrop-blur-md border border-white/20 px-6 py-6 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-md flex items-center justify-center text-black font-bold text-xl">
                            M
                        </div>
                        <span className="text-xl font-semibold text-gray-800">Moni Credits</span>
                    </div>
                    <div className="flex flex-col gap-6">
                        {groupedMenuItems.map((group) => (
                            <div key={group.section}>
                                <Typography variant="small" color="gray" className="mb-2 uppercase font-medium text-xs tracking-widest">
                                    {group.section}
                                </Typography>
                                <div className="flex flex-col gap-2">
                                    {group.items.map((item) => (
                                        <div key={item.id} onClick={onclose}>
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 
                                                    ${isActive
                                                        ? "bg-white/80 text-blue-600 font-semibold shadow-md"
                                                        : "text-gray-700 hover:bg-white/40 hover:text-blue-600"}`
                                                }
                                            >
                                                <span className="w-6 h-6">{item.icon}</span>
                                                <span className="text-sm">{item.title}</span>
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </>
    );
}
