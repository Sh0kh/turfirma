import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { $api } from "../../../utils";
import { useParams } from "react-router-dom";
import { Alert } from "../../../utils/Alert";

export default function CategoryAddPrice({ refresh }) {
    const { catrgoryID } = useParams()
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        tourTypeId: 0,
        price: 0,
        month: 0,
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await $api.post(`/tour/type/price/create`, { tourTypeId: catrgoryID, price: form?.price, month: form?.month })
            Alert("Muvaffaqiyatli qo'shildi", "success");
            refresh()
            handleOpen()
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");
        }
    };

    return (
        <>
            <Tooltip content="Add Money">
                <IconButton
                    variant="gradient"
                    color="green"
                    onClick={handleOpen}
                >
                    <BanknotesIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Qo‘shish</DialogHeader>
                <DialogBody divider className="flex flex-col gap-4">
                    <Input
                        label="Price"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                    />
                    <Input
                        label="Month"
                        name="month"
                        type="number"
                        value={form.month}
                        onChange={handleChange}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
