import React, { useState } from "react";
import {
  ClipboardDocumentIcon,
  ArrowTopRightOnSquareIcon,
  UserPlusIcon,
  ChartBarIcon,
  LinkIcon,
  EyeIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// Mock data
const platformStats = {
  instagram: {
    name: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" /></svg>
    ),
    color: "bg-gradient-to-r from-pink-700 to-pink-500",
    total: 245,
    active: 218,
    conversion: "89%",
    growth: "+12.5%",
    links: [
      { id: 1, url: "https://insta.com/link1", clicks: 152, date: "2023-05-15", status: "active" },
      { id: 2, url: "https://insta.com/link2", clicks: 93, date: "2023-06-22", status: "active" },
      { id: 3, url: "https://insta.com/link3", clicks: 67, date: "2023-07-10", status: "inactive" },
    ],
  },
  youtube: {
    name: "YouTube",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" /></svg>
    ),
    color: "bg-gradient-to-r from-red-500 to-red-900",
    total: 187,
    active: 175,
    conversion: "93.6%",
    growth: "+8.2%",
    links: [
      { id: 1, url: "https://youtu.be/link1", clicks: 112, date: "2023-04-10", status: "active" },
      { id: 2, url: "https://youtu.be/link2", clicks: 75, date: "2023-07-05", status: "active" },
    ],
  },
  TikTok: {
    name: "Tik tok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5"></path><path d="M10 12a3 3 0 1 0 3 3V6c.333 1 1.6 3 4 3"></path></g></svg>
    ),
    color: "bg-gradient-to-r from-black to-red-900",
    total: 150,
    active: 175,
    conversion: "93.6%",
    growth: "+8.2%",
    links: [
      { id: 1, url: "https://youtu.be/link1", clicks: 112, date: "2023-04-10", status: "active" },
      { id: 2, url: "https://youtu.be/link2", clicks: 75, date: "2023-07-05", status: "active" },
    ],
  },
  facebook: {
    name: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" /></svg>
    ),
    color: "bg-gradient-to-r from-blue-600 to-cyan-500",
    total: 312,
    active: 298,
    conversion: "95.5%",
    growth: "+15.8%",
    links: [
      { id: 1, url: "https://fb.com/link1", clicks: 210, date: "2023-03-18", status: "active" },
      { id: 2, url: "https://fb.com/link2", clicks: 102, date: "2023-08-12", status: "active" },
      { id: 3, url: "https://fb.com/link3", clicks: 45, date: "2023-08-20", status: "inactive" },
    ],
  },
  twitter: {
    name: "Telegram Groups",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M0 18v-1.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0v-1.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V18zm13.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12" /></svg>
    ),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    total: 178,
    active: 165,
    conversion: "92.7%",
    growth: "+5.3%",
    links: [
      { id: 1, url: "https://twitter.com/link1", clicks: 98, date: "2023-02-10", status: "active" },
      { id: 2, url: "https://twitter.com/link2", clicks: 67, date: "2023-06-15", status: "active" },
    ],
  },
  telegram: {
    name: "Telegram kanal",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38" /></svg>
    ),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    total: 210,
    active: 205,
    conversion: "97.6%",
    growth: "+18.2%",
    links: [
      { id: 1, url: "https://t.me/link1", clicks: 145, date: "2023-01-05", status: "active" },
      { id: 2, url: "https://t.me/link2", clicks: 85, date: "2023-07-18", status: "active" },
    ],
  },
  telegramBot: {
    name: "Telegram bot",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38" /></svg>
    ),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    total: 210,
    active: 205,
    conversion: "92.6%",
    growth: "+15.2%",
    links: [
      { id: 1, url: "https://t.me/link1", clicks: 145, date: "2023-01-05", status: "active" },
      { id: 2, url: "https://t.me/link2", clicks: 85, date: "2023-07-18", status: "active" },
    ],
  },
  Reklama: {
    name: "Reklama",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm2-4h10v-2H7zm0-4h10v-2H7zm8-4h4l-4-4zM7 9h5V7H7z"></path></svg>
    ),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    total: 110,
    active: 205,
    conversion: "92.6%",
    growth: "+15.2%",
    links: [
      { id: 1, url: "https://t.me/link1", clicks: 145, date: "2023-01-05", status: "active" },
      { id: 2, url: "https://t.me/link2", clicks: 85, date: "2023-07-18", status: "active" },
    ],
  },
  Bloger: {
    name: "Blogerlar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"></path></svg>
    ),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    total: 310,
    active: 205,
    conversion: "92.6%",
    growth: "+15.2%",
    links: [
      { id: 1, url: "https://t.me/link1", clicks: 145, date: "2023-01-05", status: "active" },
      { id: 2, url: "https://t.me/link2", clicks: 85, date: "2023-07-18", status: "active" },
    ],
  },
};

