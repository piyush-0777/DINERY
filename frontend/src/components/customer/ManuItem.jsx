import { useDispatch } from "react-redux";
import { dicresContityOfOrder, incresContityOfOrder } from "../../redux/features/customer/customerSlice";

const ManuItem = ({ food, addOrder, customerOrder }) => {

  const dispatch = useDispatch();

  const orderItem = customerOrder.items.find(
    item => item.food === food._id
  );

  const quantity = orderItem ? orderItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex gap-4 p-4">
      
      {/* 🍔 Food Image */}
      <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={food.foodImg}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* 📄 Food Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {food.name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {food.description}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{food.price}
            </span>

            {!food.isAvailable && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                Not Available
              </span>
            )}
          </div>
        </div>

        {/* 🛒 Add / Quantity Controller */}
        {food.isAvailable && (
          <div className="mt-3">
            {quantity === 0 ? (
              <button
              id={food._id}
                onClick={() => dispatch(addOrder(food._id))}
                className="border border-green-600 text-green-600 font-semibold px-5 py-1 rounded-lg hover:bg-green-600 hover:text-white transition-all"
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center gap-3 border border-green-600 rounded-lg px-3 py-1 w-fit">
                <button
                  onClick={() => dispatch(dicresContityOfOrder(food._id))}
                  className="text-green-600 text-xl font-bold hover:scale-110 transition"
                >
                  −
                </button>

                <span className="font-semibold text-gray-800">
                  {quantity}
                </span>

                <button
                  onClick={() => dispatch(incresContityOfOrder(food._id))}
                  className="text-green-600 text-xl font-bold hover:scale-110 transition"
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManuItem;
