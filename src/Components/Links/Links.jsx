import React from "react";
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
    TrashIcon,
    PlusIcon,
    PencilIcon,
    LinkIcon,
} from "@heroicons/react/24/solid";

export default function Links() {
    const links = [
        {
            tarif: "TestDrive",
            url: "https://t.me/joinchat/testdrive123",
            expires: "2025-07-08",
        },
        {
            tarif: "Silver",
            url: "https://t.me/joinchat/silver456",
            expires: "Doimiy",
        },
        {
            tarif: "Gold",
            url: "https://t.me/joinchat/gold789",
            expires: "Doimiy",
        },
    ];

    return (
        <div className="min-h-screen p-4">
            {/* Заголовок */}
            <div className="flex items-center gap-3 mb-8">
                <LinkIcon className="h-8 w-8 text-blue-600" />
                <Typography variant="h3" className="text-gray-800 font-bold">
                    Havolalar boshqaruvi
                </Typography>
            </div>

            {/* Кнопки */}
            <div className="flex flex-wrap gap-4 mb-6">
                <Button color="blue" className="flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" />
                    Silver/Gold uchun havola qo‘shish
                </Button>
                <Button variant="outlined" color="green">
                    TestDrive uchun 7 kunlik havola generatsiyasi
                </Button>
                <Button variant="outlined" color="blue-gray">
                    Har bir foydalanuvchiga shaxsiy havola ulashish
                </Button>
            </div>

            {/* Таблица */}
            <Card>
                <CardBody className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                <th className="p-3">Tarif</th>
                                <th className="p-3">Kanal havolasi</th>
                                <th className="p-3">Amal muddati</th>
                                <th className="p-3 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map((link, index) => (
                                <tr key={index} className="hover:bg-blue-gray-50 text-sm">
                                    <td className="p-3 font-medium">{link.tarif}</td>
                                    <td className="p-3 text-blue-700 underline break-all">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.url}
                                        </a>
                                    </td>
                                    <td className="p-3">{link.expires}</td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <Tooltip content="Havolani yangilash">
                                            <IconButton variant="text" color="blue">
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Bekor qilish">
                                            <IconButton variant="text" color="red">
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                            {links.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        Hozircha havolalar mavjud emas.
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
