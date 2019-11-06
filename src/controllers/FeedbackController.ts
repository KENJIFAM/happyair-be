import express from 'express';
import feedbackly from '../services/feedbackly';
import { FeedbackQuery, FeedbacklyAPI, Rating } from '../types';
import {
    getAverageRatingFromFeedbacks,
    getFilteredRatings,
    getRatingDetailFromAnswers,
    // getRatingFromSingleAnswer,
} from '../utils';
import { surveyId } from '../utils/constants';

const router = express.Router();

// @GET feedbacks?room={room-id}&limitPoint={max-rate}&startTime={timestamp}&endTime={timestamp}
router.get('/', async (req, res) => {
    try {
        const { room, limitPoint, startTime, endTime } = req.query as FeedbackQuery;
        const dateFrom = startTime && Math.round(parseInt(startTime) / 1000) || undefined;
        const dateTo = endTime && Math.round(parseInt(endTime) / 1000) || undefined;

        const channelIdQuery = room && `&channel_id=${room}` || '';
        const dateFromQuery = dateFrom && `&date_from=${dateFrom}` || '';
        const dateToQuery = dateTo && `&date_to=${dateTo}` || '';
        const limit = limitPoint && parseFloat(limitPoint) || 0;

        const feedbacks = await feedbackly
            .get(`/feedbacks?survey_id=${surveyId}${channelIdQuery}${dateFromQuery}${dateToQuery}`)
            .then(res => res.data.data as FeedbacklyAPI[]);
            // to find also feedbacks have questions 4 5
            // .then(fbs => fbs.filter(fb => !!fb.data.find(ans => ans.question_type === 'Slider')));

        const ratings: Rating[] = feedbacks.map(feedback => ({
            timestamp: new Date(feedback.created_at).getTime(),
            id: feedback.id,
            ...getRatingDetailFromAnswers(feedback.data),
            // to check questions 4 5
            // ratings: feedback.data.map(ans => [ans.question_type , +getRatingFromSingleAnswer(ans).toFixed(2)]),
        }));

        const filteredRatings = getFilteredRatings(ratings, limit);
        const averageRating = +getAverageRatingFromFeedbacks(ratings).toFixed(2);

        return res.status(200).json({
            averageRating,
            ratings: filteredRatings,
        });
    } catch (err) {
        return res.status(500).send('There was a problem finding feedbacks.');
    }
});

export default router;
