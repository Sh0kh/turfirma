import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Textarea,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function CategoryPriceEdit({ refresh, data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        id: data?.id || 0,
        price: data?.price || "",
        month: data?.month || 0,
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await $api.put(`/tour/type/price/update`, { id: data?.id, tourTypeId: data?.tourTypeId, price: form?.price, month: form?.month })
            Alert("Muvaffaqiyatli", "success");
            refresh()
            handleOpen()
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");
        }
    };

    return (
        <>
            <Tooltip content="Edit">
                <IconButton variant="gradient" color="blue" onClick={handleOpen}>
                    <PencilIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Kategoriya narxini Tahrirlash</DialogHeader>
                <DialogBody divider className="flex flex-col gap-4">
                    <Input
                        type="number"
                        label="Narxi"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                    />
                    <Input
                        type="number"
                        label="Oy"
                        name="month"
                        value={form.month}
                        onChange={handleChange}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen}>
                        Bekor qilish
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleSubmit}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
