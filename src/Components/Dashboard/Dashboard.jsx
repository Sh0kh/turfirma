import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import MoneyCard from "./MoneyCard";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";
import UserList from "./UserList";
import Buttons from "../Buttons/Buttons";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const getCustomerStatistik = async () => {
    setLoading(true)
    try {
      const response = await $api.get(`/customer/getStatistics`);
      setData(response?.data?.object);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getCustomerStatistik();
  }, []);

  const gradients = [
    "from-green-500 to-green-700",
    "from-blue-500 to-blue-700",
    "from-purple-500 to-purple-700",
    "from-pink-500 to-pink-700",
    "from-orange-500 to-orange-700",
    "from-red-500 to-red-700",
    "from-teal-500 to-teal-700",
  ];


  if (loading) {
    return (
      <Loading />
    )
  }

return (
  <div className="p-6 space-y-6"> 
    {/* Cards qismi */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] rounded-xl">
        <CardBody className="flex items-center justify-between p-6">
          <div className="flex items-center justify-between w-full">
            <Typography variant="h6" className="text-white opacity-90 mb-1">
              Umumiy obunachilar
            </Typography>
            <Typography variant="h4" className="font-bold text-white">
              {data?.allUsersCount}
            </Typography>
          </div>
        </CardBody>
      </Card>

      <NavLink to={`/users/week-out`}>
        <Card className="bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] rounded-xl">
          <CardBody className="flex items-center justify-between p-6">
            <div className="flex items-center justify-between w-full">
              <Typography variant="h6" className="text-white opacity-90 mb-1">
                24 soatda chiqib ketganlar
              </Typography>
              <Typography variant="h4" className="font-bold text-white">
                {data?.lastWeekQuitesCount}
              </Typography>
            </div>
          </CardBody>
        </Card>
      </NavLink>

      <NavLink to={`/users/week-Invites`}>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] rounded-xl">
          <CardBody className="flex items-center justify-between p-6">
            <div className="flex items-center justify-between w-full">
              <Typography variant="h6" className="text-white opacity-90 mb-1">
                24 soatda qo‘shilganlar
              </Typography>
              <Typography variant="h4" className="font-bold text-white">
                {data?.lastWeekInvitesCount}
              </Typography>
            </div>
          </CardBody>
        </Card>
      </NavLink>

      {data?.groupByTourType?.map((stat, index) => (
        <NavLink key={index} to={`/users/${stat.tourType?.id}`}>
          <Card
            className={`bg-gradient-to-br ${gradients[index % gradients.length]
              } text-white shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] rounded-xl`}
          >
            <CardBody className="flex items-center justify-between p-6">
              <div className="flex items-center justify-between w-full">
                <Typography variant="h6" className="text-white opacity-90 mb-1">
                  {stat?.tourType?.title}
                </Typography>
                <Typography variant="h4" className="font-bold text-white">
                  {stat?.count}
                </Typography>
              </div>
            </CardBody>
          </Card>
        </NavLink>
      ))}
    </div>

    {/* Quyidagi componentlar endi kartalardan ajraladi */}
    <div className="mt-8">
      {/* <Buttons /> */}
    </div>

    <MoneyCard />
    <UserList />
  </div>
);

}
