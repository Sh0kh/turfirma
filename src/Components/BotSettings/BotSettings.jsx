import React, { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Textarea,
    Button,
} from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function BotSettings() {
    const [settings, setSettings] = useState({
        buttonText: "Obuna bo'lish",
        welcomeMessage: "Assalomu alaykum! Botga xush kelibsiz 👋",
        testdriveEnd: "Test drive muddati tugadi. Obuna bo'lish uchun to'lov qiling.",
        paymentReminder: "Obuna muddati tugash arafasida. Iltimos, to'lovni amalga oshiring.",
        managerContact: "+998 90 123 45 67",
        idPrefix: "OAS-",
    });

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // API ga yuborish funksiyasi
        console.log("Saqlangan sozlamalar:", settings);
    };

    return (
        <div className="min-h-screen p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Cog6ToothIcon className="h-8 w-8 text-blue-600" />
                <Typography variant="h3" className="text-gray-800 font-bold">
                    Bot sozlamalari
                </Typography>
            </div>

            {/* Settings Card */}
            <Card className="p-6">
                <CardBody className="space-y-6">
                    {/* Til sozlamalari */}
                    <div>
                        <Typography variant="h5" className="mb-2 text-gray-800">
                            Til sozlamalari
                        </Typography>
                        <Input
                            label="Tugma matni"
                            name="buttonText"
                            value={settings.buttonText}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Avto-xabarlar */}
                    <div>
                        <Typography variant="h5" className="mb-2 text-gray-800">
                            Avto-xabarlar
                        </Typography>

                        <div className="space-y-4">
                            <Textarea
                                label="Welcome xabari"
                                name="welcomeMessage"
                                value={settings.welcomeMessage}
                                onChange={handleChange}
                                rows={3}
                                className="resize-none"
                            />

                            <Textarea
                                label="TestDrive tugashi xabari"
                                name="testdriveEnd"
                                value={settings.testdriveEnd}
                                onChange={handleChange}
                                rows={3}
                                className="resize-none"
                            />

                            <Textarea
                                label="To'lov eslatmasi"
                                name="paymentReminder"
                                value={settings.paymentReminder}
                                onChange={handleChange}
                                rows={3}
                                className="resize-none"
                            />
                        </div>
                    </div>

                    {/* Menejer kontaktlari */}
                    <div>
                        <Typography variant="h5" className="mb-2 text-gray-800">
                            Menejer kontaktlari
                        </Typography>
                        <Input
                            label="Telefon raqami"
                            name="managerContact"
                            value={settings.managerContact}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Avto-ID prefiksi */}
                    <div>
                        <Typography variant="h5" className="mb-2 text-gray-800">
                            Avto-ID generatsiya prefiksi
                        </Typography>
                        <Input
                            label="Masalan: OAS-"
                            name="idPrefix"
                            value={settings.idPrefix}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Saqlash tugmasi */}
                    <div className="pt-4">
                        <Button color="blue" onClick={handleSave}>
                            Sozlamalarni saqlash
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}