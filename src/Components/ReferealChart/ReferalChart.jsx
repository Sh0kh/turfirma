import React, { useState, useMemo, useEffect } from 'react';
import {
    Tooltip, Legend, ResponsiveContainer
    , PieChart, Pie, Cell,
} from 'recharts';
import { TrendingUp, Users, } from 'lucide-react';
import { FaTelegramPlane, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import Loading from '../UI/Loading/Loading';
import { $api } from '../../utils';

export default function ReferralChart() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    const platformConfig = {
        TELEGRAM: {
            name: "Telegram",
            icon: <FaTelegramPlane className="text-sky-500" />,
            color: "#0088cc",
        },
        INSTAGRAM: {
            name: "Instagram",
            icon: <FaInstagram className="text-pink-500" />,
            color: "#E1306C",
        },
        YOUTUBE: {
            name: "YouTube",
            icon: <FaYoutube className="text-red-600" />,
            color: "#FF0000",
        },
        TIKTOK: {
            name: "TikTok",
            icon: <FaTiktok className="text-black" />,
            color: "#000000",
        },
        OTHER: {
            name: "Boshqa",
            icon: <BsGlobe className="text-gray-500" />,
            color: "#6b7280",
        },
    };

    // Имитация API вызова с вашими данными
    const getReferalStatistik = async () => {
        try {
            const response = await $api.get(`referral/getStatistics`)

            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    };

    // Создание данных для Pie Chart с процентами из API
    const pieData = useMemo(() => {
        if (!data?.clicksCountByPlatform || !data?.percentages) return [];

        return Object.entries(data.clicksCountByPlatform).map(([key, value]) => {
            const cfg = platformConfig[key] || platformConfig.OTHER;
            const percentage = data.percentages[key] || 0;

            return {
                name: cfg.name,
                value: value,
                percentage: percentage,
                color: cfg.color
            };
        });
    }, [data]);

    useEffect(() => {
        getReferalStatistik();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    const COLORS = ['#E1306C', '#000000', '#0088cc', '#FF0000', '#1877f2', '#ff6b6b', '#4ecdc4', '#54a3ff'];

    return (
        <div className="min-h-screen bg-gradient-to-br  p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                📊 Referal Analitika
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Trafik manbalarini va konversiyalarni real vaqtda kuzatib boring
                            </p>
                        </div>
                    </div>
                </div>

                {/* Asosiy Ko'rsatkichlar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
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
                                <p className="text-xl font-bold mt-2">{data?.best_platform}</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-green-200" />
                        </div>
                    </div>
                </div>

                {/* Grafiklar Paneli */}
                <div className="w-full mb-[20px]">
                    {/* Doira Grafigi - Manbalar Taqsimoti */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
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
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend
                                    formatter={(value, entry) =>
                                        `${value}: ${entry.payload.percentage}%`
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Дополнительная статистика под графиком */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pieData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">{item.percentage}%</div>
                                        <div className="text-sm text-gray-500">{item.value} clicks</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Manba Kartalari */}
                <div className="w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">🔗 Trafik manbalari</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {Object.entries(data?.clicksCountByPlatform || {}).map(([key, total], index) => {
                                const cfg = platformConfig[key] || platformConfig.OTHER;
                                const percentage = data?.percentages[key] || 0;

                                return (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: cfg.color }}
                                            ></div>
                                            <span className="text-2xl">{cfg.icon}</span>
                                            <div>
                                                <p className="font-semibold text-gray-900">{cfg.name}</p>
                                                <p className="text-sm text-gray-500">{percentage}%</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">
                                                {total.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-500">o'tishlar</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500">
                    <p>📊 Ma'lumotlar real vaqtda yangilanadi</p>
                </div>
            </div>
        </div>
    );
}