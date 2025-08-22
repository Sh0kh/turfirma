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

export default function CategoryEdit({ refresh, data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        id: data?.id || 0,
        title: data?.title || "",
        description: data?.description || "",
        discount: data?.discount || 0,
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await $api.put(`/tour/type/update`, { id: data?.id, title: form?.title, description: form?.description, discount: form?.discount })
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
                <DialogHeader>Kategoriya Tahrirlash</DialogHeader>
                <DialogBody divider className="flex flex-col gap-4">
                    <Input
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                    <Textarea
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <Input
                        type="number"
                        label="Discount"
                        name="discount"
                        value={form.discount}
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
