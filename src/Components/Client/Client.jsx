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
} from "@heroicons/react/24/outline";

export default function Client() {
    const [search, setSearch] = useState("");

    const users = [
        {
            id: 1,
            name: "Ali Valiyev",
            username: "@alivali",
            phone: "+998901234567",
            passport: "AB1234567",
            plan: "Gold",
            startDate: "2025-06-01",
            endDate: "2025-12-01",
            status: "Aktiv",
            payment: "To‘langan",
        },
        {
            id: 2,
            name: "Zarina Karimova",
            username: "",
            phone: "+998903456789",
            passport: "AC9876543",
            plan: "TestDrive",
            startDate: "2025-06-15",
            endDate: "2025-07-15",
            status: "Kutmoqda",
            payment: "Kutilmoqda",
        },
    ];

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.phone.includes(search) ||
            user.id.toString() === search
    );

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h4" className="text-gray-800">
                    Foydalanuvchilar
                </Typography>
                <Button color="green" className="flex items-center gap-2">
                    <UserPlusIcon className="h-5 w-5" />
                    Obuna ochish
                </Button>
            </div>

            <Card className="mb-4  p-[20px]">
                <div >
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
                                <th className="p-3">Telegram</th>
                                <th className="p-3">Telefon</th>
                                <th className="p-3">Pasport</th>
                                <th className="p-3">Tarif</th>
                                <th className="p-3">Muddati</th>
                                <th className="p-3">Holat</th>
                                <th className="p-3">To‘lov</th>
                                <th className="p-3 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-gray-50 text-sm">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.username || "—"}</td>
                                    <td className="p-3">{user.phone}</td>
                                    <td className="p-3">{user.passport}</td>
                                    <td className="p-3">{user.plan}</td>
                                    <td className="p-3">
                                        {user.startDate} — {user.endDate}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Aktiv"
                                                ? "bg-green-100 text-green-800"
                                                : user.status === "Muddat tugagan"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${user.payment === "To‘langan"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-orange-100 text-orange-800"
                                                }`}
                                        >
                                            {user.payment}
                                        </span>
                                    </td>
                                    <td className="p-3 flex gap-2 justify-center">
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
                                    <td colSpan={10} className="text-center py-6 text-gray-500">
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
