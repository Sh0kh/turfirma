import { TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";
import { useNavigate } from "react-router-dom";

export default function CategoryDelete({ id, onDelete }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const handleOpen = () => setOpen(!open);

    const handleDelete = async () => {
        try {
            const response = await $api.delete(`/tour/type/delete?id=${id}`)
            Alert("Muvaffaqiyatli", "success");
            navigate(-1)
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");
        }
    };


    return (
        <>
            <Tooltip content="Delete">
                <IconButton variant="gradient" color="red" onClick={handleOpen}>
                    <TrashIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Kategoriyani o‘chirish</DialogHeader>
                <DialogBody>
                    Siz rostdan ham ushbu kategoriyani o‘chirmoqchimisiz?
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleDelete}>
                        Ha, o‘chirish
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
