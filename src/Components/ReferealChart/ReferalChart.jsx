import React, { useState, useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Calendar, TrendingUp, Users, Eye, MessageCircle, Filter, Download } from 'lucide-react';

export default function ReferralChart() {
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const [selectedSource, setSelectedSource] = useState('all');

    // Turli referal manbalarining ma'lumotlari
    const referralSources = [
        { id: 'telegram_channel', name: 'Telegram Kanallari', icon: '📢', color: '#0088cc' },
        { id: 'telegram_groups', name: 'Telegram Guruhlar', icon: '👥', color: '#229ed9' },
        { id: 'instagram', name: 'Instagram', icon: '📸', color: '#e4405f' },
        { id: 'youtube', name: 'YouTube', icon: '🎥', color: '#ff0000' },
        { id: 'facebook', name: 'Facebook', icon: '👍', color: '#1877f2' },
        { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' },
        { id: 'bloggers', name: 'Bloggerlar', icon: '✍️', color: '#ff6b6b' },
        { id: 'ads', name: 'Reklama', icon: '📺', color: '#4ecdc4' },
        { id: 'telegram_bot', name: 'Telegram Bot', icon: '🤖', color: '#54a3ff' }
    ];

    // Mock ma'lumotlar yaratish
    const generateMockData = () => {
        const data = [];
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const diffTime = Math.abs(endDateObj - startDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        for (let i = 0; i <= Math.min(diffDays, 30); i++) {
            const date = new Date(startDateObj);
            date.setDate(startDateObj.getDate() + i);

            const dayData = {
                date: date.toISOString().split('T')[0],
                dateDisplay: date.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' }),
                telegram_channel: Math.floor(Math.random() * 200) + 50,
                telegram_groups: Math.floor(Math.random() * 150) + 30,
                instagram: Math.floor(Math.random() * 300) + 100,
                youtube: Math.floor(Math.random() * 250) + 80,
                facebook: Math.floor(Math.random() * 100) + 20,
                tiktok: Math.floor(Math.random() * 180) + 40,
                bloggers: Math.floor(Math.random() * 120) + 60,
                ads: Math.floor(Math.random() * 400) + 200,
                telegram_bot: Math.floor(Math.random() * 90) + 30
            };

            data.push(dayData);
        }

        return data;
    };

    const mockData = useMemo(() => generateMockData(), [startDate, endDate]);

    // Jami va foizlarni hisoblash
    const totalsBySource = useMemo(() => {
        return referralSources.map(source => {
            const total = mockData.reduce((sum, day) => sum + day[source.id], 0);
            return { ...source, total };
        });
    }, [mockData]);

    const grandTotal = totalsBySource.reduce((sum, source) => sum + source.total, 0);

    const pieData = totalsBySource.map(source => ({
        name: source.name,
        value: source.total,
        color: source.color,
        percentage: ((source.total / grandTotal) * 100).toFixed(1)
    }));

    // Eng yaxshi manbalar
    const topSources = [...totalsBySource].sort((a, b) => b.total - a.total).slice(0, 5);

    // O'sish ma'lumotlari
    const growthData = mockData.map((day, index) => {
        if (index === 0) return { ...day, growth: 0 };
        const prevTotal = Object.values(mockData[index - 1]).reduce((sum, val) =>
            typeof val === 'number' ? sum + val : sum, 0
        );
        const currentTotal = Object.values(day).reduce((sum, val) =>
            typeof val === 'number' ? sum + val : sum, 0
        );
        const growth = prevTotal > 0 ? ((currentTotal - prevTotal) / prevTotal * 100) : 0;
        return { ...day, growth };
    });

    // Radar chart ma'lumotlari
    const radarData = referralSources.map(source => ({
        source: source.name.split(' ')[0],
        value: totalsBySource.find(s => s.id === source.id)?.total || 0,
        fullMark: Math.max(...totalsBySource.map(s => s.total))
    }));

    const COLORS = ['#0088cc', '#229ed9', '#e4405f', '#ff0000', '#1877f2', '#000000', '#ff6b6b', '#4ecdc4', '#54a3ff'];

    return (
        <div className="min-h-screen bg-gradient-to-br p-4">
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

                        {/* Sana Filtrlari */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="bg-transparent outline-none text-gray-700 font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="bg-transparent outline-none text-gray-700 font-medium"
                                />
                            </div>
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                                <Download className="w-5 h-5" />
                                Eksport
                            </button>
                        </div>
                    </div>
                </div>

                {/* Asosiy Ko'rsatkichlar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Jami o'tishlar</p>
                                <p className="text-3xl font-bold mt-2">{grandTotal.toLocaleString()}</p>
                            </div>
                            <Users className="w-12 h-12 text-blue-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Eng yaxshi manba</p>
                                <p className="text-xl font-bold mt-2">{topSources[0]?.name}</p>
                                <p className="text-green-100 text-sm">{topSources[0]?.total.toLocaleString()}</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-green-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">O'rtacha o'sish</p>
                                <p className="text-3xl font-bold mt-2">+12.5%</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-purple-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Faol manbalar</p>
                                <p className="text-3xl font-bold mt-2">{referralSources.length}</p>
                            </div>
                            <MessageCircle className="w-12 h-12 text-orange-200" />
                        </div>
                    </div>
                </div>

                {/* Grafiklar Paneli */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Chiziq Grafigi - Kunlik Tendentsiyalar */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">📈 Kunlik dinamika</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="dateDisplay" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="telegram_channel" stroke="#0088cc" strokeWidth={3} />
                                <Line type="monotone" dataKey="instagram" stroke="#e4405f" strokeWidth={3} />
                                <Line type="monotone" dataKey="youtube" stroke="#ff0000" strokeWidth={3} />
                                <Line type="monotone" dataKey="ads" stroke="#4ecdc4" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Doira Grafigi - Manbalar Taqsimoti */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">🎯 Manbalar taqsimoti</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percentage }) => `${name} ${percentage}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [value.toLocaleString(), 'O\'tishlar']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Qo'shimcha Grafiklar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Ustun Grafigi - Top Manbalar */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">🏆 Top manbalar</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topSources} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis type="number" stroke="#6b7280" />
                                <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                                <Tooltip
                                    formatter={(value) => [value.toLocaleString(), 'O\'tishlar']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Bar dataKey="total" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Maydon Grafigi - O'sish Tendentsiyalari */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">📊 O'sish tendentsiyalari</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="dateDisplay" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    formatter={(value) => [`${value.toFixed(1)}%`, 'O\'sish']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Area type="monotone" dataKey="growth" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Radar Grafigi va Manba Kartalari */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Radar Grafigi */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">🎯 Manbalar taqqoslash</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="source" />
                                <PolarRadiusAxis />
                                <Radar name="O'tishlar" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                <Tooltip
                                    formatter={(value) => [value.toLocaleString(), 'O\'tishlar']}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Manba Kartalari */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">🔗 Trafik manbalari</h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {totalsBySource.map((source, index) => (
                                <div key={source.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: source.color }}
                                        ></div>
                                        <span className="text-2xl">{source.icon}</span>
                                        <div>
                                            <p className="font-semibold text-gray-900">{source.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Umumiy trafikdan {((source.total / grandTotal) * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900">{source.total.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500">o'tishlar</p>
                                    </div>
                                </div>
                            ))}
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