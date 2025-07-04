import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  UserGroupIcon,
  UserIcon,
  ClockIcon,
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import MoneyCard from "./MoneyCard";

export default function Dashboard() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const currentDay = today.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(currentDay);
  const [status, setStatus] = useState("all");

  const stats = [
    {
      title: "Umumiy obunachilar",
      value: "12,345",
      icon: <UserGroupIcon className="h-10 w-10 text-white" />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Aktiv obunachilar",
      value: "8,920",
      icon: <UserIcon className="h-10 w-10 text-white" />,
      color: "from-blue-500 to-indigo-400",
    },
    {
      title: "24 соатда қўшилганлар",
      value: "103",
      icon: <ArrowDownOnSquareIcon className="h-10 w-10 text-white" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      title: "24 соатда чиқиб кетганлар",
      value: "45",
      icon: <ArrowUpOnSquareIcon className="h-10 w-10 text-white" />,
      color: "from-red-500 to-red-700",
    },
    {
      title: "TestDrive тарифида",
      value: "1,234",
      icon: <SparklesIcon className="h-10 w-10 text-white" />,
      color: "from-purple-500 to-pink-400",
    },
    {
      title: "Silver тарифида",
      value: "560",
      icon: <StarIcon className="h-10 w-10 text-white" />,
      color: "from-gray-600 to-gray-800",
    },
    {
      title: "Gold тарифида",
      value: "320",
      icon: <TrophyIcon className="h-10 w-10 text-white" />,
      color: "from-yellow-500 to-yellow-700",
    },
  ];



  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <NavLink to={`/users/${stat.title}`}>
          <Card
            key={index}
            className={`bg-gradient-to-br ${stat.color} text-white shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] rounded-xl`}
          >
            <CardBody className="flex items-center justify-between p-6">
              <div>{stat.icon}</div>
              <div className="text-right">
                <Typography variant="h6" className="text-white opacity-90 mb-1">
                  {stat.title}
                </Typography>
                <Typography variant="h4" className="font-bold text-white">
                  {stat.value}
                </Typography>
              </div>
            </CardBody>
          </Card>
        </NavLink>
      ))}

      <MoneyCard />
    </div>
  );
}
