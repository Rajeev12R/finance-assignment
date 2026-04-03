import { getSummaryService, getCategoryBreakdownService, getMonthlyTrendsService, getRecentActivityService } from "./dashboard.service.js";

const getSummary = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getSummaryService(req.user, { startDate, endDate });
        res.status(200).json({success: true, data});
    } catch (err) {
        next(err);
    }
};

const getCategoryBreakdown = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getCategoryBreakdownService(req.user, { startDate, endDate });
        res.status(200).json({success: true, data});
    } catch (err) {
        next(err);
    }
};

const getMonthlyTrends = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await getMonthlyTrendsService(req.user, { startDate, endDate });
        res.status(200).json({success: true, data});
    } catch (err) {
        next(err);
    }
};

const getRecentActivity = async (req, res, next) => {
    try {
        const data = await getRecentActivityService(req.user);
        res.status(200).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

export {getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentActivity};