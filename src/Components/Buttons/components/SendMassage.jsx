import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function SendMessage({ open, setOpen }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [tourTypeId, setTourTypeId] = useState("");
  const [tourTypes, setTourTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setMessage("");
    setType("");
    setTourTypeId("");
    setOpen(false);
  };

  // Tour type'larni olish
  useEffect(() => {
    if (!open) return;
    const fetchTourTypes = async () => {
      try {
        const res = await $api.get("/tour/type/getAll");
        const list = res?.data?.object || [];
        setTourTypes(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Tour type olishda xato:", err);
        Alert("Xatolik", "Tour turlarini yuklab bo‘lmadi.", "error");
      }
    };
    fetchTourTypes();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      Alert("Xatolik", "Iltimos, xabar matnini kiriting!", "warning");
      return;
    }

    if (!type && !tourTypeId) {
      Alert("Xatolik", "Iltimos, Type yoki Tour Type ni tanlang!", "warning");
      return;
    }

    setLoading(true);
    try {
      // 🔹 Endpointni avtomatik tanlash
      let endpoint = "";
      const encodedMsg = encodeURIComponent(message.trim());

      if (tourTypeId) {
        endpoint = `/controller/sendMessage/tourType/${tourTypeId}?message=${encodedMsg}`;
        if (type) endpoint += `&type=${encodeURIComponent(type)}`;
      } else {
        endpoint = `/controller/sendMessage?type=${encodeURIComponent(type)}&message=${encodedMsg}`;
      }

      // 🔹 Backendga so‘rov yuborish (bo‘sh body bilan)
      const res = await $api.post(endpoint, {});

      if (res?.data?.success) {
        Alert("Muvaffaqiyat", res.data?.message || "Xabar yuborildi!", "success");
        handleClose();
      } else {
        Alert("Xatolik", res?.data?.message || "Xabar yuborishda xatolik!", "error");
      }
    } catch (err) {
      console.error("Yuborish xatosi:", err);
      const msg = err?.response?.data?.message || "Server xatosi";
      Alert("Xatolik", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Send Message</DialogHeader>

      <form onSubmit={handleSubmit}>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            {/* Message */}
            <div>
              <Typography variant="small" className="mb-1 font-semibold">
                Message *
              </Typography>
              <Input
                label="Xabar matnini kiriting"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Type */}
            <div>
              <Typography variant="small" className="mb-1 font-semibold">
                Type (query param)
              </Typography>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
              >
                <option value="">Tanlang</option>
                <option value="LAST_WEEK_JOINS">Yaqin haftada qo‘shilgan</option>
                <option value="LAST_WEEK_QUITES">Yaqin haftada chiqgan</option>
                <option value="ALL">Hammasi</option>
              </select>
            </div>

            {/* Tour Type */}
            <div>
              <Typography variant="small" className="mb-1 font-semibold">
                Tour Type (API dan)
              </Typography>
              <select
                value={tourTypeId}
                onChange={(e) => setTourTypeId(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
              >
                <option value="">Tanlanmagan</option>
                {tourTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title || `ID ${t.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="text"
            color="gray"
            onClick={handleClose}
            disabled={loading}
            className="hover:bg-gray-100"
          >
            Bekor qilish
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            {loading ? "⏳ Yuborilmoqda..." : "Yuborish"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
