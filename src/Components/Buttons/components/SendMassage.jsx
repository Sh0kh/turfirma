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

export default function SendMessage({ open, setOpen }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || !type) {
      Alert("Iltimos, barcha maydonlarni to‘ldiring!", "warning");
      return;
    }

    setLoading(true);
    try {
      await $api.post(
        `/controller/sendMessage?type=${type}&message=${encodeURIComponent(
          message
        )}`
      );

      Alert("Xabar yuborildi!", "success");
      setMessage("");
      setType("");
      handleClose();
    } catch (error) {
      console.error("Xatolik:", error);
      Alert("Xabar yuborishda xatolik !", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Send Message</DialogHeader>
      <DialogBody divider>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Typography variant="small" className="mb-1 font-semibold">
              Message
            </Typography>
            <Input
              label="Xabar matnini kiriting"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div>
            <Typography variant="small" className="mb-1 font-semibold">
              Type
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
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          {loading ? "Yuborilmoqda..." : "Send"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
