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

export interface Rating {
    rating: number,
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
}

export interface ChannelAPI {
    name: string,
    id: string,
}

export type RoomAPI = ChannelAPI;

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
