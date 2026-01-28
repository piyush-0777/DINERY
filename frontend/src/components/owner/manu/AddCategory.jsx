import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryThunk , editCategoryThunk } from '../../../redux/thunks/manuThunk'
import { toast } from "react-toastify";
import { resetAddCategoryState } from "../../../redux/features/food/addCategorySlice";
import { useRef } from "react";


const AddCategory = ({ onClose, editingCategory }) => {
    console.log(editingCategory)
    const dispatch = useDispatch()
    const toastShown = useRef(false);
    const { reqtyp, loading, success, error } = useSelector(state => state.addcategory)
    console.log({ reqtyp, loading, success, error })

    const [name, setName] = useState(() => {
        if (editingCategory) {
            return editingCategory.name
        } else {
            return ""
        }
    });
    const [image, setImage] = useState(() => {
        if (editingCategory) {
            return editingCategory.image
        } else {
            return null
        }
    });
    const [preview, setPreview] = useState(() => {
        if (editingCategory) {
            return editingCategory.image
        } else {
            return null
        }
    });

    useEffect(() => {
    toastShown.current = false;
}, [editingCategory]);

    useEffect(() => {
        if ( reqtyp === 'edit') {

            if (success && !toastShown.current) {
                toastShown.current = true;

                toast.success(
                    editingCategory
                        ? "Category updated successfully"
                        : "Category added successfully"
                );

                dispatch(resetAddCategoryState());
                onClose();
            }

            if (error) {
                toast.error(error.message || "Something went wrong");
                dispatch(resetAddCategoryState());
            }
        }
    }, [success, error]);




    const handleImageChange = (e) => {

        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error('Category name is required');
            return;
        }

        if (!editingCategory && !image) {
            toast.error('Image is required');
            return;
        }

        const formData = new FormData();
        formData.append("name", name);

        // only send image if user selected a new one
        if (image instanceof File) {
            formData.append("image", image);
        }

        if (editingCategory) {
            await dispatch(
                editCategoryThunk({
                    id: editingCategory._id,
                    data: formData
                })
            );
        } else {
            await dispatch(addCategoryThunk(formData));
        }
    };

    //fpicall

return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md">
            <button
                onClick={onClose}
                disabled={loading}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition disabled:opacity-50"
            >
                ✕
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">
                Add Category
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Name */}
                <div>
                    <label className="block text-sm text-gray-400 mb-1">
                        Category Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Starters"
                        className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm text-gray-400 mb-1">
                        Category Image
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-gray-300 hover:bg-neutral-700 transition">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-16 h-16 rounded-xl object-cover border border-neutral-700"
                            />
                        )}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-2 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : "Add Category"}
                </button>
            </form>
        </div>
    </div>
);
};

export default AddCategory;
