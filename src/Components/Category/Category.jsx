import React from "react";
import {
    Card,
    CardBody,
    Typography,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { PencilIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function Category() {
    const plans = [
        {
            name: "TestDrive",
            price: "0 so‘m",
            discount: "—",
            note: "7 kunlik bepul",
            color: "from-blue-500 to-indigo-500",
        },
        {
            name: "Silver",
            price: "199k / 99k / 89k",
            discount: "10%",
            note: "2 kishi, batler qo‘shimcha",
            color: "from-purple-500 to-pink-500",
        },
        {
            name: "Gold",
            price: "199k / 139k / 119k",
            discount: "15%",
            note: "5 kishi, batler ichida",
            color: "from-yellow-500 to-orange-500",
        },
    ];

    return (
        <div className="min-h-screen  p-4">
            {/* Заголовок */}
            <div className="flex items-center gap-3 mb-10">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <Typography variant="h3" className="text-gray-800 font-bold">
                    Tariflar boshqaruvi
                </Typography>
            </div>

            {/* Карточки */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={`bg-gradient-to-r ${plan.color} text-white shadow-xl hover:shadow-2xl transition-transform hover:scale-105 rounded-2xl`}
                    >
                        <CardBody className="p-6 flex flex-col justify-between h-full">
                            {/* Заголовок + действие */}
                            <div className="flex justify-between items-start mb-4">
                                <Typography variant="h4" className="font-bold">
                                    {plan.name}
                                </Typography>
                                <Tooltip content="Tahrirlash">
                                    <IconButton variant="text" color="white">
                                        <PencilIcon className="h-5 w-5 text-white" />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            {/* Содержимое */}
                            <div className="space-y-3">
                                <div>
                                    <Typography className="text-sm opacity-80">Narxlar (1/3/6 oy):</Typography>
                                    <Typography className="text-lg font-semibold">{plan.price}</Typography>
                                </div>
                                <div>
                                    <Typography className="text-sm opacity-80">Chegirma:</Typography>
                                    <Typography className="text-lg font-semibold">{plan.discount}</Typography>
                                </div>
                                <div>
                                    <Typography className="text-sm opacity-80">Izoh:</Typography>
                                    <Typography className="text-base">{plan.note}</Typography>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
