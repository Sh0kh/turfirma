import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { CurrencyDollarIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import CategoryCreate from "./components/CategoryCreate";
import { $api } from "../../utils";
import Loading from "../UI/Loading/Loading";
import { NavLink } from "react-router-dom";

export default function Category() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getAllCategory = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`/tour/type/getAll`);
            setData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen w-full p-4">
            {/* Заголовок */}
            <div className="flex items-center justify-between w-full mb-10">
                <div className="flex items-center gap-[10px]">
                    <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                    <Typography variant="h3" className="text-gray-800 font-bold">
                        Tariflar boshqaruvi
                    </Typography>
                </div>
                <CategoryCreate refresh={getAllCategory}/>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
                    <FaceFrownIcon className="w-16 h-16 mb-4 text-gray-400" />
                    <Typography variant="h5" className="mb-2 font-semibold">
                        Hozircha tariflar mavjud emas
                    </Typography>
                    <Typography variant="small">
                        Yangi tarif qo‘shish uchun yuqoridagi tugmadan foydalaning
                    </Typography>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((plan, index) => (
                        <NavLink to={`/category/${plan?.id}`} key={plan?.id || index}>
                            <Card
                                className="shadow-xl hover:shadow-2xl transition-transform hover:scale-105 rounded-2xl"
                            >
                                <CardBody className="p-6 flex flex-col justify-between h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <Typography variant="h4" className="font-bold">
                                            {plan?.title}
                                        </Typography>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <Typography className="text-sm opacity-80">Chegirma:</Typography>
                                            <Typography className="text-lg font-semibold">
                                                {plan?.discount} %
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography className="text-sm opacity-80">Izoh:</Typography>
                                            <Typography className="text-base">
                                                {plan?.description || "Izoh kiritilmagan"}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}
