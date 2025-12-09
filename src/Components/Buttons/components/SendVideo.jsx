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

export default function SendVideo({ open, setOpen }) {
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [tourTypeId, setTourTypeId] = useState("");
  const [tourTypes, setTourTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setCaption("");
    setType("");
    setFile(null);
    setTourTypeId("");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const fetchTourTypes = async () => {
      try {
        const res = await $api.get("/tour/type/getAll");
        const list = res?.data?.object || [];
        setTourTypes(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Tour typelarni olishda xato:", err);
        Alert("Xatolik", "Tour turlarini yuklab bo‘lmadi.", "error");
      }
    };
    fetchTourTypes();
  }, [open]);

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      Alert("Xatolik", "Iltimos, video faylni tanlang!", "error");
      return;
    }

    if (!type && !tourTypeId) {
      Alert("Xatolik", "Iltimos, Type yoki Tour Type ni tanlang!", "error");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (caption.trim()) formData.append("caption", caption.trim());

      let endpoint = "";
      if (tourTypeId) {
        endpoint = `/controller/sendVideo/tourType/${tourTypeId}`;
        if (type) endpoint += `?type=${encodeURIComponent(type)}`;
      } else {
        endpoint = `/controller/sendVideo?type=${encodeURIComponent(type)}`;
      }

      const res = await $api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.data?.success) {
        Alert("Muvaffaqiyat", res.data?.message || "Video yuborildi!", "success");
        handleClose();
      } else {
        Alert("Xatolik", res?.data?.message || "Yuborishda xatolik yuz berdi!", "error");
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
      <DialogHeader>Send Video</DialogHeader>

      <form onSubmit={handleSubmit}>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="small" className="mb-1 font-semibold">
                Caption (ixtiyoriy)
              </Typography>
              <Input
                label="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
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
            <div>
              <Typography variant="small" className="mb-1 font-semibold">
                File (video) *
              </Typography>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
              />
              {file && (
                <Typography variant="small" className="mt-2 text-gray-600">
                  Tanlangan fayl: {file.name}
                </Typography>
              )}
            </div>

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
          <Button variant="text" color="gray" onClick={handleClose} disabled={loading}>
            Bekor qilish
          </Button>
          <Button type="submit" disabled={loading} className="bg-blue-600 text-white">
            {loading ? "⏳ Yuborilmoqda..." : "Yuborish"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
