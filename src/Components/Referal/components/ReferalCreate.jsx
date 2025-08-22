import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function ReferalCreate() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        link: "",
        clickCount: 0,
        platform: "TELEGRAM",
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await $api.post(`referral/create`, form)
            Alert("Muvaffaqiyatli", "success");
            setForm({
                name: "",
                link: "",
                clickCount: 0,
                platform: "TELEGRAM",
            })
            handleOpen()
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");
        }
    };

    return (
        <>
            <Button onClick={handleOpen} color="blue">
                Referal yaratish
            </Button>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Referal qo‘shish</DialogHeader>
                <DialogBody divider className="space-y-4">
                    <Input
                        label="Nomi"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                        label="Havola (link)"
                        value={form.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                    />
                    <Input
                        label="Bosilish soni"
                        type="number"
                        value={form.clickCount}
                        onChange={(e) => handleChange("clickCount", Number(e.target.value))}
                    />


                    <Select
                        label="Platforma tanlang"
                        value={form.platform}
                        onChange={(val) => handleChange("platform", val)}
                    >
                        <Option value="TELEGRAM">TELEGRAM</Option>
                        <Option value="INSTAGRAM">INSTAGRAM</Option>
                        <Option value="YOUTUBE">YOUTUBE</Option>
                        <Option value="TIKTOK">TIKTOK</Option>
                        <Option value="OTHER">Boshqa</Option>
                    </Select>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen}>
                        Bekor qilish
                    </Button>
                    <Button color="green" onClick={handleSubmit}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
