import FinancialRecord from "../financialRecord/FinancialRecord.js";

const buildFilters = (user, filters) => {
    const { startDate, endDate } = filters;
    const match = {};

    if (user.role !== "admin") {
        match.createdBy = user._id;
    }

    if (startDate || endDate) {
        match.date = {};
        if (startDate) match.date.$gte = new Date(startDate);
        if (endDate) match.date.$lte = new Date(endDate);
    }

    return match;
};

const getSummaryService = async (user, filters) => {
    const match = buildFilters(user, filters);

    const summary = await FinancialRecord.aggregate([
        { $match: match },
        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount" }
            }
        }
    ]);
    let totalIncome = 0;
    let totalExpense = 0;
    summary.forEach(item => {
        if (item._id === "income") totalIncome = item.total;
        if (item._id === "expense") totalExpense = item.total;
    })

    return {
        totalIncome, totalExpense, netBalance: totalIncome - totalExpense
    }
}

const getCategoryBreakdownService = async (user, filters) => {
    const match = buildFilters(user, filters);

    return await FinancialRecord.aggregate([
        { $match: match },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                total: 1
            }
        }
    ])
}

const getMonthlyTrendsService = async (user, filters) => {
    const match = buildFilters(user, filters);

    return FinancialRecord.aggregate([
        { $match: match },
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    type: "$type"
                },
                total: { $sum: "$amount" }
            }
        },
        {
            $group: {
                _id: {
                    year: "$_id.year",
                    month: "$_id.month"
                },
                income: {
                    $sum: {
                        $cond: [
                            { $eq: ["$_id.type", "income"] },
                            "$total",
                            0
                        ]
                    }
                },
                expense: {
                    $sum: {
                        $cond: [
                            { $eq: ["$_id.type", "expense"] },
                            "$total",
                            0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                month: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: {
                            $dateFromParts: {
                                year: "$_id.year",
                                month: "$_id.month"
                            }
                        }
                    }
                },
                income: 1,
                expense: 1
            }
        },
        {
            $sort: { month: 1 }
        }
    ])
}

const getRecentActivityService = async (user, limit = 5) => {
    const match = buildFilters(user, {});
    return await FinancialRecord.find(match)
        .sort({ date: -1, createdAt: -1 })
        .limit(limit);
}

export { getSummaryService, getCategoryBreakdownService, getMonthlyTrendsService, getRecentActivityService };