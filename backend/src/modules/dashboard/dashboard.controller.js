import { getSummaryService, getCategoryBreakdownService, getMonthlyTrendsService} from "./dashboard.service.js";

const getSummary = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getSummaryService(req.user, { startDate, endDate });
        res.status(200).json({success: true, data});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

const getCategoryBreakdown = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getCategoryBreakdownService(req.user, { startDate, endDate });
        res.status(200).json({success: true, data});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

const getMonthlyTrends = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getMonthlyTrendsService(req.user, { startDate, endDate });
        res.status(200).json({success: true, data});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

export {getSummary, getCategoryBreakdown, getMonthlyTrends};