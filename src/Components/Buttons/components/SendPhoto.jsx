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

export default function SendPhoto({ open, setOpen }) {
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !type) {
      Alert("Iltimos, Type va File maydonlarini to‘ldiring!", "warning");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("file", file);

      await $api.post(`/controller/sendPhoto?type=${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert("Rasm muvaffaqiyatli yuborildi!", "success");
      handleClose();
      setCaption("");
      setType("");
      setFile(null);
    } catch (error) {
      console.error("Xatolik:", error);
      Alert("Yuborishda xatolik yuz berdi!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Send Photo</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              required
              className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            >
            <option value="">Tanlang</option>
              <option value="LAST_WEEK_JOINS">Yaqin haftada qoshilgan</option>
              <option value="LAST_WEEK_QUITES">Yaqin haftada chiqgan</option>
              <option value="ALL">Hammasi</option>
            </select>
          </div>

          <div>
            <Typography variant="small" className="mb-1 font-semibold">
              File (rasm)
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
            />
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
