// Table status constants
export const TABLE_STATUS = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  RESERVED: "reserved",
};

// UI configuration for each status (premium black theme)
export const TABLE_STATUS_CONFIG = {
  [TABLE_STATUS.AVAILABLE]: {
    label: "Available",
    dotColor: "bg-green-500",
    ringColor: "ring-green-500/40",
    textColor: "text-green-400",
  },

  [TABLE_STATUS.OCCUPIED]: {
    label: "Occupied",
    dotColor: "bg-yellow-500",
    ringColor: "ring-yellow-500/40",
    textColor: "text-yellow-400",
  },

  [TABLE_STATUS.RESERVED]: {
    label: "Reserved",
    dotColor: "bg-red-500",
    ringColor: "ring-red-500/40",
    textColor: "text-red-400",
  },
};
