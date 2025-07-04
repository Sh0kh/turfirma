import { useState } from "react";
import { Send, Users, MessageSquare, Newspaper, BarChart3, Check, X, Upload, Image, Video, FileText, Plus, Trash2 } from "lucide-react";
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleGroupChange = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((g) => g !== groupId)
        : [...prev, groupId]
    );
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 10) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handleSend = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const messageData = {
      type,
      targetGroups: selectedGroups,
      content,
      mediaFiles: uploadedFiles,
      pollOptions: type === "survey" ? pollOptions.filter(opt => opt.trim() !== "") : []
    };

    console.log(messageData);

    setIsLoading(false);
    // Reset form after successful send
    setContent("");
    setSelectedGroups([]);
    setUploadedFiles([]);
    setPollOptions(["", ""]);
  };

  const totalRecipients = selectedGroups.reduce((total, groupId) => {
    const group = groups.find(g => g.id === groupId);
    return total + parseInt(group?.count.replace(',', '') || 0);
  }, 0);

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8">
        <Typography variant="h3" className="text-gray-800 font-bold">
          Axborot bo'limi
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
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${type === "news"
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
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${type === "survey"
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
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${selectedGroups.includes(group.id)
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
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedGroups.includes(group.id)
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

        {/* Poll Options - Only show for survey type */}
        {type === "survey" && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📝 Опрос вариантлари
            </h2>
            <div className="space-y-3">
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 font-medium w-6">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                    placeholder={`Вариант ${index + 1}`}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      onClick={() => removePollOption(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {pollOptions.length < 10 && (
              <button
                onClick={addPollOption}
                className="mt-3 flex items-center gap-2 px-4 py-2 text-purple-600 border-2 border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Вариант қўшиш
              </button>
            )}
          </div>
        )}

        {/* Media Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-orange-600" />
            Медия файллар
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-800">Файл танланг</div>
                <div className="text-sm text-gray-500">Расм, видео ёки ҳужжат</div>
              </div>
            </label>
          </div>

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-3">
              <h3 className="font-medium text-gray-800">Юкланган файллар:</h3>
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-blue-600">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{file.name}</div>
                    <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary and Send */}
        {selectedGroups.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Юбориш хулосаси</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div className="bg-orange-100 p-4 rounded-lg">
                <div className="text-orange-800 font-semibold">Файллар</div>
                <div className="text-orange-600">
                  {uploadedFiles.length} та файл
                  {type === "survey" && (
                    <div className="text-sm mt-1">
                      {pollOptions.filter(opt => opt.trim() !== "").length} та вариант
                    </div>
                  )}
                </div>
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
              setUploadedFiles([]);
              setPollOptions(["", ""]);
            }}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Тозалаш
          </button>

          <button
            onClick={handleSend}
            disabled={!content || selectedGroups.length === 0 || isLoading || (type === "survey" && pollOptions.filter(opt => opt.trim() !== "").length < 2)}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${!content || selectedGroups.length === 0 || isLoading || (type === "survey" && pollOptions.filter(opt => opt.trim() !== "").length < 2)
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