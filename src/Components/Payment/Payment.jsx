import React, { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Button,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import {
    CheckCircleIcon,
    ArrowsRightLeftIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function Payment() {
    const [filters, setFilters] = useState({
        date: "",
        plan: "",
        status: "",
    });

    const payments = [
        {
            userId: 101,
            method: "Click",
            amount: "199,000 so‘m",
            date: "2025-07-01",
            status: "OK",
            plan: "Gold",
        },
        {
            userId: 102,
            method: "Bank",
            amount: "99,000 so‘m",
            date: "2025-07-02",
            status: "Fail",
            plan: "Silver",
        },
        {
            userId: 103,
            method: "Payme",
            amount: "0 so‘m",
            date: "2025-07-03",
            status: "OK",
            plan: "TestDrive",
        },
    ];

    const filteredPayments = payments.filter((p) => {
        return (
            (!filters.date || p.date.includes(filters.date)) &&
            (!filters.plan || p.plan === filters.plan) &&
            (!filters.status || p.status === filters.status)
        );
    });

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <Input
                        label="Sanasi bo‘yicha"
                        type="date"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    />
                    <Select
                        label="Tarif bo‘yicha"
                        value={filters.plan}
                        onChange={(val) => setFilters({ ...filters, plan: val })}
                    >
                        <Option value="">Barchasi</Option>
                        <Option value="TestDrive">TestDrive</Option>
                        <Option value="Silver">Silver</Option>
                        <Option value="Gold">Gold</Option>
                    </Select>
                    <Select
                        label="Status bo‘yicha"
                        value={filters.status}
                        onChange={(val) => setFilters({ ...filters, status: val })}
                    >
                        <Option value="">Barchasi</Option>
                        <Option value="OK">OK</Option>
                        <Option value="Fail">Fail</Option>
                    </Select>
                </div>
            </Card>

            {/* Таблица */}
            <Card>
                <CardBody className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                <th className="p-3">Foydalanuvchi ID</th>
                                <th className="p-3">To‘lov usuli</th>
                                <th className="p-3">Summasi</th>
                                <th className="p-3">Sanasi</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((pay, idx) => (
                                    <tr key={idx} className="hover:bg-blue-gray-50 text-sm">
                                        <td className="p-3">{pay.userId}</td>
                                        <td className="p-3">{pay.method}</td>
                                        <td className="p-3">{pay.amount}</td>
                                        <td className="p-3">{pay.date}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${pay.status === "OK"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {pay.status}
                                            </span>
                                        </td>
                                        <td className="p-3 flex justify-center gap-2">
                                            <Tooltip content="Tasdiqlash (qo‘lda)">
                                                <IconButton variant="text" color="green">
                                                    <CheckCircleIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Check qilish (API)">
                                                <IconButton variant="text" color="blue">
                                                    <ArrowsRightLeftIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
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
                </CardBody>
            </Card>
        </div>
    );
}
