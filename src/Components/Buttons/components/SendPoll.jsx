import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

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

    if (!question || !type || options.some((o) => !o.trim())) {
      Alert("Iltimos, barcha maydonlarni to‘ldiring!", "warning");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("type", type);
      params.append("question", question);
      options.forEach((opt) => params.append("caption", opt));

      await $api.post(`/controller/sendPoll?${params.toString()}`, null, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Alert("So‘rovnoma yuborildi!", "success");
      handleClose();
      setQuestion("");
      setOptions([""]);
      setType("");
    } catch (error) {
      console.error("Xatolik:", error?.response?.data || error);
      Alert(" Yuborishda xatolik!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Send Poll</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Question */}
          <div>
            <Typography variant="small" className="mb-1 font-semibold">
              Question
            </Typography>
            <Input
              label="Savol kiriting"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          {/* Options */}
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

          {/* Type */}
          <div>
            <Typography variant="small" className="mb-1 font-semibold">
              Type (query param)
            </Typography>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            >
            <option value="">Tanlang</option>
              <option value="LAST_WEEK_JOINS">Yaqin haftada qoshilgan</option>
              <option value="LAST_WEEK_QUITES">Yaqin haftada chiqgan</option>
              <option value="ALL">Hammasi</option>
            </select>
          </div>
        </form>
      </DialogBody>

      <DialogFooter className="flex justify-end gap-3">
        <Button
          variant="text"
          color="gray"
          onClick={handleClose}
          className="hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          {loading ? "Yuborilmoqda..." : "Send"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
