import { useDispatch } from "react-redux";
import { dicresContityOfOrder, incresContityOfOrder } from "../../redux/features/customer/customerSlice";

const ManuItem = ({ food, addOrder, customerOrder }) => {

  const dispatch = useDispatch();

  const orderItem = customerOrder.items.find(
    item => item.food === food._id
  );

  const quantity = orderItem ? orderItem.quantity : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between">
      <div>
        <h3 className="font-semibold">{food.name}</h3>
        <p className="text-gray-600">₹{food.price}</p>
      </div>

      <button
        id={food._id}
        onClick={addOrder}
        className="bg-green-600 text-white px-4 py-1 rounded"
      >
        {quantity === 0 ? "ADD" : quantity}
      </button>
    </div>
  );
};

export default ManuItem;
