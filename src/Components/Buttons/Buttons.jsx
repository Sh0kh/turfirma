import React, { useState } from "react";
import { Camera, Video, BarChart2, MessageCircle } from "lucide-react";
import SendPhoto from "./components/SendPhoto";
import SendVideo from "./components/SendVideo";
import SendPoll from "./components/SendPoll";
import SendMessage from "./components/SendMassage";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export default function Buttons() {
  const [openSendPhoto, setOpenSendPhoto] = useState(false);
  const [openSendVideo, setOpenSendVideo] = useState(false);
  const [openSendPoll, setOpenSendPoll] = useState(false);
  const [openSendMessage, setOpenSendMessage] = useState(false); 

  const buttons = [
    {
      label: "Photo",
      color: "from-pink-500 to-pink-700",
      icon: <Camera size={20} />,
      onClick: () => setOpenSendPhoto(true),
    },
    {
      label: "Video",
      color: "from-blue-500 to-blue-700",
      icon: <Video size={20} />,
      onClick: () => setOpenSendVideo(true),
    },
    {
      label: "Poll",
      color: "from-green-500 to-green-700",
      icon: <BarChart2 size={20} />,
      onClick: () => setOpenSendPoll(true),
    },
    {
      label: "Message",
      color: "from-purple-500 to-purple-700",
      icon: <MessageCircle size={20} />,
      onClick: () => setOpenSendMessage(true), 
    },
  ];

  return (
    <>
     <div className="flex items-center px-4 gap-[10px]">
                    <Typography variant="h3" className="text-gray-800 font-bold">
                        Harakatlar paneli
                    </Typography>
                </div>
                
                 <div className="grid grid-cols-2 gap-4 w-full mx-auto mt-8 px-4">
         
  {buttons.map((btn, index) => (
    <button
      key={index}
      onClick={btn.onClick}
      className={`w-full flex h-[130px] items-center justify-center gap-3 bg-gradient-to-br ${btn.color} 
      text-white font-semibold py-5 px-6 text-lg rounded-2xl shadow-lg 
      hover:shadow-xl hover:scale-[1.04] active:scale-95 transition-transform`}
    >
      {btn.icon}
      {btn.label}
    </button>
  ))}


      {openSendPhoto && (
        <SendPhoto open={openSendPhoto} setOpen={setOpenSendPhoto} />
      )}
      {openSendVideo && (
        <SendVideo open={openSendVideo} setOpen={setOpenSendVideo} />
      )}
      {openSendPoll && (
        <SendPoll open={openSendPoll} setOpen={setOpenSendPoll} />
      )}
      {openSendMessage && (
        <SendMessage open={openSendMessage} setOpen={setOpenSendMessage} /> 
      )}
    </div></>
  
  );
}
