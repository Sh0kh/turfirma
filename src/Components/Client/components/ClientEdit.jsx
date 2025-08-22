import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    IconButton,
    Tooltip
} from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function ClientEdit({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [formData, setFormData] = useState({
        fullaName: data?.fullaName || "",
        telegramUsername: data?.telegramUsername || "",
        phoneNumber: data?.phoneNumber || "",
        passport: data?.passport || "",
        telegramId: data?.telegramId || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await $api.put(`/customer/update`, { id: data?.id, fullaName: formData?.fullaName, telegramUsername: formData?.telegramUsername, phoneNumber: formData?.phoneNumber, passport: formData?.passport, telegramId: formData?.telegramId })
            Alert("Muvaffaqiyatli qo'shildi", "success");
            handleOpen()
            refresh()
            setFormData({
                fullaName: "",
                telegramUsername: "",
                phoneNumber: "",
                passport: "",
                telegramId: ""
            })
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");
        }
    };

    return (
        <>
            <Tooltip content="Tahrirlash">
                <IconButton onClick={handleOpen} variant="text" color="blue">
                    <PencilIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Client Tahrirlash</DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody className="flex flex-col gap-4">
                        <Input
                            label="To‘liq ismi"
                            name="fullaName"
                            value={formData.fullaName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Telegram Username"
                            name="telegramUsername"
                            value={formData.telegramUsername}
                            onChange={handleChange}
                        />
                        <Input
                            label="Telefon raqam"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        <Input
                            label="Passport"
                            name="passport"
                            value={formData.passport}
                            onChange={handleChange}
                        />
                        <Input
                            label="Telegram ID"
                            name="telegramId"
                            type="number"
                            value={formData.telegramId}
                            onChange={handleChange}
                        />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-2"
                        >
                            Bekor qilish
                        </Button>
                        <Button type="submit" color="green">
                            Saqlash
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