const referralUsers = [
  { id: 1001, name: "Ali Valiyev", platform: "Instagram", joinDate: "2023-05-15", status: "active", earnings: "$125" },
  { id: 1002, name: "Dilshod Rajabov", platform: "YouTube", joinDate: "2023-04-10", status: "active", earnings: "$89" },
  { id: 1003, name: "Shaxzod Xudoyberdiyev", platform: "Facebook", joinDate: "2023-03-18", status: "inactive", earnings: "$0" },
  { id: 1004, name: "Otabek Nurmatov", platform: "Instagram", joinDate: "2023-06-22", status: "active", earnings: "$67" },
  { id: 1005, name: "Jahongir Abdullayev", platform: "YouTube", joinDate: "2023-07-05", status: "active", earnings: "$156" },
  { id: 1006, name: "Farrux Usmonov", platform: "Telegram", joinDate: "2023-01-05", status: "active", earnings: "$210" },
  { id: 1007, name: "Bekzod Rahimov", platform: "Twitter", joinDate: "2023-02-10", status: "active", earnings: "$95" },
];

export default function Referal() {
  const [activeTab, setActiveTab] = useState("links");
  const [copiedLink, setCopiedLink] = useState("");
  const [currentPlatform, setCurrentPlatform] = useState("instagram");

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(url);
      setTimeout(() => setCopiedLink(""), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const currentStats = platformStats[currentPlatform];
  const currentUsers = referralUsers.filter(user => user.platform === currentStats.name);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Referal Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Barcha referal havolalaringiz va statistikangiz
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
            <UserPlusIcon className="h-5 w-5" />
            Yangi Havola
          </button>
          {/* <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 shadow-sm">
            <ChartBarIcon className="h-5 w-5" />
            Statistika
          </button> */}
        </div>
      </div>

      {/* Platform Selector */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Platformalar</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(platformStats).map(([platformKey, platform]) => (
            <div
              key={platformKey}
              className={`cursor-pointer transition-all duration-300 rounded-xl overflow-hidden shadow-sm ${currentPlatform === platformKey
                ? "ring-2 ring-indigo-500 transform scale-[1.02]"
                : "hover:shadow-md"
                }`}
              onClick={() => setCurrentPlatform(platformKey)}
            >
              <div className={`${platform.color} p-4 text-white`}>
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {platform.growth}
                  </span>
                </div>
                <h3 className="text-lg font-medium mt-2">{platform.name}</h3>
              </div>
              <div className="bg-white p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Jami</span>
                  <span className="font-semibold text-gray-800">{platform.total}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-500">Konversiya</span>
                  <span className="font-semibold text-green-600">{platform.conversion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-sm text-green-500 font-medium">{currentStats.growth}</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Jami Referallar</h3>
          <p className="text-2xl font-bold text-gray-800">{currentStats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-green-500 font-medium">↗️</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Faol Foydalanuvchilar</h3>
          <p className="text-2xl font-bold text-green-600">{currentStats.active}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-sm text-amber-500 font-medium">📈</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Konversiya Darajasi</h3>
          <p className="text-2xl font-bold text-amber-600">{currentStats.conversion}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <EyeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-500 font-medium">👁️</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Jami Ko'rishlar</h3>
          <p className="text-2xl font-bold text-blue-600">
            {currentStats.links.reduce((sum, link) => sum + link.clicks, 0)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${activeTab === "links"
              ? "text-indigo-600 border-b-2 border-indigo-500"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            onClick={() => setActiveTab("links")}
          >
            <LinkIcon className="h-5 w-5" />
            Havolalar ({currentStats.links.length})
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${activeTab === "users"
              ? "text-indigo-600 border-b-2 border-indigo-500"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            onClick={() => setActiveTab("users")}
          >
            <UserPlusIcon className="h-5 w-5" />
            Foydalanuvchilar ({currentUsers.length})
          </button>
        </div>

        <div className="p-0">
          {activeTab === "links" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Havola</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Bosishlar</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Sana</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Holat</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Harakatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentStats.links.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <LinkIcon className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors duration-200 max-w-xs truncate inline-block"
                            >
                              {link.url}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-800 font-medium">{link.clicks.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                          {formatDate(link.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${link.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}>
                          {link.status === "active" ? <CheckCircleIcon className="h-3 w-3" /> : <XCircleIcon className="h-3 w-3" />}
                          {link.status === "active" ? "Faol" : "Nofaol"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCopy(link.url)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                            title={copiedLink === link.url ? "Nusxalandi!" : "Nusxalash"}
                          >
                            <ClipboardDocumentIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => window.open(link.url, '_blank')}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                            title="Havolaga o'tish"
                          >
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">ID</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Foydalanuvchi</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Platforma</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Qo'shilgan Sana</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Holat</th>
                    <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">Daromad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-500 font-mono">#{user.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <span className="text-gray-800 font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{currentStats.icon}</span>
                          <span className="text-gray-600">{user.platform}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                          {formatDate(user.joinDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}>
                          {user.status === "active" ? <CheckCircleIcon className="h-3 w-3" /> : <XCircleIcon className="h-3 w-3" />}
                          {user.status === "active" ? "Faol" : "Nofaol"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-green-600 font-semibold">{user.earnings}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Jami {activeTab === "links" ? currentStats.links.length : currentUsers.length} ta element
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm text-gray-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-300" disabled>
              Oldingi
            </button>
            <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              Keyingi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}