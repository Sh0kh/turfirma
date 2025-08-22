import { UserPlusIcon } from "@heroicons/react/24/outline";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    IconButton,
    Select,
    Option
} from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function ClientCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [formData, setFormData] = useState({
        fullaName: "",
        telegramUsername: "",
        phoneNumber: "",
        passport: "",
        language: "",
        telegramId: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await $api.post(`/customer/create`, {
                fullName: formData?.fullaName, telegramUsername: formData?.telegramUsername, language: formData?.language,
                phoneNumber: formData?.phoneNumber, passport: formData?.passport, telegramId: formData?.telegramId
            })
            Alert("Muvaffaqiyatli qo'shildi", "success");
            refresh()
            handleOpen()
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
            <Button onClick={handleOpen} color="green" className="flex items-center gap-2">
                <UserPlusIcon className="h-5 w-5" />
                Obuna ochish
            </Button>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Yangi Client Qo‘shish</DialogHeader>
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
                        <Select
                            label="Til"
                            value={formData.language}
                            onChange={(val) => setFormData({ ...formData, language: val })}
                        >
                            <Option value="UZ">Uz</Option>
                            <Option value="RU">Ru</Option>
                        </Select>
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
