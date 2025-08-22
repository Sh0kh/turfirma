import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Select,
    Option,
    Switch,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function Clientpayment({ data }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [tours, setTours] = useState([]); // backenddan keladigan object

    const getAllTurType = async () => {
        try {
            const response = await $api.get(`/tour/type/getAll`);
            const data = response.data?.object || [];
            setTours(data);
        } catch (error) {
            console.log(error);
        }
    };

    const [form, setForm] = useState({
        tourTypeId: 0,
        amount: 0,
        paymentDate: new Date().toISOString().slice(0, 10),
        paymentType: "CLICK",
        paymentStatus: true,
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await $api.post(`/payment/create`, { customerId: data?.id, tourTypeId: form?.tourTypeId, amount: form?.amount, paymentDate: form?.paymentDate, paymentType: form?.paymentType, paymentStatus: form?.paymentStatus })
            Alert("Muvaffaqiyatli qo'shildi", "success");
            handleOpen()
            setForm({
                tourTypeId: 0,
                amount: 0,
                paymentDate: new Date().toISOString().slice(0, 10),
                paymentType: "CLICK",
                paymentStatus: true,
            })
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");

        }
    };

    useEffect(() => {
        if (open) {
            getAllTurType();
        }
    }, [open]);

    return (
        <>
            <Tooltip content="To‘lov qilish">
                <IconButton onClick={handleOpen} variant="text" color="green">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>To‘lov qo‘shish</DialogHeader>
                <DialogBody divider>
                    {/* TourTypeId (faqat title chiqariladi) */}
                    <div className="mb-4">
                        <Select
                            label="Tur turi"
                            onChange={(val) => handleChange("tourTypeId", Number(val))}
                        >
                            {tours.length > 0 ? (
                                tours.map((tour) => (
                                    <Option key={tour.id} value={tour.id.toString()}>
                                        {tour.title}
                                    </Option>
                                ))
                            ) : (
                                <Option disabled>Ma’lumot yo‘q</Option>
                            )}
                        </Select>

                    </div>

                    {/* Amount */}
                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Miqdor (so‘m)"
                            value={
                                form.amount
                                    ? form.amount.toLocaleString("uz-UZ") // formatlangan 40 000 ko‘rinishda
                                    : ""
                            }
                            onChange={(e) => {
                                // faqat raqamlarni olish
                                const rawValue = e.target.value.replace(/\D/g, "");
                                handleChange("amount", rawValue ? Number(rawValue) : 0);
                            }}
                        />
                    </div>


                    {/* Payment Date */}
                    <div className="mb-4">
                        <Input
                            type="date"
                            label="To‘lov sanasi"
                            value={form.paymentDate}
                            onChange={(e) =>
                                handleChange("paymentDate", e.target.value)
                            }
                        />
                    </div>

                    {/* Payment Type */}
                    <div className="mb-4">
                        <Select
                            label="To‘lov turi"
                            value={form.paymentType}
                            onChange={(val) => handleChange("paymentType", val)}
                        >
                            <Option value="CLICK">CLICK</Option>
                            <Option value="PAYME">PAYME</Option>
                            <Option value="BANK">BANK</Option>
                        </Select>
                    </div>

                    {/* Payment Status */}
                    <div className="flex items-center gap-3">
                        <Switch
                            id="status"
                            checked={form.paymentStatus}
                            onChange={(e) =>
                                handleChange("paymentStatus", e.target.checked)
                            }
                        />
                        <label htmlFor="status" className="text-sm">
                            To‘lov holati
                        </label>
                    </div>
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
                    <Button color="green" onClick={handleSave}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
