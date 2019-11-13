export interface Locale {
    en?: string,
    fi?: string,
}

export interface Choice {
    id: string,
    text?: Locale,
    rating: number,
}

export interface Question {
    id: string,
    heading: Locale,
    subtitle?: Locale,
    choices?: Choice[],
    questionType?: string,
}

export interface Questions {
    q1: Question,
    q2: Question,
    q3: Question,
    q4: Question,
    q5: Question,
    q6: Question,
    q7: Question,
    q8: Question,
}

export interface FeedbackQuery {
    room?: string,
    limitPoint?: string,
    startTime?: string,
    endTime?: string,
}

export interface RatingDetail {
    rating: number,
    temperature?: number,
    freshness?: number,
    humidity?: number,
    smell?: number,
    cleanliness?: number,
    lighting?: number,
    sound?: number,
    workingAbility?: number,
}

export interface FeedbackMap {
    title: string,
    data?: {
        [answerId: string]: {
            value: number,
            answer: Locale,
        },
    },
}

export interface RatingsMap {
    [questionId: string]: FeedbackMap,
}

export interface Rating extends RatingDetail {
    timestamp: number,
    id: string,
}

export interface FeedbackAPI {
    ratings: Rating[],
}

export interface FeedbacklyAPI {
    created_at: Date,
    data: AnswerAPI[],
    id: string,
}

interface SliderAnswerValue {
    id: string,
    data: number,
}

interface SliderAnswer {
    value: SliderAnswerValue[],
    question_type: 'Slider',
    question_id: string,
}

interface WordAnswer {
    value: string[],
    question_type: 'Word',
    question_id: string,
}

export type AnswerAPI = SliderAnswer | WordAnswer;

export interface RoomsQuery {
    id?: string,
    data?: string,
    startTime?: string,
    endTime?: string,
    groupBy?: string
}

export interface ChannelAPI {
    name: string,
    id: string,
}

export interface RoomAPI {
    id: string,
    name: Locale,
    co2?: number,
    humidity?: number,
    pm1?: number,
    pm10?: number,
    pm2_5?: number,
    temperature?: number,
    tvoc?: number,
    pressureDiff?: number,
}

export interface IndoorConditionDataParams {
    startTime: string,
    endTime: string,
}

export interface MeasurementDataByIDsParams {
    dataPointIds: string,
    startTime: string,
    endTime: string,
}

export interface MeasurementInfoAPI {
    DataPointID: number,
    Name: string,
}

export interface ReportQuery {
    dataType: string,
    groupBy?: 'minute' | 'hour' | 'day' | 'week' | 'month',
    startTime?: string,
    endTime?: string,
}

export interface NuukaReportAPI {
    Timestamp: Date,
    Name: string,
    Description: string,
    Value: number,
    Target: any,
    DataPointID: number
}