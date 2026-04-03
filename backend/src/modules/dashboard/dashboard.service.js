import FinancialRecord from "../financialRecord/FinancialRecord.js";

const getSummaryService = async () => {
    const summary = await FinancialRecord.aggregate([
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

const getCategoryBreakdownService = async () => {
    return await FinancialRecord.aggregate([
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

const getMonthlyTrendsService = async () => {
    return FinancialRecord.aggregate([
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
                    $concat: [
                        { $toString: "$_id.year" },
                        "-",
                        { $toString: "$_id.month" }
                    ]
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

export { getSummaryService, getCategoryBreakdownService, getMonthlyTrendsService }; 