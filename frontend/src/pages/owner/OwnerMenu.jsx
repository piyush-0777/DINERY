import React from 'react'
import CategoryTabs from '../../components/owner/manu/CategoryTabs'
import MenuItemCard from '../../components/owner/manu/MenuItemCard'
import AddEditItemModal from '../../components/owner/manu/AddEditItemModal'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddCategory from '../../components/owner/manu/AddCategory'


const OwnerMenu = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.foodObject.category)
    
    const [categories] = useState([
        { _id: "1", name: "Starters" },
        { _id: "2", name: "Main Course" },
        { _id: "3", name: "Drinks" },
    ]);


    const [activeCategory, setActiveCategory] = useState(category[0]);
    const [showModal, setShowModal] = useState(false);
    const [showAddCategory ,setShowAddCategory ] = useState(false)


    const [items, setItems] = useState([
        {
            _id: "101",
            name: "Paneer Tikka",
            foodImg: "https://images.unsplash.com/photo-1604908177522-402d0b7e0f6d",
            description: "Smoky grilled paneer with Indian spices",
            price: 220,
            category: "1",
            isAvailable: true,
        },
    ]);

   


    

    const filteredItems = items.filter(
        (item) => item.category === activeCategory._id
    );


    return (
        <div className="min-h-screen bg-black p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-white">Menu</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-xl font-medium hover:opacity-90"
                >
                    + Add Food
                </button>
            </div>


            <div className="flex items-center gap-4 mb-6">

                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto pr-2">
                    {category.map((cat) => (
                        <CategoryTabs
                            key={cat.c_name}
                            category={cat}
                            active={activeCategory === cat.c_name}
                            onClick={() => setActiveCategory(cat.c_name)}
                        />
                    ))}
                </div>

                {/* Add Category Button */}
                <button
                    onClick={() => setShowAddCategory(true)}
                    className="min-w-[120px] h-28 rounded-2xl border border-dashed border-neutral-700 flex flex-col items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400 transition"
                >
                    <span className="text-2xl">+</span>
                    <span className="text-xs mt-1">Add Category</span>
                </button>

            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                    <MenuItemCard
                        key={item._id}
                        item={item}
                        onToggleAvailability={() =>
                            setItems((prev) =>
                                prev.map((i) =>
                                    i._id === item._id
                                        ? { ...i, isAvailable: !i.isAvailable }
                                        : i
                                )
                            )
                        }
                        onDelete={() =>
                            setItems((prev) => prev.filter((i) => i._id !== item._id))
                        }
                    />
                ))}
            </div>


            {showModal && (
                <AddEditItemModal
                    categories={category}
                    activeCategory={activeCategory}
                    onClose={() => setShowModal(false)}
                    
                />
            )}

            {showAddCategory && (
                <AddCategory
                    
                    onClose={() => setShowAddCategory(false)}
                />
            )}
        </div>
    )
}

export default OwnerMenu
