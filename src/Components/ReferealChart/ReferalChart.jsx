import React, { useState, useMemo, useEffect } from 'react';
import {
    Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Users, AlertCircle } from 'lucide-react';
import { FaTelegramPlane, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import Loading from '../UI/Loading/Loading';
import { $api } from '../../utils';

export default function ReferralChart() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    const platformConfig = {
        TELEGRAM: { name: "Telegram", icon: <FaTelegramPlane className="text-sky-500" /> },
        INSTAGRAM: { name: "Instagram", icon: <FaInstagram className="text-pink-500" /> },
        YOUTUBE: { name: "YouTube", icon: <FaYoutube className="text-red-600" /> },
        TIKTOK: { name: "TikTok", icon: <FaTiktok className="text-black" /> },
        OTHER: { name: "Boshqa", icon: <BsGlobe className="text-gray-500" /> },
    };

    const getReferalStatistik = async () => {
        try {
            const response = await $api.get(`referral/getStatistics`);
            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Набор фиксированных цветов (будет повторяться по кругу, если платформ больше)
    const COLORS = [
        "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
        "#845EC2", "#D65DB1", "#FF6F91", "#2C73D2"
    ];

    const pieData = useMemo(() => {
        if (!data?.clicksCountByPlatform || !data?.percentages) return [];
        return Object.entries(data.clicksCountByPlatform).map(([key, value], index) => {
            const cfg = platformConfig[key] || platformConfig.OTHER;
            const percentage = data.percentages[key] || 0;
            return {
                name: key, // Используем оригинальное название из data
                value,
                percentage,
                color: COLORS[index % COLORS.length],
                icon: cfg.icon, // Берем иконку из конфига
            };
        });
    }, [data]);

    useEffect(() => { getReferalStatistik(); }, []);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gradient-to-br p-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Referal Analitika</h1>
                    <p className="text-gray-600 text-lg">
                        Trafik manbalarini va konversiyalarni real vaqtda kuzatib boring
                    </p>
                </div>
                {(!data || pieData.length === 0) ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-12 text-center">
                        <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ma'lumot yo‘q</h2>
                        <p className="text-gray-500">Hozircha statistik ma'lumotlar mavjud emas</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium">Jami o'tishlar</p>
                                        <p className="text-3xl font-bold mt-2">{data?.clicks?.toLocaleString()}</p>
                                    </div>
                                    <Users className="w-12 h-12 text-blue-200" />
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm font-medium">Eng yaxshi manba</p>
                                        <p className="text-xl font-bold mt-2">{data?.best_platform || "Yo‘q"}</p>
                                    </div>
                                    <TrendingUp className="w-12 h-12 text-green-200" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">🎯 Manbalar taqsimoti</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name, props) => [
                                            `${value.toLocaleString()} o'tishlar (${props.payload.percentage}%)`,
                                            'Statistika'
                                        ]}
                                    />
                                    <Legend formatter={(value, entry) => `${value}: ${entry.payload.percentage}%`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
                {/* Footer */}
                <div className="mt-8 text-center text-gray-500">
                    <p>📊 Ma'lumotlar real vaqtda yangilanadi</p>
                </div>
            </div>
        </div>
    );
}
