// TableStatus.js
export const TABLE_STATUS = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  ORDERED: "ordered",
  BILL_PENDING: "bill_pending",
};

export const TABLE_STATUS_UI = {
  available: {
    label: "Available",
    color: "border-green-500 text-green-400",
    dot: "bg-green-500",
  },
  occupied: {
    label: "Occupied",
    color: "border-yellow-500 text-yellow-400",
    dot: "bg-yellow-500",
  },
  ordered: {
    label: "Ordered",
    color: "border-blue-500 text-blue-400",
    dot: "bg-blue-500",
  },
  bill_pending: {
    label: "Bill Pending",
    color: "border-red-500 text-red-400",
    dot: "bg-red-500",
  },
};
