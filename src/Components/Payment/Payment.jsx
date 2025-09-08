import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import {
    CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";
import PaymentDelete from "./components/PaymentDelete";

export default function Payment() {
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        date: "",
        tourTypeId: "",
        status: "",
    });
    const [data, setData] = useState([]);
    const [tours, setTours] = useState([]);

    const getAllPayments = async () => {
        try {
            setLoading(true);
            const response = await $api.get(`/payment/getAll`);
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredPayments = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.date) params.append("date", filters.date);
            if (filters.tourTypeId) params.append("tourTypesId", filters.tourTypeId);
            if (filters.status) params.append("status", filters.status);

            const query = params.toString();
            const response = await $api.get(`/payment/getFilter?${query}`);
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllTourType = async () => {
        try {
            const response = await $api.get(`/tour/type/getAll`);
            setTours(response.data?.object || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTourType();
        getAllPayments();
    }, []);

    const handleSearch = () => {
        const hasFilter = filters.date || filters.tourTypeId || filters.status;
        if (hasFilter) {
            getFilteredPayments();
        } else {
            getAllPayments();
        }
    };

    const handleReset = () => {
        setFilters({
            date: "",
            tourTypeId: "",
            status: "",
        });
        getAllPayments();
    };

    return (
        <div className="min-h-screen p-4 md:p-6 bg-gray-50">
            {/* Заголовок */}
            <div className="flex items-center gap-3 mb-8">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <Typography variant="h3" className="text-gray-800 font-bold">
                    To‘lovlar bo‘limi
                </Typography>
            </div>

            {/* Фильтры */}
            <Card className="p-6 mb-6 shadow-lg rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Sanasi bo‘yicha"
                        type="date"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    />
                    <Select
                        label="Statusi bo‘yicha"
                        value={filters.status}
                        onChange={(val) => setFilters({ ...filters, status: val })}
                    >
                        <Option value="true">To'langan</Option>
                        <Option value="false">To'lanmagan</Option>
                    </Select>
                    <Select
                        label="Tarif bo‘yicha"
                        value={filters.tourTypeId}
                        onChange={(val) => setFilters({ ...filters, tourTypeId: val })}
                    >
                        {tours.length > 0 ? (
                            tours.map((tour) => (
                                <Option key={tour.id} value={tour.id.toString()}>
                                    {tour.title}
                                </Option>
                            ))
                        ) : (
                            <Option disabled>Ma’lumot yo‘q</Option>
                        )}
                    </Select>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button color="blue" onClick={handleSearch} disabled={loading}>
                        {loading ? "Yuklanmoqda..." : "Izlash"}
                    </Button>
                    <Button variant="outlined" onClick={handleReset} disabled={loading}>
                        Tozalash
                    </Button>
                </div>
            </Card>

            {/* Таблица */}
            <Card className="shadow-lg rounded-xl">
                <CardBody className="overflow-x-auto p-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loading />
                        </div>
                    ) : data.length === 0 ? (
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
                            <p className="text-gray-500">Hech qanday to‘lov topilmadi.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                    <th className="p-3">Foydalanuvchi</th>
                                    <th className="p-3">Tarif</th>
                                    <th className="p-3">To‘lov usuli</th>
                                    <th className="p-3">Summasi</th>
                                    <th className="p-3">Sanasi</th>
                                    <th className="p-3 text-center">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((pay, idx) => (
                                    <tr key={idx} className="hover:bg-blue-gray-50 transition-colors duration-150 text-sm">
                                        <td className="p-3">{pay?.customer?.fullName || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{pay?.tourType?.title || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{pay?.paymentType || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{pay?.amount ?? "Ma'lumot yo‘q"}</td>
                                        <td className="p-3">{pay?.paymentDate || "Ma'lumot yo‘q"}</td>
                                        <td className="p-3 flex justify-center gap-2">
                                            <PaymentDelete id={pay?.id} refresh={getAllPayments} />
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
