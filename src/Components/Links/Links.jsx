import React, { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
    IconButton,
    Tooltip,
    Chip,
} from "@material-tailwind/react";
import {
    TrashIcon,
    PlusIcon,
    PencilIcon,
    LinkIcon,
} from "@heroicons/react/24/solid";

export default function Links() {
    const [links, setLinks] = useState([
        {
            tarif: "TestDrive",
            url: generateUniqueLink("testdrive"),
            expires: getExpireDate(7), // 7 дней
            status: "active",
        },
        {
            tarif: "Silver",
            url: generateUniqueLink("silver"),
            expires: "Doimiy",
            status: "active",
        },
        {
            tarif: "Gold",
            url: generateUniqueLink("gold"),
            expires: "Doimiy",
            status: "used", // Пример как будто ссылка уже была использована
        },
    ]);

    function generateUniqueLink(prefix) {
        return `https://t.me/joinchat/${prefix}-${Math.random().toString(36).substr(2, 8)}`;
    }

    function getExpireDate(days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().split("T")[0];
    }

    function regenerateLink(index) {
        const newLinks = [...links];
        newLinks[index].url = generateUniqueLink(newLinks[index].tarif.toLowerCase());
        newLinks[index].expires = newLinks[index].tarif === "TestDrive" ? getExpireDate(7) : "Doimiy";
        newLinks[index].status = "active";
        setLinks(newLinks);
    }

    function deleteLink(index) {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        setLinks(newLinks);
    }

    function getStatusChip(status) {
        switch (status) {
            case "active":
                return <Chip color="green" size="sm" value="Faol" />;
            case "used":
                return <Chip color="amber" size="sm" value="Foydalanilgan" />;
            case "expired":
                return <Chip color="red" size="sm" value="Muddati tugagan" />;
            default:
                return null;
        }
    }

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
                <Button
                    color="blue"
                    onClick={() =>
                        setLinks([
                            ...links,
                            {
                                tarif: "Silver",
                                url: generateUniqueLink("silver"),
                                expires: "Doimiy",
                                status: "active",
                            },
                        ])
                    }
                    className="flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Silver/Gold uchun havola qo‘shish
                </Button>
                <Button
                    variant="outlined"
                    color="green"
                    onClick={() =>
                        setLinks([
                            ...links,
                            {
                                tarif: "TestDrive",
                                url: generateUniqueLink("testdrive"),
                                expires: getExpireDate(7),
                                status: "active",
                            },
                        ])
                    }
                >
                    TestDrive uchun 7 kunlik havola generatsiyasi
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
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map((link, index) => (
                                <tr key={index} className="hover:bg-blue-gray-50 text-sm">
                                    <td className="p-3 font-medium">{link.tarif}</td>
                                    <td className="p-3 text-blue-700 underline break-all">
                                        <a
                                            href={link.status === "active" ? link.url : "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={link.status !== "active" ? "opacity-50 pointer-events-none" : ""}
                                        >
                                            {link.url}
                                        </a>
                                    </td>
                                    <td className="p-3">{link.expires}</td>
                                    <td className="p-3">{getStatusChip(link.status)}</td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <Tooltip content="Havolani yangilash">
                                            <IconButton variant="text" color="blue" onClick={() => regenerateLink(index)}>
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Bekor qilish">
                                            <IconButton variant="text" color="red" onClick={() => deleteLink(index)}>
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                            {links.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-500">
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
