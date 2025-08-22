import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function LinksCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        tourTypeId: "",
        link: "",
    });
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const GetAllCategory = async () => {
        try {
            setLoading(true);
            const response = await $api.get(`tour/type/getAll`);
            setCategoryData(response?.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            GetAllCategory();
        }
    }, [open]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (value) => {
        setForm({ ...form, tourTypeId: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await $api.post(`/join/link/create`, { tourTypeId: form?.tourTypeId, link: form?.link })
            Alert("Muvaffaqiyatli qo'shildi", "success");
            handleOpen();
            refresh()
            setForm({
                tourTypeId: "",
                link: "",
            });
        } catch (error) {
            Alert(`Xatolik: ${error}`, "error");
        }
    };

    // Get selected category title for display
    const getSelectedCategoryTitle = () => {
        const selectedCategory = categoryData.find(cat => cat.id.toString() === form.tourTypeId);
        return selectedCategory ? selectedCategory.title : "";
    };

    return (
        <>
            <Button onClick={handleOpen} color="green">
                Create Link
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Create Link</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Select
                        label="Tour Type"
                        onChange={handleSelect}
                        disabled={loading}
                    >
                        {loading ? (
                            <Option disabled>Loading...</Option>
                        ) : categoryData.length > 0 ? (
                            categoryData.map((category) => (
                                <Option
                                    key={category.id}
                                    value={category.id.toString()}
                                >
                                    {category.title}
                                </Option>
                            ))
                        ) : (
                            <Option disabled>No categories available</Option>
                        )}
                    </Select>

                    <Input
                        label="Link"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        Cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleSubmit}
                        disabled={!form.tourTypeId || !form.link}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}