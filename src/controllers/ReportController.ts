import express from 'express';
import moment from 'moment';
import { RoomsQuery, FeedbacklyAPI, Rating, NuukaReportAPI } from '../types';
import { getRoomsInfo } from '../utils';
import { getMeasurementDataByIDs } from '../services/nuuka';
import feedbackly from '../services/feedbackly';
import {
    getAverageRatingFromFeedbacks,
    getRatingDetailFromAnswers,
} from '../utils';
import { surveyId } from '../utils/constants';

const router = express.Router();

// @GET rooms?id={room-id}&data={co2}&startTime={Timestamp}&endTime={Timestamp}&groupby={day}
router.get('/', async (req, res) => {
    try {
        const { id, data, startTime, endTime } = req.query as RoomsQuery;

        const rooms = await getRoomsInfo();

        if (id) {
            const room = rooms.find(r => r.id === id);
            if (room) {
                const result = await getMeasurementDataByIDs({ dataPointIds: room[data!], startTime: new Date(<any>startTime * 1000).toISOString(), endTime: new Date(<any>endTime * 1000).toISOString() })
                    .then(res => res.data as NuukaReportAPI[]);

                // create object with dates as unique keys
                const response = {};
                result.forEach(entry => {
                    let time = moment(entry.Timestamp).format('YYYY-MM-DD');
                    if (!response[time])
                        response[time] = {'total' : 0, 'count': 0, 'feedbacks': []};
                    response[time].total += entry.Value;
                    response[time].count += 1;
                });

                // get all feedbacks
                const feedbacks = await feedbackly
                    .get(`/feedbacks?survey_id=${surveyId}&channel_id=${id}&date_from=${startTime}&date_to=${endTime}`)
                    .then(res => res.data.data as FeedbacklyAPI[]);

                // push feedbacks to correct date in object
                feedbacks.forEach(entry => {
                    let time = moment(entry.created_at).format('YYYY-MM-DD');
                    response[time].feedbacks.push(entry);
                });

                // form return response
                const returnValue = {};
                returnValue['room'] = id;
                returnValue['type'] = data;
                returnValue['data'] = [];

                for (let [key, value] of Object.entries(response) as any) {
                    const average: number = value.total / value.count;
                    const dateFeedbacks = value.feedbacks;
                    if (dateFeedbacks) {
                        const ratings: Rating[] = dateFeedbacks!.map((feedback: any) => ({
                            timestamp: new Date(feedback.created_at).getTime(),
                            id: feedback.id,
                            ...getRatingDetailFromAnswers(feedback.data),
                        }));
                        const averageRating = getAverageRatingFromFeedbacks(ratings).toFixed(2);
                        const obj = {};
                        obj['collected_time'] = key;
                        obj['rating'] = parseFloat(averageRating);
                        obj['value'] = Math.round(average * 100) / 100;
                        returnValue['data'].push(obj);
                    }
                }

                return res.status(200).json(returnValue);
            }
        }
        return res.status(200).json([ ...rooms ]);
    } catch (err) {
        return res.status(500).send('There was a problem finding rooms.' + err);
    }
});

export default router;
