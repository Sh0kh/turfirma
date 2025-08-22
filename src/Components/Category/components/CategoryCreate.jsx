import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Button,
    Textarea,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function CategoryCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        discount: 0,
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await $api.post(`/tour/type/create`, { title: form?.title, description: form?.description, discount: form?.discount })
            Alert("Muvaffaqiyatli qo'shildi", "success");
            handleOpen()
            refresh()
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");

        }
    };

    return (
        <>
            <Button color="blue" onClick={handleOpen}>
                Kategoriya qo‘shish
            </Button>
            <Dialog open={open} handler={handleOpen} size="sm" className="rounded-xl">
                <DialogHeader>Kategoriya yaratish</DialogHeader>
                <DialogBody divider>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="Sarlavha (title)"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />
                        <Textarea
                            label="Tavsif (description)"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                        <Input
                            label="Chegirma (%)"
                            type="number"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button color="green" onClick={handleSave}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
