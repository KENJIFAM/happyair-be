import { AnswerAPI, Rating, RatingDetail, ChannelAPI, MeasurementInfoAPI, RoomAPI, MeasurementUnit } from '../types';
import { ratingsMap } from './constants';
import feedbackly from '../services/feedbackly';
import { getMeasurementInfo } from '../services/nuuka';

export const getRatingFromSingleAnswer = (answer: AnswerAPI): number =>
    answer.question_type === 'Slider'
        ? (1 - answer.value[0].data) * 4 + 1 // NEED TO CHECK AGAIN: REVERSE OR NOT
        : ratingsMap[answer.question_id].data![answer.value[0]].value;

export const getRatingDetailFromAnswers = (answers: AnswerAPI[]): RatingDetail => ({
    rating: +(answers
        .map(answer => getRatingFromSingleAnswer(answer))
        .reduce((pre, cur) => pre + cur, 0) / answers.length)
        .toFixed(2),
    ...answers.reduce((obj, answer) => {
        obj[ratingsMap[answer.question_id].title] = {
            value: +getRatingFromSingleAnswer(answer).toFixed(2),
            answer: answer.question_type === 'Word' &&
                ratingsMap[answer.question_id].data![answer.value[0]].answer || undefined,
        };
        return obj;
    }, {}),
});

export const getAverageRatingFromFeedbacks = (ratings: Rating[]): number =>
    ratings.map(r => r.rating)
        .reduce((pre, cur) => pre + cur, 0) / ratings.length;

export const getFilteredRatings = (ratings: Rating[], limit: number): Rating[] =>
    ratings.filter(r => r.rating <= limit);

export const getRoomsInfo = async () => {
    const channels = await feedbackly.get('/channels')
        .then(res => res.data as ChannelAPI[]);
    const measurementInfo = await getMeasurementInfo()
        .then(res => res.data as MeasurementInfoAPI[]);

    const rooms: RoomAPI[] = channels
        .filter(channel =>
            channel.name.includes('Kaisaniemen ala-aste') &&
            !channel.name.includes('124') &&
            !channel.name.includes('509'))
        .map(channel => {
            const room = channel.name.slice(-3);
            const co2Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_co2`));
            const humidityInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_humidity`));
            const pm1Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_mass_pm1`));
            const pm10Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_mass_pm10`));
            const pm2_5Info = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_mass_pm2_5`));
            const temperatureInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_temperature`));
            const tvocInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_tvoc`));
            const pressureDiffInfo = measurementInfo.find(m => m.Name && m.Name.includes(`${room}_pressureDiff`));
            return {
                id: channel.id,
                name: {
                    en: `Room ${room}`,
                    fi: `Luokka ${room}`,
                },
                co2: co2Info && co2Info.DataPointID,
                humidity: humidityInfo && humidityInfo.DataPointID,
                pm1: pm1Info && pm1Info.DataPointID,
                pm10: pm10Info && pm10Info.DataPointID,
                pm2_5: pm2_5Info && pm2_5Info.DataPointID,
                temperature: temperatureInfo && temperatureInfo.DataPointID,
                tvoc: tvocInfo && tvocInfo.DataPointID,
                pressureDiff: pressureDiffInfo && pressureDiffInfo.DataPointID,
            };
        });
    return [ ...rooms ];
};
