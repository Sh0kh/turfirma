import React, { useEffect, useState } from "react";
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
import LinksCreate from "./components/LinksCreate";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";
import LinksDelete from "./components/LinksDelete";
import LinksEdit from "./components/LinksEdit";

export default function Links() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    const getAllLinks = async () => {
        try {
            const response = await $api.get(`/join/link/getAll`)
            setData(response?.data?.object || [])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllLinks()
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }



    return (
        <div className="min-h-screen p-4">
            {/* Заголовок */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 mb-8">
                    <LinkIcon className="h-8 w-8 text-blue-600" />
                    <Typography variant="h3" className="text-gray-800 font-bold">
                        Havolalar boshqaruvi
                    </Typography>
                </div>
                <LinksCreate refresh={getAllLinks} />
            </div>


            {/* Таблица */}
            <Card>
                <CardBody className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse">
                        
                        <thead>
                            <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                <th className="p-3">Tarif</th>
                                <th className="p-3">Kanal havolasi</th>
                                {/* <th className="p-3">Yaratilgan muddati</th> */}
                                <th className="p-3 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((link, index) => (
                                <tr key={index} className="hover:bg-blue-gray-50 text-sm">
                                    <td className="p-3 font-medium">{link.tourType?.title}</td>
                                    <td className="p-3 text-blue-700 underline break-all">
                                        <a
                                            href={link.status === "active" ? link.link : "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={link.link ? "opacity-50 pointer-events-none" : ""}
                                        >
                                            {link.link}
                                        </a>
                                    </td>
                                    {/* <td className="p-3">
                                        {new Date(link.createdAt).toLocaleString()}
                                    </td> */}
                                    <td className="p-3 flex justify-center gap-2">
                                        <LinksEdit refresh={getAllLinks} data={link}/>
                                        <LinksDelete refresh={getAllLinks} id={link?.id} />
                                    </td>
                                </tr>
                            ))}
                            {data?.length === 0 && (
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
        </div >
    );
}
