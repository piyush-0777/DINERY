const orderRepository = require("../repositories/orderRepository");
const billRepository = require("../repositories/billRepository");

function getDateRange({ type, year, month }) {
  const now = new Date();
  let start, end;

  if (type === "week") {
    end = new Date(now);
    start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  } else if (type === "month") {
    year = parseInt(year) || now.getFullYear();
    month = parseInt(month) || now.getMonth() + 1;

    start = new Date(year, month - 1, 1);
    if (year === now.getFullYear() && month === now.getMonth() + 1) {
      end = new Date(now);
    } else {
      end = new Date(year, month, 0, 23, 59, 59, 999);
    }
  } else if (type === "year") {
    year = parseInt(year) || now.getFullYear();
    start = new Date(year, 0, 1);
    if (year === now.getFullYear()) {
      end = new Date(now);
    } else {
      end = new Date(year, 11, 31, 23, 59, 59, 999);
    }
  } else {
    // Default to last 7 days
    end = new Date(now);
    start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
}

function getGroupRule(type) {
  if (type === "week") return { $dayOfWeek: "$createdAt" };
  if (type === "month")
    return { $ceil: { $divide: [{ $dayOfMonth: "$createdAt" }, 7] } };
  if (type === "year") return { $month: "$createdAt" };
  return { $dayOfWeek: "$createdAt" };
}

class AnalyticsService {
  async ordersAnalytics({ restaurantId, type, year, month, week }) {
    const { start, end } = getDateRange({ type, year, month });
    const groupRule = getGroupRule(type);

    return await orderRepository.getOrdersAnalytics(restaurantId, {
      start,
      end,
      groupRule,
    });
  }

  async revenueAnalytics({ restaurantId, type, year, month, week }) {
    const { start, end } = getDateRange({ type, year, month });
    const groupRule = getGroupRule(type);

    return await billRepository.getRevenueAnalytics(restaurantId, {
      start,
      end,
      groupRule,
    });
  }

  async topItemsAnalytics({ restaurantId, type, year, month, week }) {
    const { start, end } = getDateRange({ type, year, month });

    return await orderRepository.getTopSellingItems(restaurantId, {
      start,
      end,
      limit: 10,
    });
  }
}

module.exports = new AnalyticsService();
