import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/solid";
import LinksCreate from "./components/LinksCreate";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";
import LinksDelete from "./components/LinksDelete";
import LinksEdit from "./components/LinksEdit";

export default function Links() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllLinks = async () => {
        try {
            const response = await $api.get(`/join/link/getAll`);
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllLinks();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen p-4 md:p-6 bg-gray-50">
            {/* Заголовок */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <LinkIcon className="h-8 w-8 text-blue-600" />
                    <Typography variant="h3" className="text-gray-800 font-bold">
                        Havolalar boshqaruvi
                    </Typography>
                </div>
                <LinksCreate refresh={getAllLinks} />
            </div>

            {/* Таблица */}
            {data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-12 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Ma'lumot yo‘q</h2>
                    <p className="text-gray-500">
                        Hozircha havolalar mavjud emas.
                    </p>
                </div>
            ) : (
                <Card className="shadow-lg rounded-xl">
                    <CardBody className="overflow-x-auto p-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                    <th className="p-3">Tarif</th>
                                    <th className="p-3">Kanal havolasi</th>
                                    <th className="p-3 text-center">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((link, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-blue-gray-50 transition-colors duration-150 text-sm"
                                    >
                                        <td className="p-3 font-medium">{link.tourType?.title || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3 text-blue-700 underline break-all">
                                            {link.link ? (
                                                <a
                                                    href={link.status === "active" ? link.link : "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={link.status !== "active" ? "opacity-50 pointer-events-none" : ""}
                                                >
                                                    {link.link}
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">Ma'lumot yo‘q</span>
                                            )}
                                        </td>
                                        <td className="p-3 flex justify-center gap-2">
                                            <LinksEdit refresh={getAllLinks} data={link} />
                                            <LinksDelete refresh={getAllLinks} id={link?.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}
