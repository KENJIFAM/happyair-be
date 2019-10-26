import { AnswerAPI, Rating } from '../types';
import { ratings } from './constants';

export const getRatingFromSingleAnswer = (answer: AnswerAPI): number =>
    answer.question_type === 'Slider'
        ? (1 - answer.value[0].data) * 5 // NEED TO CHECK AGAIN: REVERSE OR NOT
        : ratings[answer.question_id][answer.value[0]];

export const getAverageRatingFromAnswers = (answers: AnswerAPI[]): number =>
    answers.map(answer => getRatingFromSingleAnswer(answer))
        .reduce((pre, cur) => pre + cur, 0) / answers.length;

export const getAverageRatingFromFeedbacks = (ratings: Rating[]): number =>
    ratings.map(r => r.rating)
        .reduce((pre, cur) => pre + cur, 0) / ratings.length;

export const getFilteredRatings = (ratings: Rating[], limit: number): Rating[] =>
    ratings.filter(r => r.rating >= limit);
