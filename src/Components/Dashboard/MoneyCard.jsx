import { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Select,
    Option,
    Input,
} from "@material-tailwind/react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function MoneyCard() {
    const [status, setStatus] = useState("all");
    const [period, setPeriod] = useState("day");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const paymentStats = [
        { title: "Kunlik to‘lovlar", value: "$1,230" },
        { title: "Oylik to‘lovlar", value: "$35,400" },
        { title: "Tarif bo‘yicha to‘lovlar", value: "$18,700" },
        { title: "Konversiya darajasi", value: "50%" },
    ];

    const chartDataByPeriod = {
        day: [
            { name: "00:00", amount: 100 },
            { name: "06:00", amount: 300 },
            { name: "12:00", amount: 500 },
            { name: "18:00", amount: 400 },
            { name: "23:59", amount: 700 },
        ],
        week: [
            { name: "Dushanba", amount: 1000 },
            { name: "Seshanba", amount: 1500 },
            { name: "Chorshanba", amount: 1200 },
            { name: "Payshanba", amount: 2000 },
            { name: "Juma", amount: 1700 },
            { name: "Shanba", amount: 2100 },
            { name: "Yakshanba", amount: 1800 },
        ],
        month: [
            { name: "1-oy", amount: 8000 },
            { name: "2-oy", amount: 10500 },
            { name: "3-oy", amount: 11500 },
        ],
        "3month": [
            { name: "May", amount: 24000 },
            { name: "Iyun", amount: 27000 },
            { name: "Iyul", amount: 31000 },
        ],
        "5month": [
            { name: "Mart", amount: 22000 },
            { name: "Aprel", amount: 25000 },
            { name: "May", amount: 24000 },
            { name: "Iyun", amount: 27000 },
            { name: "Iyul", amount: 31000 },
        ],
        year: [
            { name: "Yan", amount: 10000 },
            { name: "Fev", amount: 12000 },
            { name: "Mar", amount: 15000 },
            { name: "Apr", amount: 18000 },
            { name: "May", amount: 24000 },
            { name: "Iyun", amount: 27000 },
            { name: "Iyul", amount: 31000 },
            { name: "Avg", amount: 28000 },
            { name: "Sen", amount: 22000 },
            { name: "Okt", amount: 26000 },
            { name: "Noy", amount: 29000 },
            { name: "Dek", amount: 32000 },
        ],
    };

    const chartData = chartDataByPeriod[period] || [];

    return (
        <Card className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white shadow-md hover:shadow-lg transition-all rounded-xl">
            <CardBody>
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                    <CurrencyDollarIcon className="h-10 w-10 text-yellow-600" />
                    <Typography variant="h6" className="text-gray-800 text-xl font-semibold">
                        To‘lovlar statistikasi
                    </Typography>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">Tarif statusi</Typography>
                        <Select value={status} onChange={(val) => setStatus(val)}>
                            <Option value="all">Barchasi</Option>
                            <Option value="testdrive">TestDrive</Option>
                            <Option value="silver">Silver</Option>
                            <Option value="gold">Gold</Option>
                        </Select>
                    </div>
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">Davrni tanlang</Typography>
                        <Select value={period} onChange={(val) => setPeriod(val)}>
                            <Option value="day">Kunlik</Option>
                            <Option value="week">Haftalik</Option>
                            <Option value="month">Oylik</Option>
                            <Option value="3month">Oxirgi 3 oy</Option>
                            <Option value="5month">Oxirgi 5 oy</Option>
                            <Option value="year">1 yil</Option>
                        </Select>
                    </div>
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">Boshlanish sanasi</Typography>
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <Typography className="text-sm text-gray-700 mb-1">Tugash sanasi</Typography>
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                {/* Chart */}
                <div className="h-72 w-full mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#facc15"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {paymentStats.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-all text-center"
                        >
                            <Typography className="text-gray-600 font-medium mb-1">
                                {item.title}
                            </Typography>
                            <Typography className="text-xl font-bold text-gray-900">
                                {item.value}
                            </Typography>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}
