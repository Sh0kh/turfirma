import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    IconButton,
    Tooltip,
    Select,
    Option,
} from "@material-tailwind/react";
import { PencilIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import ClientCreate from "./components/ClientCreate";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";
import ClientEdit from "./components/ClientEdit";
import ClientDelete from "./components/ClientDelete";
import Clientpayment from "./components/ClientPayment";

export default function Client() {
    const [period, setPeriod] = useState("DAY");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

    // следим за period и датами
    useEffect(() => {
        if (startDate && endDate) {
            getAllClientByDateBetween(startDate, endDate);
        } else if (period === "DAY") {
            getAllClient();
        } else {
            getAllClientByFilter(period);
        }
    }, [period, startDate, endDate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h4" className="text-gray-800">
                    Foydalanuvchilar
                </Typography>
                <ClientCreate refresh={getAllClient} />
            </div>

            <Card className="p-[20px] mb-[10px]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">
                            Davrni tanlang
                        </Typography>
                        <Select value={period} onChange={(val) => setPeriod(val)}>
                            <Option value="DAY">Kunlik</Option>
                            <Option value="WEEK">Haftalik</Option>
                            <Option value="MONTH">Oylik</Option>
                            <Option value="YEAR">Yilik</Option>
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
                                <th className="p-3">Til</th>
                                <th className="p-3 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-gray-50 text-sm">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">{user.fullName}</td>
                                    <td className="p-3">{user.telegramUsername || "—"}</td>
                                    <td className="p-3">{user.phoneNumber}</td>
                                    <td className="p-3">{user.passport}</td>
                                    <td className="p-3">{user.language}</td>
                                    <td className="p-3 flex gap-2 justify-center">
                                        <ClientEdit refresh={getAllClient} data={user} />
                                        <ClientDelete refresh={getAllClient} id={user?.id} />
                                        <Clientpayment data={user} />
                                    </td>
                                </tr>
                            ))}
                            {data?.length === 0 && (
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
