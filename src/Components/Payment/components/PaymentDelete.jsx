import { TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";
import { useNavigate } from "react-router-dom";

export default function PaymentDelete({ id, refresh }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleDelete = async () => {
        try {
            const response = await $api.delete(`/payment/delete?id=${id}`)
            Alert("Muvaffaqiyatli", "success");
            refresh()
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");
        }
    };


    return (
        <>

            <Tooltip content="O‘chirish">
                <IconButton onClick={handleOpen} variant="text" color="red">
                    <TrashIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>To'lovni o‘chirish</DialogHeader>
                <DialogBody>
                    Siz rostdan ham ushbu to'lovni o‘chirmoqchimisiz?
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
