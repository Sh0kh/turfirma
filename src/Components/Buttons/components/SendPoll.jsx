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

export default function SendPoll({ open, setOpen }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [type, setType] = useState("");
  const [tourTypeId, setTourTypeId] = useState("");
  const [tourTypes, setTourTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setQuestion("");
    setOptions([""]);
    setType("");
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

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
    else Alert("Eng ko‘pi bilan 6 ta variant kiritish mumkin!", "warning");
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      Alert("Xatolik", "Savolni kiriting!", "error");
      return;
    }

    if (options.some((o) => !o.trim())) {
      Alert("Xatolik", "Barcha variantlar to‘ldirilgan bo‘lishi kerak!", "error");
      return;
    }

    if (!type && !tourTypeId) {
      Alert("Xatolik", "Iltimos, Type yoki Tour Type ni tanlang!", "error");
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (type) params.append("type", type);
      params.append("question", question);
      options.forEach((opt) => params.append("caption", opt));

      let endpoint = "";
      if (tourTypeId) {
        endpoint = `/controller/sendPoll/tourType/${tourTypeId}?${params.toString()}`;
      } else {
        endpoint = `/controller/sendPoll?${params.toString()}`;
      }

      const res = await $api.post(endpoint, null, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res?.data?.success) {
        Alert("Muvaffaqiyat", res.data?.message || "So‘rovnoma yuborildi!", "success");
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
      <DialogHeader>Send Poll</DialogHeader>

      <form onSubmit={handleSubmit}>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="small" className="mb-1 font-semibold">
                Savol *
              </Typography>
              <Input
                label="Savol kiriting"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            <div>
              <Typography variant="small" className="mb-2 font-semibold">
                Javob variantlari
              </Typography>
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    label={`Variant ${index + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700 font-bold px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addOption}
                variant="outlined"
                className="border-green-600 text-green-600 hover:bg-green-50 mt-1"
              >
                + Variant qo‘shish
              </Button>
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
                <option value="">Tanlanmagan</option>
                <option value="LAST_WEEK_JOINS">Yaqin haftada qo‘shilgan</option>
                <option value="LAST_WEEK_QUITES">Yaqin haftada chiqgan</option>
                <option value="ALL">Hammasi</option>
              </select>
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
