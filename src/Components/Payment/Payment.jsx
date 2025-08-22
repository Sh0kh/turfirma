import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    IconButton,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import {
    CheckCircleIcon,
    ArrowsRightLeftIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";
import PaymentDelete from "./components/PaymentDelete";

export default function Payment() {
    const [loading, setLoading] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    const [filters, setFilters] = useState({
        date: "",
        tourTypeId: "",
        status: "",
    });
    const [errors, setErrors] = useState({
        date: false,
        tourTypeId: false,
        status: false,
    });

    const [data, setData] = useState([]);
    const [tours, setTours] = useState([]);

    // Загрузка всех платежей (по умолчанию)
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

    const getAllTurType = async () => {
        try {
            const response = await $api.get(`/tour/type/getAll`);
            const data = response.data?.object || [];
            setTours(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTurType();
        getAllPayments(); // Загружаем все платежи при первом рендере
    }, []);

    // 🔥 Проверка и запуск фильтрации
    const handleSearch = () => {
        // Проверяем, есть ли хотя бы один фильтр
        const hasFilter = filters.date || filters.tourTypeId || filters.status;

        if (hasFilter) {
            // Если есть фильтры - применяем их
            getFilteredPayments();
        } else {
            // Если фильтров нет - загружаем все платежи
            getAllPayments();
        }
    };

    // Сброс фильтров
    const handleReset = () => {
        setFilters({
            date: "",
            tourTypeId: "",
            status: "",
        });
        getAllPayments();
    };

    return (
        <div className="min-h-screen p-4">
            {/* Заголовок */}
            <div className="flex items-center gap-3 mb-8">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <Typography variant="h3" className="text-gray-800 font-bold">
                    To‘lovlar bo‘limi
                </Typography>
            </div>

            {/* Фильтры */}
            <Card className="p-[20px] mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Input
                            label="Sanasi bo‘yicha"
                            type="date"
                            value={filters.date}
                            onChange={(e) =>
                                setFilters({ ...filters, date: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <Select
                            label="Statusi bo‘yicha"
                            value={filters.status}
                            onChange={(val) => setFilters({ ...filters, status: val })}
                        >
                            <Option value="true">To'langan</Option>
                            <Option value="false">To'lanmagan</Option>
                        </Select>
                    </div>

                    <div>
                        <Select
                            label="Tarif bo‘yicha"
                            value={filters.id}
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
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        color="blue"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? "Yuklanmoqda..." : "Izlash"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        Tozalash
                    </Button>
                </div>
            </Card>

            {/* Таблица */}
            <Card>
                <CardBody className="overflow-x-auto p-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loading />
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
                                {data?.length > 0 ? (
                                    data.map((pay, idx) => (
                                        <tr key={idx} className="hover:bg-blue-gray-50 text-sm">
                                            <td className="p-3">{pay?.customer?.fullName}</td>
                                            <td className="p-3">{pay?.tourType?.title}</td>
                                            <td className="p-3">{pay?.paymentType}</td>
                                            <td className="p-3">{pay?.amount}</td>
                                            <td className="p-3">{pay?.paymentDate}</td>
                                            <td className="p-3 flex justify-center gap-2">
                                                <PaymentDelete id={pay?.id} refresh={getAllPayments} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6 text-gray-500">
                                            Hech qanday to‘lov topilmadi.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}