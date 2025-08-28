import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Select,
    Option,
    Input,
    Button,
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
import { $api } from "../../utils";

export default function MoneyCard() {
    // Получение начала и конца текущего месяца
    const getCurrentMonthDates = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        return {
            start: firstDay.toISOString().split('T')[0],
            end: lastDay.toISOString().split('T')[0]
        };
    };

    const currentMonthDates = getCurrentMonthDates();

    // Состояние для фильтра по датам
    const [dateFilters, setDateFilters] = useState({
        startDate: currentMonthDates.start,
        endDate: currentMonthDates.end,
    });

    // Состояние для фильтра по периоду и типу
    const [periodFilters, setPeriodFilters] = useState({
        period: "WEEK",
        tourTypeId: "",
    });

    const [tours, setTours] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [paymentStats, setPaymentStats] = useState([
        { title: "Kunlik to'lovlar", value: "$0" },
        { title: "Oylik to'lovlar", value: "$0" },
        { title: "Tarif bo'yicha to'lovlar", value: "$0" },
        { title: "Konversiya darajasi", value: "0%" },
    ]);
    const [loading, setLoading] = useState({
        date: false,
        period: false
    });

    // Получение всех типов туров
    const getAllTurType = async () => {
        try {
            const response = await $api.get(`/tour/type/getAll`);
            const data = response.data?.object || [];
            setTours(data);

            // Устанавливаем первый тур как выбранный по умолчанию
            if (data.length > 0) {
                setPeriodFilters(prev => ({ ...prev, tourTypeId: data[0].id.toString() }));
            }
        } catch (error) {
            console.log("Error fetching tour types:", error);
        }
    };

    // Запрос статистики по датам (БЕЗ tourTypeId)
    const getStatisticsByDate = async () => {
        try {
            setLoading(prev => ({ ...prev, date: true }));

            const response = await $api.get(
                `/payment/getBetweenStatistics?from=${dateFilters.startDate}&to=${dateFilters.endDate}`
            );

            const data = response.data?.object || [];

            // Преобразуем данные для графика - используем поле date вместо period
            const transformedData = data.map(item => ({
                name: formatDateForChart(item.date), // Изменено с item.period на item.date
                amount: item.count
            }));

            setChartData(transformedData);
            updatePaymentStats(data, "date");

        } catch (error) {
            console.log("Error fetching date statistics:", error);
        } finally {
            setLoading(prev => ({ ...prev, date: false }));
        }
    };

    // Запрос статистики по периоду и типу
    const getStatisticsByPeriod = async () => {
        if (!periodFilters.tourTypeId) return;

        try {
            setLoading(prev => ({ ...prev, period: true }));

            const response = await $api.get(
                `/payment/getDateStatistics?filter=${periodFilters.period}&tourTypeIds=${periodFilters.tourTypeId}`
            );

            const data = response.data?.object || [];

            // Преобразуем данные для графика
            const transformedData = data.map(item => ({
                name: formatPeriodName(item.period || item.date, periodFilters.period), // Учитываем оба поля
                amount: item.count
            }));

            setChartData(transformedData);
            updatePaymentStats(data, "period");

        } catch (error) {
            console.log("Error fetching period statistics:", error);
        } finally {
            setLoading(prev => ({ ...prev, period: false }));
        }
    };

    // Обновление статистики
    const updatePaymentStats = (data, type) => {
        const totalAmount = data.reduce((sum, item) => sum + item.count, 0);
        const avgAmount = Math.round(totalAmount / (data.length || 1));
        const maxAmount = Math.max(...data.map(d => d.count), 0);

        setPaymentStats([
            { title: "Umumiy to'lovlar", value: `$${totalAmount}` },
            { title: "O'rtacha", value: `$${avgAmount}` },
            { title: "Eng ko'p", value: `$${maxAmount}` },
            { title: "Jami tranzaksiyalar", value: data.length.toString() },
        ]);
    };

    // Форматирование даты для графика (для запроса по датам)
    const formatDateForChart = (dateString) => {
        // Проверяем, что dateString существует и является строкой
        if (!dateString || typeof dateString !== 'string') {
            return 'Invalid Date';
        }

        try {
            // Возвращаем дату в формате YYYY-MM-DD как есть
            return dateString;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    // Форматирование названий периодов для отображения
    const formatPeriodName = (dateString, filterType) => {
        // Проверяем, что dateString существует
        if (!dateString || typeof dateString !== 'string') {
            return 'Invalid Date';
        }

        try {
            // Возвращаем дату в формате YYYY-MM-DD как есть для всех типов
            return dateString;
        } catch (error) {
            console.error('Error formatting period name:', error);
            return 'Invalid Date';
        }
    };

    // Валидация форм
    const isDateFormValid = () => {
        return dateFilters.startDate && dateFilters.endDate;
    };

    const isPeriodFormValid = () => {
        return periodFilters.period && periodFilters.tourTypeId;
    };

    // Загрузка данных при монтировании
    useEffect(() => {
        getAllTurType();
    }, []);

    // Автоматический запрос по датам при загрузке (default)
    useEffect(() => {
        if (isDateFormValid()) {
            getStatisticsByDate();
        }
    }, []);

    return (
        <Card className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white shadow-md hover:shadow-lg transition-all rounded-xl">
            <CardBody>
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                    <CurrencyDollarIcon className="h-10 w-10 text-yellow-600" />
                    <Typography variant="h6" className="text-gray-800 text-xl font-semibold">
                        To'lovlar statistikasi
                    </Typography>
                </div>

                {/* Фильтр по датам */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Typography variant="h6" className="text-gray-800 mb-4 font-medium">
                        Sana bo'yicha qidiruv
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <Typography className="text-sm text-gray-700 mb-1">
                                Boshlanish sanasi <span className="text-red-500">*</span>
                            </Typography>
                            <Input
                                type="date"
                                value={dateFilters.startDate}
                                onChange={(e) => setDateFilters({ ...dateFilters, startDate: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Typography className="text-sm text-gray-700 mb-1">
                                Tugash sanasi <span className="text-red-500">*</span>
                            </Typography>
                            <Input
                                type="date"
                                value={dateFilters.endDate}
                                onChange={(e) => setDateFilters({ ...dateFilters, endDate: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Button
                                onClick={getStatisticsByDate}
                                disabled={!isDateFormValid() || loading.date}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full"
                                loading={loading.date}
                            >
                                {loading.date ? "Yuklanmoqda..." : "Sana bo'yicha qidirish"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Фильтр по периоду и типу */}
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <Typography variant="h6" className="text-gray-800 mb-4 font-medium">
                        Davr va tarif bo'yicha qidiruv
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <Typography className="text-sm text-gray-700 mb-1">
                                Tarif turi <span className="text-red-500">*</span>
                            </Typography>
                            <Select
                                label="Tarif bo'yicha"
                                value={periodFilters.tourTypeId}
                                onChange={(val) => setPeriodFilters({ ...periodFilters, tourTypeId: val })}
                                required
                            >
                                {tours.length > 0 ? (
                                    tours.map((tour) => (
                                        <Option key={tour.id} value={tour.id.toString()}>
                                            {tour.title}
                                        </Option>
                                    ))
                                ) : (
                                    <Option disabled>Ma'lumot yo'q</Option>
                                )}
                            </Select>
                        </div>

                        <div>
                            <Typography className="text-sm text-gray-700 mb-1">
                                Davr <span className="text-red-500">*</span>
                            </Typography>
                            <Select
                                value={periodFilters.period}
                                onChange={(val) => setPeriodFilters({ ...periodFilters, period: val })}
                                required
                            >
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
                            <Button
                                onClick={getStatisticsByPeriod}
                                disabled={!isPeriodFormValid() || loading.period}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full"
                                loading={loading.period}
                            >
                                {loading.period ? "Yuklanmoqda..." : "Davr bo'yicha qidirish"}
                            </Button>
                        </div>
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
            </CardBody>
        </Card>
    );
}