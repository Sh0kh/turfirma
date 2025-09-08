import React, { useEffect, useState } from "react";
import {
  LinkIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  FaTelegram,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";
import ReferalCreate from "./components/ReferalCreate";
import { $api } from "../../utils";
import ReferalDelete from "./components/ReferalDelete";
import ReferalEdit from "./components/ReferalEdit";
import Loading from "../UI/Loading/Loading";

export default function Referal() {
  const [activeTab, setActiveTab] = useState("links");
  const [copiedLink, setCopiedLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [referalData, setReferalData] = useState([]);

  const getAllReferal = async () => {
    try {
      const response = await $api.get(`/referral/getAll`);
      setReferalData(response?.data?.object || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllReferal();
  }, []);

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(url);
      setTimeout(() => setCopiedLink(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const platformStyles = {
    TELEGRAM: {
      color: "bg-[#229ED9]",
      icon: <FaTelegram className="text-white text-2xl" />,
    },
    INSTAGRAM: {
      color: "bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]",
      icon: <FaInstagram className="text-white text-2xl" />,
    },
    YOUTUBE: {
      color: "bg-[#FF0000]",
      icon: <FaYoutube className="text-white text-2xl" />,
    },
    TIKTOK: {
      color: "bg-black",
      icon: <FaTiktok className="text-white text-2xl" />,
    },
    OTHER: {
      color: "bg-gray-500",
      icon: <FaGlobe className="text-white text-2xl" />,
    },
  };

  if (loading) {
    return <Loading />;
  }

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
          <ReferalCreate refresh={getAllReferal} />
        </div>
      </div>

      {/* Platform Selector */}
      {referalData.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Platformalar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {referalData?.map((i, index) => {
              const style = platformStyles[i.platform] || platformStyles.OTHER;
              return (
                <div
                  key={index}
                  className="cursor-pointer transition-all duration-300 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className={`p-4 flex items-center gap-3 ${style.color}`}>
                    {style.icon}
                    <h3 className="text-lg font-medium text-white">{i.name}</h3>
                  </div>
                  <div className="bg-white p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Bosishlar</span>
                      <span className="text-gray-800 font-semibold">
                        {i.clickCount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 text-indigo-600 border-b-2 border-indigo-500`}
          >
            <LinkIcon className="h-5 w-5" />
            Havolalar
          </button>
        </div>

        <div className="p-0">
          {activeTab === "links" && (
            <>
              {referalData.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-12 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Ma'lumot yo‘q
                  </h2>
                  <p className="text-gray-500">
                    Hozircha statistik ma'lumotlar mavjud emas
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
                          Nomi
                        </th>
                        <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
                          Platforma
                        </th>
                        <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
                          Havola
                        </th>
                        <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
                          Bosishlar
                        </th>
                        <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
                          Sana
                        </th>
                        <th className="text-left px-6 py-4 text-gray-500 font-medium text-sm uppercase tracking-wider">
                          Harakatlar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {referalData?.map((link) => (
                        <tr
                          key={link.id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-gray-800 font-medium">
                              {link?.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-gray-800 font-medium">
                              {link?.platform}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-indigo-100 rounded-lg">
                                <LinkIcon className="h-4 w-4 text-indigo-600" />
                              </div>
                              <div>
                                <a
                                  href={link.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors duration-200 max-w-xs truncate inline-block"
                                >
                                  {link.link}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-gray-800 font-medium">
                              {link?.clickCount}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {link?.createdAt ? (
                              <div className="flex items-center gap-2 text-gray-600">
                                <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                                {formatDate(link.createdAt)}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-2 text-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 text-gray-400 mb-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                                  />
                                </svg>
                                <p className="text-xs font-medium text-gray-500">
                                  Ma'lumot yo‘q
                                </p>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <ReferalDelete
                                id={link?.id}
                                refresh={getAllReferal}
                              />
                              <ReferalEdit
                                data={link}
                                refresh={getAllReferal}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
