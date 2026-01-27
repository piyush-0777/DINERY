import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import CategoryTabs from "../../components/owner/manu/CategoryTabs";
import MenuItemCard from "../../components/owner/manu/MenuItemCard";
import AddEditItemModal from "../../components/owner/manu/AddEditItemModal";
import AddCategory from "../../components/owner/manu/AddCategory";

import { resetAddFoodState } from "../../redux/features/food/loadFoodSlice";
import { resetAddCategoryState } from "../../redux/features/food/addCategorySlice";
import { deletFoodThunk, deletCategoryThunk } from "../../redux/thunks/manuThunk";

const OwnerMenu = () => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.foodObject.category);
    const items = useSelector(state => state.foodObject.foods);

    const foodStatus = useSelector(state => state.loadfoodstatus);
    const categoryStatus = useSelector(state => state.addcategory);

    const [activeCategory, setActiveCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState(null);

    // 🔹 set default category
    useEffect(() => {
        if (categories?.length && !activeCategory) {
            setActiveCategory(categories[0]);
        }
    }, [categories]);

    // 🔹 derived items (NO STATE)
    const filteredItems = useMemo(() => {
        if (!activeCategory || activeCategory.name === "All") return items;
        return items.filter(item => item.category === activeCategory._id);
    }, [items, activeCategory]);

    // 🔹 food delete/edit feedback
    useEffect(() => {
        if (!foodStatus.success) return;

        if (foodStatus.reqtype === "deletfood") {
            toast.success("Food deleted successfully");
        }

        dispatch(resetAddFoodState());
    }, [foodStatus.success, foodStatus.reqtype]);

    // 🔹 category delete/edit feedback
    useEffect(() => {
        if (!categoryStatus.success) return;

        if (categoryStatus.reqtyp === "delete") {
            toast.success("Category deleted successfully");
        }

        dispatch(resetAddCategoryState());
    }, [categoryStatus.success, categoryStatus.reqtype]);

    //on delete item

    const onDeleteItem = async (id) => {
        if (!window.confirm("Do you want to delete this item?")) return;
        setDeletingItemId(id);
        dispatch(deletFoodThunk(id));
    };

    // on edit item

     const onEditItem = async (id) => {

    }

    // on delete category

    const onDeleteCategory = async (id) => {
        if (!window.confirm("Deleting category will delete all foods. Continue?")) return;
        setDeletingCategoryId(id);
        dispatch(deletCategoryThunk(id));
    };

   

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-white">Menu</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-xl font-medium"
                >
                    + Add Food
                </button>
            </div>

            <div className="flex gap-4 mb-6 overflow-x-auto">
                {categories.map(cat => (
                    <CategoryTabs
                        key={cat._id}
                        category={cat}
                        active={activeCategory?._id === cat._id}
                        onClick={() => setActiveCategory(cat)}
                        onDelete={onDeleteCategory}
                        deletingId={deletingCategoryId}
                    />
                ))}

                <button
                    onClick={() => setShowAddCategory(true)}
                    className="min-w-[120px] h-28 rounded-2xl border border-dashed border-neutral-700 flex flex-col items-center justify-center text-gray-400 hover:text-yellow-400"
                >
                    <span className="text-2xl">+</span>
                    <span className="text-xs mt-1">Add Category</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map(item => (
                    <MenuItemCard
                        key={item._id}
                        item={item}
                        onToggleAvailability={() =>
                           console.log('this this')
                        }
                        onEdit={() => onEditItem(item)}
                        onDelete={onDeleteItem}
                        deletingId={deletingItemId}
                    />

                ))}
            </div>

            {showModal && (
                <AddEditItemModal
                    categories={categories}
                    activeCategory={activeCategory}
                    onClose={() => setShowModal(false)}
                />
            )}

            {showAddCategory && (
                <AddCategory onClose={() => setShowAddCategory(false)} />
            )}
        </div>
    );
};

export default OwnerMenu;
