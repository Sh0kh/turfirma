import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Textarea,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { $api } from "../../utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

// хук для закрытия при клике вне
function useOutsideClick(refs, handler) {
    useEffect(() => {
        function listener(e) {
            if (refs.some((ref) => ref.current && ref.current.contains(e.target))) {
                return;
            }
            handler();
        }
        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [refs, handler]);
}

// компонент для рендера dropdown в portal
const DropdownPortal = ({ anchorRef, dropdownRef, open, children, width = 250 }) => {
    if (!open || !anchorRef.current) return null;
    const rect = anchorRef.current.getBoundingClientRect();

    return createPortal(
        <div
            ref={dropdownRef}
            className="absolute z-[9999] bg-white border border-gray-300 rounded-lg shadow-lg"
            style={{
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width || width,
            }}
        >
            {children}
        </div>,
        document.body
    );
};

export default function Message() {
    const [activeTab, setActiveTab] = useState("all");
    const [messageAll, setMessageAll] = useState("");
    const [type, setType] = useState("ALL");
    const [messageCategory, setMessageCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [typeSelectOpen, setTypeSelectOpen] = useState(false);
    const [categorySelectOpen, setCategorySelectOpen] = useState(false);

    const typeRef = useRef(null);
    const categoryRef = useRef(null);
    const typeDropdownRef = useRef(null);
    const categoryDropdownRef = useRef(null);

    // закрытие селектов при клике вне
    useOutsideClick([typeRef, typeDropdownRef], () => setTypeSelectOpen(false));
    useOutsideClick([categoryRef, categoryDropdownRef], () => setCategorySelectOpen(false));

    // kategoriyalarni olish
    const getAllCategory = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`/tour/type/getAll`);
            setCategories(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // yuborish
    const handleSend = async (tab) => {
        try {
            if (tab === "all") {
                await $api.post(
                    `/controller/sendMessage?message=${messageAll}&type=${type}`
                );
                console.log("Yuborildi umumiy:", { messageAll, type });
            } else {
                if (!selectedCategory) return alert("Kategoriya tanlang!");
                await $api.post(
                    `/controller/sendMessage/tourType/${selectedCategory}?message=${messageCategory}`
                );
                console.log("Yuborildi kategoriya bo'yicha:", {
                    messageCategory,
                    selectedCategory,
                });
            }
            // Очистка формы после отправки
            setMessageAll("");
            setMessageCategory("");
            setSelectedCategory("");
            setType("ALL");
        } catch (err) {
            console.log(err);
        }
    };

    const getTypeLabel = (value) => {
        switch (value) {
            case "LAST_WEEK_QUITES":
                return "O'tgan hafta chiqib ketganlar";
            case "LAST_WEEK_JOINS":
                return "O'tgan hafta qo'shilganlar";
            case "ALL":
                return "Barchasi";
            default:
                return "Turini tanlang";
        }
    };

    const getCategoryLabel = (value) => {
        if (!value) return "Kategoriya tanlang";
        const category = categories.find((cat) => cat.id === value);
        return category ? category.title : "Kategoriya tanlang";
    };

    return (
        <div className="px-[20px]">
            <div className="  p-6 bg-white rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold mb-6">📨 Xabar yuborish</h1>

                <Tabs value={activeTab} onChange={(val) => setActiveTab(val)}>
                    <TabsHeader>
                        <Tab value="all">Umumiy yuborish</Tab>
                        <Tab value="category">Kategoriya bo'yicha</Tab>
                    </TabsHeader>
                    <TabsBody>
                        {/* umumiy yuborish */}
                        <TabPanel value="all" className="p-2">
                            <Textarea
                                variant="outlined"
                                label="Xabar"
                                value={messageAll}
                                onChange={(e) => setMessageAll(e.target.value)}
                                className="mb-4"
                            />

                            {/* Custom Select for Type */}
                            <div className="relative mb-4" ref={typeRef}>
                                <div
                                    className="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                    onClick={() => setTypeSelectOpen(!typeSelectOpen)}
                                >
                                    <span className={type ? "text-gray-900 font-medium" : "text-gray-500"}>
                                        {getTypeLabel(type)}
                                    </span>
                                    {typeSelectOpen ? (
                                        <ChevronUpIcon className="h-5 w-5 text-blue-500" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                            </div>

                            <DropdownPortal anchorRef={typeRef} dropdownRef={typeDropdownRef} open={typeSelectOpen}>
                                <div className="overflow-y-auto max-h-44">
                                    <div
                                        className="p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100"
                                        onClick={() => {
                                            setType("LAST_WEEK_QUITES");
                                            setTypeSelectOpen(false);
                                        }}
                                    >
                                        24 soatda chiqib ketganlar
                                    </div>
                                    <div
                                        className="p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100"
                                        onClick={() => {
                                            setType("LAST_WEEK_JOINS");
                                            setTypeSelectOpen(false);
                                        }}
                                    >
                                        24 soatda qo‘shilganlar
                                    </div>
                                    <div
                                        className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                                        onClick={() => {
                                            setType("ALL");
                                            setTypeSelectOpen(false);
                                        }}
                                    >
                                        Barchasi
                                    </div>
                                </div>
                            </DropdownPortal>

                            <Button
                                color="blue"
                                className="w-full rounded-xl mt-5 py-3 font-medium"
                                onClick={() => handleSend("all")}
                            >
                                Yuborish
                            </Button>
                        </TabPanel>

                        <TabPanel value="category" className="p-2">
                            <Textarea
                                variant="outlined"
                                label="Xabar"
                                value={messageCategory}
                                onChange={(e) => setMessageCategory(e.target.value)}
                                className="mb-4"
                            />

                            {/* Custom Select for Category */}
                            <div className="relative mb-4" ref={categoryRef}>
                                <div
                                    className="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                    onClick={() => setCategorySelectOpen(!categorySelectOpen)}
                                >
                                    <span
                                        className={selectedCategory ? "text-gray-900 font-medium" : "text-gray-500"}
                                    >
                                        {getCategoryLabel(selectedCategory)}
                                    </span>
                                    {categorySelectOpen ? (
                                        <ChevronUpIcon className="h-5 w-5 text-blue-500" />
                                    ) : (
                                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                            </div>

                            <DropdownPortal
                                anchorRef={categoryRef}
                                dropdownRef={categoryDropdownRef}
                                open={categorySelectOpen}
                            >
                                <div className="overflow-y-auto max-h-56">
                                    {loading ? (
                                        <div className="p-3 text-center text-gray-500">Yuklanmoqda...</div>
                                    ) : (
                                        <>
                                            <div
                                                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100"
                                                onClick={() => {
                                                    setSelectedCategory("");
                                                    setCategorySelectOpen(false);
                                                }}
                                            >
                                                Kategoriya tanlang
                                            </div>
                                            {categories.map((cat) => (
                                                <div
                                                    key={cat.id}
                                                    className="p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                                    onClick={() => {
                                                        setSelectedCategory(cat.id);
                                                        setCategorySelectOpen(false);
                                                    }}
                                                >
                                                    {cat.title}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </DropdownPortal>

                            <Button
                                color="green"
                                className="w-full rounded-xl mt-5 py-3 font-medium"
                                onClick={() => handleSend("category")}
                                disabled={!selectedCategory}
                            >
                                Yuborish
                            </Button>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    );
}
