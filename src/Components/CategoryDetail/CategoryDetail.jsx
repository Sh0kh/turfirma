import { useParams } from "react-router-dom";
import { $api } from "../../utils";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    IconButton,
    Button,
    Tooltip,
} from "@material-tailwind/react";
import Loading from "../UI/Loading/Loading";
import { PencilIcon, TrashIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import CategoryAddPrice from "./components/CategoryAddPrice";
import CategoryEdit from "./components/CategoryEdit";
import CategoryDelete from "./components/CategoryDelete";
import CategoryPriceEdit from "./components/CategoryPriceEdit";
import CategoryPriceDelete from "./components/CategoryPriceDelete";

export default function CategoryDetail() {
    const { catrgoryID } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getOneCategory = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`/tour/type/getOne?id=${catrgoryID}`);
            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOneCategory();
    }, [catrgoryID]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="mx-auto p-2 space-y-8">
            {/* Category Info */}
            <Card className="w-full shadow-lg">
                <div className="rounded-xl flex items-center justify-between gap-[20px] pr-[10px]">
                    <Typography className="rounded-xl pt-6 px-4 w-full" variant="h5">
                        {data?.title}
                    </Typography>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <CategoryAddPrice refresh={getOneCategory} />
                        <CategoryEdit refresh={getOneCategory} data={data} />
                        <CategoryDelete id={data?.id} />
                    </div>
                </div>
                <CardBody>
                    <div className="space-y-3">
                        <Typography variant="small" color="blue-gray">
                            <strong>Izoh:</strong> {data?.description}
                        </Typography>

                        <Typography variant="small" color="blue-gray">
                            <strong>Chegirma:</strong> {data?.discount} %
                        </Typography>

                        <Typography variant="small" color="blue-gray">
                            <strong>Tourlar soni:</strong> {data?.tourTypes?.length || 0}
                        </Typography>
                    </div>
                </CardBody>
            </Card>

            {/* Tour Types List */}
            <div className="space-y-4">
                <Typography variant="h6" color="blue-gray">
                    Tour Types
                </Typography>

                {data?.tourTypes && data.tourTypes.length > 0 ? (
                    data?.tourTypes.map((tour, index) => (
                        <Card key={tour.id} className="w-full shadow-md">
                            <CardBody>
                                <div className="flex items-center justify-between mb-[10px]">
                                    <h1>
                                        {index + 1}
                                    </h1>
                                    <div className="flex items-center justify-between gap-[10px]">
                                        <CategoryPriceEdit refresh={getOneCategory} data={tour} />
                                        <CategoryPriceDelete id={tour?.id} refresh={getOneCategory} />
                                    </div>
                                </div>
                                <Typography variant="small" color="blue-gray">
                                    <strong>Price:</strong> {tour.price}
                                </Typography>
                                <Typography variant="small" color="blue-gray">
                                    <strong>Month:</strong> {tour.month}
                                </Typography>
                                <Typography variant="small" color="blue-gray">
                                    <strong>Yaratilgan vaqti:</strong>{" "}
                                    {new Date(tour.createdAt).toLocaleString()}
                                </Typography>

                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Typography variant="small" color="gray">
                        Tour types mavjud emas
                    </Typography>
                )}
            </div>
        </div>
    );
}
