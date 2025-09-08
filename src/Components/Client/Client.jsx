import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import ClientCreate from "./components/ClientCreate";
import ClientEdit from "./components/ClientEdit";
import ClientDelete from "./components/ClientDelete";
import Clientpayment from "./components/ClientPayment";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";

export default function Client() {
    const [period, setPeriod] = useState("DAY");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [privateId, setPrivateId] = useState("");

    const getAllClient = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`/customer/getAll`);
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllClientByFilter = async (filter) => {
        setLoading(true);
        try {
            const response = await $api.get(
                `/customer/getAllByFilter?filter=${filter.toUpperCase()}`
            );
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllClientByDateBetween = async (start, end) => {
        setLoading(true);
        try {
            const response = await $api.get(
                `/customer/getAllByDateBetween?start=${start}&end=${end}`
            );
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getClientByPrivateId = async (id) => {
        setLoading(true);
        try {
            const response = await $api.get(
                `/customer/getByPrivate?privateKey=${id}`
            );
            setData(response?.data?.object ? [response?.data?.object] : []);
        } catch (error) {
            console.log(error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (privateId) {
            getClientByPrivateId(privateId);
        } else if (startDate && endDate) {
            getAllClientByDateBetween(startDate, endDate);
        } else if (period === "DAY") {
            getAllClient();
        } else {
            getAllClientByFilter(period);
        }
    }, [period, startDate, endDate, privateId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h4" className="text-gray-800 font-bold">
                    Foydalanuvchilar
                </Typography>
                <ClientCreate refresh={getAllClient} />
            </div>

            {/* Фильтры */}
            <Card className="p-6 mb-6 shadow-lg rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">
                            Davrni tanlang
                        </Typography>
                        <Select value={period} onChange={(val) => setPeriod(val)}>
                            <Option value="DAY">Kunlik</Option>
                            <Option value="WEEK">Haftalik</Option>
                            <Option value="MONTH">Oylik</Option>
                            <Option value="YEAR">Yillik</Option>
                            <Option value="LAST_3_MONTH">Oxirgi 3 oy</Option>
                            <Option value="LAST_5_MONTH">Oxirgi 5 oy</Option>
                            <Option value="LAST_YEAR">1 yil</Option>
                        </Select>
                    </div>
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">
                            Boshlanish sanasi
                        </Typography>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">
                            Tugash sanasi
                        </Typography>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">
                            Private ID
                        </Typography>
                        <Input
                            type="text"
                            value={privateId}
                            onChange={(e) => setPrivateId(e.target.value)}
                            placeholder="Private ID yozing..."
                        />
                    </div>
                </div>
            </Card>

            {/* Таблица */}
            <Card className="shadow-lg rounded-xl">
                <CardBody className="overflow-x-auto p-4">
                    {data.length === 0 ? (
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Ma'lumot yo‘q
                            </h2>
                            <p className="text-gray-500">Hech narsa topilmadi.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Ism Familiya</th>
                                    <th className="p-3">Telegram</th>
                                    <th className="p-3">Telefon</th>
                                    <th className="p-3">Pasport</th>
                                    <th className="p-3">Til</th>
                                    <th className="p-3">Kalit</th>
                                    <th className="p-3 text-center">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-gray-50 transition-colors duration-150 text-sm">
                                        <td className="p-3">{user.id || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{user.fullName || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{user.telegramUsername || "—"}</td>
                                        <td className="p-3">{user.phoneNumber || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{user.passport || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{user.language || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{user.privateId || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3 flex gap-2 justify-center">
                                            <ClientEdit refresh={getAllClient} data={user} />
                                            <ClientDelete refresh={getAllClient} id={user?.id} />
                                            <Clientpayment data={user} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
