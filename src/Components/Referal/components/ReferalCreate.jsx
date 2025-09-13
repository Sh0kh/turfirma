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

export default function ReferalCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const fixedLink = "https://t.me/test_robot_py_robot?start=";

    const [form, setForm] = useState({
        name: "",
        link: fixedLink,
        clickCount: 0,
        platform: "TELEGRAM",
    });

    const handleOpen = () => setOpen(!open);

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleLinkChange = (value) => {
        // Проверяем, начинается ли введенное значение с фиксированной части
        if (value.startsWith(fixedLink)) {
            setForm({ ...form, link: value });
        } else {
            // Если пользователь попытался удалить фиксированную часть, восстанавливаем её
            // и добавляем только то, что он хотел добавить после неё
            const suffix = value;
            setForm({ ...form, link: fixedLink + suffix });
        }
    };

    const handleLinkKeyDown = (e) => {
        const input = e.target;
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;

        // Запрещаем удаление символов в области фиксированной части
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            selectionStart <= fixedLink.length
        ) {
            e.preventDefault();
            // Устанавливаем курсор в конец фиксированной части
            setTimeout(() => {
                input.setSelectionRange(fixedLink.length, fixedLink.length);
            }, 0);
        }

        // Запрещаем выделение и удаление части фиксированной ссылки
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            selectionEnd <= fixedLink.length
        ) {
            e.preventDefault();
        }
    };

    const handleLinkClick = (e) => {
        const input = e.target;
        // Если курсор находится в области фиксированной части, перемещаем его в конец
        setTimeout(() => {
            if (input.selectionStart < fixedLink.length) {
                input.setSelectionRange(fixedLink.length, input.value.length);
            }
        }, 0);
    };

    const handleSubmit = async () => {
        try {
            const response = await $api.post(`referral/create`, form)
            Alert("Muvaffaqiyatli", "success");
            setForm({
                name: "",
                link: fixedLink, // Сбрасываем на фиксированную ссылку
                clickCount: '',
                platform: "TELEGRAM",
            })
            handleOpen()
            refresh()
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
                <DialogHeader>Referal qo'shish</DialogHeader>
                <DialogBody divider className="space-y-4">
                    <Input
                        label="Nomi"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                        label="Havola (link)"
                        value={form.link}
                        onChange={(e) => handleLinkChange(e.target.value)}
                        onKeyDown={handleLinkKeyDown}
                        onClick={handleLinkClick}
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