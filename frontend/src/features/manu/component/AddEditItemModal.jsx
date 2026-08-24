import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateFood } from "../hooks/useUpdateFood";
import { useAddFood } from "../hooks/useAddFood";

const AddEditItemModal = ({
  categories,
  activeCategory,
  onClose,
  editingItem,
}) => {

  const updateFood = useUpdateFood();
  const addFood = useAddFood();


  const loading = updateFood.loading || addFood.loading

  
  const [form, setForm] = useState(() => {
    if (editingItem) {
      return {
        name: editingItem.name,
        foodImg: editingItem.foodImg, // File object (for multer)
        previewImg: editingItem.foodImg, // UI preview only
        description: editingItem.description,
        price: editingItem.price,
        category: activeCategory._id,
        isAvailable: true,
      };
    } else {
      return {
        name: "",
        foodImg: null, // File object (for multer)
        previewImg: null, // UI preview only
        description: "",
        price: null,
        category: activeCategory._id,
        isAvailable: true,
      };
    }
  });

  const handleSubmit = async () => {
    // Validation
    if (!form.name?.trim()) {
      toast.error("Food name is required");
      return;
    }

    if (!form.description?.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    if (!form.category?.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!(form.foodImg instanceof File) && !editingItem) {
      toast.error("Food image is required");
      return;
    }

    // Create FormData after validation
    const formData = new FormData();

    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("isAvailable", form.isAvailable);

    if (form.foodImg instanceof File) {
      formData.append("image", form.foodImg);
    }
    try {
      let result;
      if (editingItem) {
        result = await updateFood.updateFood({
          id: editingItem._id,
          data: formData,
        });
      } else {
        result = await addFood.addFood(formData);
      }
      toast.success(
        editingItem
          ? "Food item updated successfully"
          : "Food item saved successfully",
      );
      onClose();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-white font-semibold text-lg mb-5">
          {" "}
          {editingItem ? "Edit Food Item" : "Add Food Item"}
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Food name"
            value={form.name}
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
            value={form.description}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:border-yellow-400 outline-none"
            rows={3}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            value={form.price}
            placeholder="Price"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-white focus:border-yellow-400 outline-none"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <select
            value={form.category}
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
            onClick={handleSubmit}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-xl font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Saving..." : editingItem ? "Update Item" : "Save Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditItemModal;
