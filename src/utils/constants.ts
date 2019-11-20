import { RatingsMap, MeasurementUnit } from '../types';

export const ratingsMap: RatingsMap = {
    '5c072c0d7af0f18c829fdfe0': { // question 1: temperature
        title: 'temperature',
        data: {
            '5c072aee7af0f18c829fdfd6': {
                value: 1,
                answer: {
                    en: 'hot',
                    fi: 'KUUMA',
                },
            },
            '5c072c287af0f18c829fdfe4': {
                value: 4,
                answer: {
                    en: 'quite cool',
                    fi: 'HIEMAN VIILEÄ',
                },
            },
            '5c072c117af0f18c829fdfe1': {
                value: 5,
                answer: {
                    en: 'warm',
                    fi: 'LÄMMIN',
                },
            },
            '5c072cf27af0f18c829fdfe6': {
                value: 5,
                answer: {
                    en: 'cool',
                    fi: 'VIILEÄ',
                },
            },
            '5c072c157af0f18c829fdfe2': {
                value: 4,
                answer: {
                    en: 'quite warm',
                    fi: 'HIEMAN LÄMMIN',
                },
            },
            '5c072cef7af0f18c829fdfe5': {
                value: 1,
                answer: {
                    en: 'cold',
                    fi: 'KYLMÄ',
                },
            },
            '5c072c167af0f18c829fdfe3': {
                value: 3,
                answer: {
                    en: 'suitable',
                    fi: 'SOPIVA',
                },
            },
        },
    },
    '5c072d437af0f18c829fdfe7': { // question 2: freshness
        title: 'freshness',
        data: {
            '5c072aee7af0f18c829fdfd6': {
                value: 5,
                answer: {
                    en: 'fresh',
                    fi: 'RAIKAS',
                },
            },
            '5c072d9a7af0f18c829fdfe8': {
                value: 4,
                answer: {
                    en: 'quite fresh',
                    fi: 'MELKO RAIKAS',
                },
            },
            '5c072d9b7af0f18c829fdfe9': {
                value: 3,
                answer: {
                    en: 'normal',
                    fi: 'EI RAIKAS EIKÄ TUNKKAINEN',
                },
            },
            '5c072d9c7af0f18c829fdfea': {
                value: 2,
                answer: {
                    en: 'quite stuffy',
                    fi: 'MELKO TUNKKAINEN',
                },
            },
            '5c072d9d7af0f18c829fdfeb': {
                value: 1,
                answer: {
                    en: 'stuffy',
                    fi: 'TUNKKAINEN',
                },
            },
        },
    },
    '5c072de07af0f18c829fdfec': { // question 3: humidity
        title: 'humidity',
        data: {
            '5c072aee7af0f18c829fdfd6': {
                value: 1,
                answer: {
                    en: 'dry',
                    fi: 'KUIVA',
                },
            },
            '5c072e127af0f18c829fdfed': {
                value: 3,
                answer: {
                    en: 'quite dry',
                    fi: 'MELKO KUIVA',
                },
            },
            '5c072e1b7af0f18c829fdfee': {
                value: 5,
                answer: {
                    en: 'normal',
                    fi: 'EI KUIVA EIKÄ KOSTEA',
                },
            },
            '5c072e257af0f18c829fdfef': {
                value: 3,
                answer: {
                    en: 'quite moisture',
                    fi: 'MELKO KOSTEA',
                },
            },
            '5c072e2e7af0f18c829fdff0': {
                value: 1,
                answer: {
                    en: 'moisture',
                    fi: 'KOSTEA',
                },
            },
        },
    },
    '5c07319d7af0f18c829fdff3': { // question 6: lighting
        title: 'lighting',
        data: {
            '5c072aee7af0f18c829fdfd6': {
                value: 5,
                answer: {
                    en: 'good',
                    fi: 'HYVÄ',
                },
            },
            '5c0731b47af0f18c829fdff4': {
                value: 4,
                answer: {
                    en: 'quite good',
                    fi: 'MELKO HYVÄ',
                },
            },
            '5c0731b57af0f18c829fdff5': {
                value: 3,
                answer: {
                    en: 'normal',
                    fi: 'EI HYVÄ EIKÄ HUONO',
                },
            },
            '5c0731b67af0f18c829fdff6': {
                value: 2,
                answer: {
                    en: 'quite bad',
                    fi: 'MELKO HUONO',
                },
            },
            '5c0731b87af0f18c829fdff7': {
                value: 1,
                answer: {
                    en: 'bad',
                    fi: 'HUONO',
                },
            },
        },

    },
    '5c07321e7af0f18c829fdff8': { // question 7: sound
        title: 'sound',
        data: {
            '5c072aee7af0f18c829fdfd6': {
                value: 5,
                answer: {
                    en: 'good',
                    fi: 'HYVÄ',
                },
            },
            '5c07325d7af0f18c829fdff9': {
                value: 4,
                answer: {
                    en: 'quite good',
                    fi: 'MELKO HYVÄ',
                },
            },
            '5c07325e7af0f18c829fdffa': {
                value: 3,
                answer: {
                    en: 'normal',
                    fi: 'EI HYVÄ EIKÄ HUONO',
                },
            },
            '5c0732617af0f18c829fdffb': {
                value: 2,
                answer: {
                    en: 'quite bad',
                    fi: 'MELKO HUONO',
                },
            },
            '5c0732627af0f18c829fdffc': {
                value: 1,
                answer: {
                    en: 'bad',
                    fi: 'HUONO',
                },
            },
        },
    },
    '5c0732947af0f18c829fdffd': { // question 8: working or learning ability is in the classroom
        title: 'workingAbility',
        data: {
            '5c072aee7af0f18c829fdfd6': {
                value: 5,
                answer: {
                    en: 'good',
                    fi: 'HYVÄ',
                },
            },
            '5c07331b7af0f18c829fdffe': {
                value: 4,
                answer: {
                    en: 'quite good',
                    fi: 'MELKO HYVÄ',
                },
            },
            '5c07331c7af0f18c829fdfff': {
                value: 3,
                answer: {
                    en: 'normal',
                    fi: 'EI HYVÄ EIKÄ HUONO',
                },
            },
            '5c07331e7af0f18c829fe000': {
                value: 2,
                answer: {
                    en: 'quite bad',
                    fi: 'MELKO HUONO',
                },
            },
            '5c07331e7af0f18c829fe001': {
                value: 1,
                answer: {
                    en: 'bad',
                    fi: 'HUONO',
                },
            },
        },
    },
    '5c072e5c7af0f18c829fdff1': { // question 4: smell, 0 = no odor, 10 = strong odor
        title: 'smell',
    },
    '5c07311c7af0f18c829fdff2': { // question 5: cleanliness, 0 = no particles / dust, 10 = lots
        title: 'cleanliness',
    },
};

export const sliderQuestions = [
    '5c072e5c7af0f18c829fdff1', // question 4: smell, 0 = no odor, 10 = strong odor
    '5c07311c7af0f18c829fdff2', // question 5: cleanliness, 0 = no particles / dust, 10 = lots of particles / dust
];

export const surveyId = '5c072aebf6466b0a4e4b696b';

export const organizationId = '5bd06a081ad589125f331bbe';

export const buildingId = 2410;

export const unit: MeasurementUnit = {
    co2: 'ppm',
    humidity: '%RH',
    pm1: 'μg/m3',
    pm10: 'μg/m3',
    pm2_5: 'μg/m3',
    temperature: '°C',
    tvoc: 'ppb',
    pressureDiff: 'Pa',
};

export function groupByFunction(groupBy: any) {
    switch (groupBy) {
        case 'hour':
            return 'YYYY-MM-DD-HH';
            break;
        case 'week':
            return 'W';
            break;
        case 'month':
            return 'YYYY-MM';
            break;
        default:
            return 'YYYY-MM-DD';
    }
}
