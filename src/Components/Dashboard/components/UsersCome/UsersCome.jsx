import React, { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
    PencilIcon,
    LockClosedIcon,
    UserPlusIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

export default function UsersCome() {
    const [search, setSearch] = useState("");
    
    // URL dan title olish
    const getPageTitle = () => {
        const path = window.location.pathname;
        const segments = path.split('/');
        const lastSegment = segments[segments.length - 1];
        return decodeURIComponent(lastSegment) || 'Foydalanuvchilar';
    };

    const users = [
        {
            id: 1,
            name: "Ali Valiyev",
            phone: "+998901234567",
            plan: "Gold",
            startDate: "2025-06-01",
            endDate: "2025-12-01",
            status: "Aktiv",
            subscriptionCount: 3,
        },
        {
            id: 2,
            name: "Zarina Karimova",
            phone: "+998903456789",
            plan: "TestDrive",
            startDate: "2025-06-15",
            endDate: "2025-07-15",
            status: "Kutmoqda",
            subscriptionCount: 1,
        },
        {
            id: 3,
            name: "Bobur Rashidov",
            phone: "+998912345678",
            plan: "Silver",
            startDate: "2025-01-01",
            endDate: "2025-06-30",
            status: "Muddat tugagan",
            subscriptionCount: 2,
        },
        {
            id: 4,
            name: "Dilshod Umarov",
            phone: "+998907654321",
            plan: "Gold",
            startDate: "2025-05-01",
            endDate: "2025-11-01",
            status: "Aktiv",
            subscriptionCount: 4,
        },
        {
            id: 5,
            name: "Malika Nazarova",
            phone: "+998909876543",
            plan: "Silver",
            startDate: "2025-03-01",
            endDate: "2025-09-01",
            status: "Aktiv",
            subscriptionCount: 2,
        },
    ];

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.phone.includes(search) ||
            user.id.toString() === search
    );

    const handleUserClick = (user) => {
        alert(`Mijoz: ${user.name}\nID: ${user.id}\nTelefon: ${user.phone}\nPaket: ${user.plan}\nNecha marta: ${user.subscriptionCount}\nHolat: ${user.status}`);
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h4" className="text-gray-800">
                    {getPageTitle()}
                </Typography>
                <Button color="green" className="flex items-center gap-2">
                    <UserPlusIcon className="h-5 w-5" />
                    Obunachi +
                </Button>
            </div>

            <Card className="mb-4 p-[20px]">
                <div>
                    <Input
                        label="Qidiruv (ism, telefon, ID)"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </Card>

            <Card>
                <CardBody className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                <th className="p-3">ID</th>
                                <th className="p-3">Ism Familiya</th>
                                <th className="p-3">Telefon</th>
                                <th className="p-3">Holat</th>
                                <th className="p-3">Paket ochgan</th>
                                <th className="p-3">Paket tugashi</th>
                                <th className="p-3">Qaysi paket</th>
                                <th className="p-3">Necha marta</th>
                                <th className="p-3 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-gray-50 text-sm">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleUserClick(user)}
                                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                        >
                                            {user.name}
                                        </button>
                                    </td>
                                    <td className="p-3">{user.phone}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.status === "Aktiv"
                                                    ? "bg-green-100 text-green-800"
                                                    : user.status === "Muddat tugagan"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{user.startDate}</td>
                                    <td className="p-3">{user.endDate}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.plan === "Gold"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : user.plan === "Silver"
                                                    ? "bg-gray-100 text-gray-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="p-3 font-semibold text-center">{user.subscriptionCount}</td>
                                    <td className="p-3 flex gap-2 justify-center">
                                        <Tooltip content="Batafsil ko'rish">
                                            <IconButton
                                                variant="text"
                                                color="blue"
                                                onClick={() => handleUserClick(user)}
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Tahrirlash">
                                            <IconButton variant="text" color="blue">
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Obunani yopish">
                                            <IconButton variant="text" color="red">
                                                <LockClosedIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="text-center py-6 text-gray-500">
                                        Hech narsa topilmadi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}