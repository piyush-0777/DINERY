import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addFoodThunk } from '../../../redux/thunks/manuThunk'
import { resetAddFoodState } from '../../../redux/features/food/loadFoodSlice'
import { toast } from "react-toastify";

const AddEditItemModal = ({ categories, activeCategory, onClose }) => {
    const dispatch = useDispatch();
    const { reqtype, loading, success, error, } = useSelector(state => state.loadfoodstatus);

    useEffect(() => {
        if (reqtype == 'addfood') {
            if (error) {
                toast.error(error.message || "Something went wrong");
                dispatch(resetAddFoodState())
                onClose();
            }

            if (success) {
                toast.success("Food item saved successfully");
                dispatch(resetAddFoodState())
                onClose();
            }
        }
    }, [error, success]);

    const [form, setForm] = useState({
        name: "",
        foodImg: null,          // File object (for multer)
        previewImg: null,       // UI preview only
        description: "",
        price: "",
        category: activeCategory._id,
        isAvailable: true,
    });


    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg">
                <h2 className="text-white font-semibold text-lg mb-5">Add Food Item</h2>


                <div className="space-y-3">
                    <input
                        placeholder="Food name"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:border-yellow-400 outline-none"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />


                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-gray-300 hover:border-yellow-400 transition">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    setForm({
                                        ...form,
                                        foodImg: file,
                                        previewImg: URL.createObjectURL(file),
                                    });
                                }}
                            />
                        </label>

                        {form.previewImg && (
                            <img
                                src={form.previewImg}
                                alt="preview"
                                className="w-16 h-16 rounded-xl object-cover border border-neutral-800"
                            />
                        )}
                    </div>

                    <textarea
                        placeholder="Description"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:border-yellow-400 outline-none"
                        rows={3}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />


                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:border-yellow-400 outline-none"
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />


                    <select
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:border-yellow-400 outline-none"
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                        <input
                            type="checkbox"
                            checked={form.isAvailable}
                            onChange={(e) =>
                                setForm({ ...form, isAvailable: e.target.checked })
                            }
                        />
                        Available
                    </label>
                </div>


                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={() => {
                            const formData = new FormData();
                            formData.append("name", form.name);
                            formData.append("image", form.foodImg);
                            formData.append("description", form.description);
                            formData.append("price", form.price);
                            formData.append("category", form.category);
                            formData.append("isAvailable", form.isAvailable);

                            dispatch(addFoodThunk(formData));
                        }}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-xl font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? "Saving..." : "Save Item"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddEditItemModal