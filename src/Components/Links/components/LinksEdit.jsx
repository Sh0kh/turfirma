import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function LinksEdit({ refresh, data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        tourTypeId: data?.tourTypeId || "",
        link: data?.link || "",
    });
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const GetAllCategory = async () => {
        try {
            setLoading(true);
            const response = await $api.get(`tour/type/getAll`);
            setCategoryData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            GetAllCategory();
        }
    }, [open]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (value) => {
        setForm({ ...form, tourTypeId: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await $api.put(`/join/link/update`, { id: data?.id, tourTypeId: form?.tourTypeId, link: form?.link })
            Alert("Muvaffaqiyatli ", "success");
            handleOpen();
            refresh()
        } catch (error) {
            Alert(`Xatolik: ${error}`, "error");
        }
    };



    return (
        <>
            <Tooltip content="Havolani yangilash">
                <IconButton onClick={handleOpen} variant="text" color="blue" >
                    <PencilIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Havolani tahrirlash Link</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Select
                        label="Tour Type"
                        onChange={handleSelect}
                        disabled={loading}
                    >
                        {loading ? (
                            <Option disabled>Loading...</Option>
                        ) : categoryData.length > 0 ? (
                            categoryData.map((category) => (
                                <Option
                                    key={category.id}
                                    value={category.id.toString()}
                                >
                                    {category.title}
                                </Option>
                            ))
                        ) : (
                            <Option disabled>No categories available</Option>
                        )}
                    </Select>

                    <Input
                        label="Link"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleSubmit}
                        disabled={!form.tourTypeId || !form.link}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}