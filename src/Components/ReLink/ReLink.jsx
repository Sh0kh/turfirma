import { useState } from "react";
import { Send, Users, MessageSquare, Newspaper, BarChart3, Check, X } from "lucide-react";
import {
   
    Typography,
  
} from "@material-tailwind/react";
const groups = [
  { id: "all", name: "Барча обуначилар", icon: "👥", count: "2,543" },
  { id: "recent", name: "Яқинда кирганлар", icon: "🆕", count: "127" },
  { id: "left", name: "Чиқиб кетганлар", icon: "👋", count: "89" },
  { id: "expired", name: "Тарифни узайтирмаганлар", icon: "⏰", count: "234" },
  { id: "active", name: "Фаол обуначилар", icon: "⚡", count: "1,892" },
  { id: "longtime", name: "1 марттадан ортиқ узайтирганлар", icon: "🏆", count: "456" },
];

export default function ReLink() {
  const [type, setType] = useState("news");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGroupChange = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((g) => g !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSend = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log({
      type,
      targetGroups: selectedGroups,
      content,
    });
    
    setIsLoading(false);
    // Reset form after successful send
    setContent("");
    setSelectedGroups([]);
  };

  const totalRecipients = selectedGroups.reduce((total, groupId) => {
    const group = groups.find(g => g.id === groupId);
    return total + parseInt(group?.count.replace(',', '') || 0);
  }, 0);

  return (
    <div className="min-h-screen  p-4">
       <div className="flex items-center gap-3 mb-8">
                <Typography variant="h3" className="text-gray-800 font-bold">
                    Axborot bo‘limi
                </Typography>
            </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">
          {/* Message Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Хабар тури
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setType("news")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  type === "news"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Newspaper className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium">📰 Янгилик / Акция</div>
                    <div className="text-sm text-gray-500">Хабар ва маълумотлар</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setType("survey")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  type === "survey"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium">📊 Опрос</div>
                    <div className="text-sm text-gray-500">Фикр ёки талаб</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Target Groups */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Обуначилар гуруҳи
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => handleGroupChange(group.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedGroups.includes(group.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.count} кишилар</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedGroups.includes(group.id)
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}>
                      {selectedGroups.includes(group.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {type === "news" ? "📝 Хабар матни" : "❓ Опрос саволи"}
            </h2>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                type === "news"
                  ? "Хабар матнингизни киритинг..."
                  : "Опрос саволингизни киритинг..."
              }
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
              rows={6}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {content.length}/1000 белгилар
              </span>
              {content.length > 900 && (
                <span className="text-sm text-amber-600">
                  Матн узунлиги чегарасига яқинлашмоқда
                </span>
              )}
            </div>
          </div>

          {/* Summary and Send */}
          {selectedGroups.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">📊 Юбориш хулосаси</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="text-blue-800 font-semibold">Хабар тури</div>
                  <div className="text-blue-600">
                    {type === "news" ? "📰 Янгилик" : "📊 Опрос"}
                  </div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="text-green-800 font-semibold">Гуруҳлар</div>
                  <div className="text-green-600">{selectedGroups.length} та гуруҳ</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <div className="text-purple-800 font-semibold">Жами қабул қилувчилар</div>
                  <div className="text-purple-600">{totalRecipients.toLocaleString()} кишилар</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={() => {
                setContent("");
                setSelectedGroups([]);
                setType("news");
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Тозалаш
            </button>
            
            <button
              onClick={handleSend}
              disabled={!content || selectedGroups.length === 0 || isLoading}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                !content || selectedGroups.length === 0 || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Юборилмоқда...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Юбориш
                </>
              )}
            </button>
          </div>

          {/* Selected Groups Display */}
          {selectedGroups.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3">Танланган гуруҳлар:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedGroups.map((groupId) => {
                  const group = groups.find(g => g.id === groupId);
                  return (
                    <span
                      key={groupId}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      <span>{group?.icon}</span>
                      <span>{group?.name}</span>
                      <button
                        onClick={() => handleGroupChange(groupId)}
                        className="hover:bg-green-200 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
    </div>
  );
}