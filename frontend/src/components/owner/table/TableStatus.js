// TableStatus.js
export const TABLE_STATUS = {  //"available","active","occupied"
  AVAILABLE: "available",
  ACTIVE: "active",
  OCCUPIED: "occupied",
 
};

export const TABLE_STATUS_UI = {
  available: {
    label: "Available",
    color: "border-green-500 text-green-400",
    dot: "bg-green-500",
  },
  active: {
    label: "Occupied",
    color: "border-yellow-500 text-yellow-400",
    dot: "bg-yellow-500",
  },
  occupied: {
    label: "Ordered",
    color: "border-blue-500 text-blue-400",
    dot: "bg-blue-500",
  },
};
