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
    const { catrgoryID } = useParams();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        price: "",
        year: "",
        month: "",
        week: "",
        day: "",
    });

    const handleOpen = () => setOpen(!open);

    // форматируем число: 100000 -> 100 000
    const formatNumber = (value) => {
        if (!value) return "";
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const parseNumber = (value) => {
        return Number(value.replace(/\s/g, "")) || 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "price") {
            // удаляем пробелы и форматируем заново
            const raw = value.replace(/\s/g, "");
            if (!/^\d*$/.test(raw)) return; // только числа
            setForm({ ...form, price: formatNumber(raw) });
        } else {
            setForm({ ...form, [name]: value === "" ? "" : Number(value) });
        }
    };

    const handleSubmit = async () => {
        const payload = {
            tourTypeId: catrgoryID,
            price: parseNumber(form.price), // чистое число без пробелов
            year: Number(form.year) || 0,
            month: Number(form.month) || 0,
            week: Number(form.week) || 0,
            day: Number(form.day) || 0,
        };

        // Проверка
        if (payload.price <= 0 || (payload.year === 0 && payload.month === 0 && payload.week === 0 && payload.day === 0)) {
            Alert("Qiymatlar noto‘g‘ri! Narx > 0 bo‘lishi va muddatlardan biri tanlanishi kerak.", "error");
            return;
        }

        try {
            await $api.post(`/tour/type/price/create`, payload);
            Alert("Muvaffaqiyatli qo'shildi", "success");
            refresh();
            handleOpen();
            setForm({
                price: "",
                year: "",
                month: "",
                week: "",
                day: "",
            });
        } catch (error) {
            console.log(error);
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
                        type="text"
                        value={form.price}
                        onChange={handleChange}
                    />
                    <Input
                        label="Year"
                        name="year"
                        type="number"
                        value={form.year}
                        onChange={handleChange}
                    />
                    <Input
                        label="Month"
                        name="month"
                        type="number"
                        value={form.month}
                        onChange={handleChange}
                    />
                    <Input
                        label="Week"
                        name="week"
                        type="number"
                        value={form.week}
                        onChange={handleChange}
                    />
                    <Input
                        label="Day"
                        name="day"
                        type="number"
                        value={form.day}
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
