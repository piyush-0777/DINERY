const billRepository = require("../repositories/billRepository");

const getLast7Days = () => {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 7);
  return { today, past };
};

const getYearDates = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  return { start, end };
};

class ReportService {
  async getCustomerReportService(restaurantId) {
    const { today, past } = getLast7Days();
    return await billRepository.getCustomerReport(restaurantId, {
      start: past,
      end: today,
    });
  }

  async getDailySaleReportService(restaurantId) {
    const { today, past } = getLast7Days();
    return await billRepository.getDailySaleReport(restaurantId, {
      start: past,
      end: today,
    });
  }

  async getGSTReportService(restaurantId) {
    const { start, end } = getYearDates();
    return await billRepository.getGSTReport(restaurantId, {
      start,
      end,
    });
  }

  async getMonthlyRevenueReportService(restaurantId) {
    const { start, end } = getYearDates();
    return await billRepository.getMonthlyRevenueReport(restaurantId, {
      start,
      end,
    });
  }
}

module.exports = new ReportService();