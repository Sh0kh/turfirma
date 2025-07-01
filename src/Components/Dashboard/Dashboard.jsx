import React from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  UserGroupIcon,
  UserIcon,
  ClockIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const stats = [
    {
      title: "Umumiy foydalanuvchilar",
      value: "12,345",
      icon: <UserGroupIcon className="h-10 w-10 text-white" />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Aktive obunachilar",
      value: "8,920",
      icon: <UserIcon className="h-10 w-10 text-white" />,
      color: "from-blue-500 to-indigo-400",
    },
    {
      title: "TestDrive foydalanuvchilari",
      value: "1,234",
      icon: <ChartBarIcon className="h-10 w-10 text-white" />,
      color: "from-purple-500 to-pink-400",
    },
    {
      title: "So‘nggi 24 soatda qo‘shilganlar",
      value: "103",
      icon: <ClockIcon className="h-10 w-10 text-white" />,
      color: "from-orange-500 to-red-400",
    },
  ];

  const paymentStats = [
    {
      title: "Kunlik to‘lovlar",
      value: "$1,230",
    },
    {
      title: "Oylik to‘lovlar",
      value: "$35,400",
    },
    {
      title: "Tarif bo‘yicha to‘lovlar",
      value: "$18,700",
    },
  ];

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-r ${stat.color} text-white shadow-lg transition-transform hover:scale-[1.03] rounded-lg`}
        >
          <CardBody className="flex items-center justify-between p-6">
            <div>{stat.icon}</div>
            <div className="text-right">
              <Typography variant="h6" className="text-white opacity-80">
                {stat.title}
              </Typography>
              <Typography variant="h4" className="font-bold">
                {stat.value}
              </Typography>
            </div>
          </CardBody>
        </Card>
      ))}

      <Card className="col-span-1 sm:col-span-2 bg-white shadow-lg hover:shadow-xl transition-all rounded-lg">
        <CardBody>
          <div className="flex items-center space-x-4 mb-4">
            <CurrencyDollarIcon className="h-10 w-10 text-yellow-600" />
            <Typography variant="h6" className="text-gray-800 text-xl font-semibold">
              To‘lovlar statistikasi
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paymentStats.map((item, idx) => (
              <div key={idx} className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition-all">
                <Typography className="text-gray-600 font-medium">{item.title}</Typography>
                <Typography className="text-xl font-bold text-gray-900">{item.value}</Typography>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
