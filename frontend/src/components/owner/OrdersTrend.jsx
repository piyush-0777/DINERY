import { useSelector } from "react-redux";

export const OrdersTrend = () => {
    // dummy static bars (simple visual)
      const {Last7DaysOrders} = useSelector((state) => state.restaurant)
    console.log(Last7DaysOrders);
    const maxOrders = Last7DaysOrders.reduce((max, curr) => {
        return curr.orders > max.orders ? curr : max;
    }, Last7DaysOrders[0]).orders;


    return (
        <div className="bg-neutral-900 flex flex-col justify-between gap-2 rounded-2xl p-5 min-h-full">
            <h3 className="text-white font-semibold mb-4">Orders (Last 7 Days)</h3>
            <div className="flex items-end gap-3 min-h-fit">
                {Last7DaysOrders.map((item, i) => {
                    // convert orders to pixel height (0–128px)
                    const heightPx = (item.orders / maxOrders) * 128;

                    return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end">
                            <div
                                className="w-1/2 rounded-md bg-gradient-to-t from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 transition-all duration-300"
                                style={{ height: `${heightPx}px` }}
                            />
                            <span className="text-gray-400 text-xs mt-2">{item.day}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};