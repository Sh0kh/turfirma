import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { $api } from "../../../../utils";
import { Alert } from "../../../../utils/Alert";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function UserComeDelete({ id, refresh }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleDelete = async () => {
        try {
            await $api.delete(`/customer/delete?id=${id}`);
            refresh();
            handleOpen();
            Alert("Muvaffaqiyatli o‘chirildi", "success");
        } catch (error) {
            console.log(error);
            Alert(`Xatolik: ${error}`, "error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            {/* Modalni ochish tugmasi */}
            <Tooltip content="O‘chirish">
                <IconButton onClick={handleOpen} variant="text" color="red">
                    <TrashIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>

            {/* Modal */}
            <Dialog
                open={open}
                handler={handleOpen}
                size="sm"
                className="rounded-lg"
            >
                <DialogHeader className="flex justify-center">
                    <Typography variant="h5" color="red">
                        O‘chirishni tasdiqlash
                    </Typography>
                </DialogHeader>

                <DialogBody divider>
                    <Typography className="text-center">
                        Ushbu foydalanuvchini o‘chirmoqchimisiz? Bu amalni qaytarib bo‘lmaydi.
                    </Typography>
                </DialogBody>

                <DialogFooter className="flex justify-center gap-4">
                    <Button variant="text" color="blue-gray" onClick={handleOpen}>
                        Bekor qilish
                    </Button>
                    <Button color="red" onClick={handleDelete}>
                        O‘chirish
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
