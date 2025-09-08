import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
    IconButton,
    Tooltip,
    Select,
    Option,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
    PencilIcon,
    LockClosedIcon,
    UserPlusIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { $api } from "../../../../utils";
import Loading from "../../../UI/Loading/Loading";
import UserComeDelete from "./UserComeDelete";

export default function UsersCome() {
    const { ID } = useParams()
    const [search, setSearch] = useState("");
    const [period, setPeriod] = useState("day");
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])





    const getUser = async () => {
        try {
            setLoading(true)
            const response = await $api.get(`/customer/getAllByTourType?tourTypeId=${ID}`)
            setData(response?.data?.object)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])



    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h4" className="text-gray-800">
                    {data[0]?.tourType?.title}
                </Typography>

            </div>

            <Card>
                <CardBody className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-gray-50 text-gray-700 text-sm">
                                <th className="p-3">ID</th>
                                <th className="p-3">Ism Familiya</th>
                                <th className="p-3">Telefon</th>
                                <th className="p-3">Passport</th>
                                <th className="p-3">Paket tugashi</th>
                                <th className="p-3">Necha marta</th>
                                <th className="p-3">Amalar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-gray-50 text-sm">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleUserClick(user)}
                                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                                        >
                                            {user.fullName}
                                        </button>
                                    </td>
                                    <td className="p-3">{user.phoneNumber}</td>

                                    <td className="p-3">{user.passport}</td>
                                    <td className="p-3">{user.subscription?.expiryDate}</td>

                                    <td className="p-3 font-semibold ">{user.subscription?.count}</td>
                                    <td className="p-3 font-semibold flex items-center justify-center">
                                        <div className="flex items-center justify-center">
                                            <UserComeDelete refresh={getUser} id={user?.id}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="text-center py-6 text-gray-500">
                                        Hech narsa topilmadi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}