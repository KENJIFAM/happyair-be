import express from 'express';
import feedbackly from '../services/feedbackly';
import { FeedbackQuery, FeedbacklyAPI, Rating } from '../types';
import { getAverageRatingFromAnswers, getRatingFromSingleAnswer, getAverageRatingFromFeedbacks } from '../utils/feedbacks';

const surveyId = '5c072aebf6466b0a4e4b696b';

const router = express.Router();

// @GET feedbacks?room={room-id}&limit-point=2.5&start-time=timestamp&end-time=<>
router.get('/', async (req, res) => {
    try {
        const { room, limitPoint, startTime, endTime } = req.query as FeedbackQuery;
        const dateFrom = startTime && Math.round(parseInt(startTime) / 1000) || undefined;
        const dateTo = endTime && Math.round(parseInt(endTime) / 1000) || undefined;

        const channelIdQuery = room && `&channel_id=${room}` || '';
        const dateFromQuery = dateFrom && `&date_from=${dateFrom}` || '';
        const dateToQuery = dateTo && `&date_to=${dateTo}` || '';

        const feedbacks = await feedbackly
            .get(`/feedbacks?survey_id=${surveyId}${channelIdQuery}${dateFromQuery}${dateToQuery}`)
            .then(res => res.data.data as FeedbacklyAPI[])
            .then(fbs => fbs.filter(fb => !!fb.data.find(ans => ans.question_type === 'Slider')));

        console.log(feedbacks);

        const ratings: Rating[] = feedbacks.map(feedback => ({
            ratings: feedback.data.map(ans => [ans.question_type , Math.round(getRatingFromSingleAnswer(ans) * 100) / 100]),
            rating: Math.round(getAverageRatingFromAnswers(feedback.data) * 100) / 100,
            timestamp: new Date(feedback.created_at).getTime(),
        }));

        const averageRating = Math.round(getAverageRatingFromFeedbacks(ratings) * 100) / 100;

        return res.status(200).json({
            averageRating,
            ratings,
        });
    } catch (err) {
        return res.status(500).send('There was a problem finding feedbacks.');
    }
});

export default router;
