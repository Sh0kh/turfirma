import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    IconButton,
    Tooltip,
    Select,
    Option
} from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function ReferalEdit({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [formData, setFormData] = useState({
        id: data?.id,
        name: data?.name || "",
        link: data?.link || "",
        clickCount: data?.clickCount || 0,
        platform: data?.platform || "TELEGRAM",
    });

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await $api.put(`/referral/update`, formData)
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
            <Tooltip content="Tahrirlash">
                <IconButton onClick={handleOpen} variant="text" color="blue">
                    <PencilIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Referal qo‘shish</DialogHeader>
                <DialogBody divider className="space-y-4">
                    <Input
                        label="Nomi"
                        value={formData?.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                        label="Havola (link)"
                        value={formData.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                    />
                    <Input
                        label="Bosilish soni"
                        type="number"
                        value={formData.clickCount}
                        onChange={(e) => handleChange("clickCount", Number(e.target.value))}
                    />


                    <Select
                        label="Platforma tanlang"
                        value={formData.platform}
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
