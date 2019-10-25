import axios from 'axios';
import { FEEDBACKLY_TOKEN } from '../utils/secrets';

export default axios.create({
    baseURL: 'https://api.feedbackly.com/v1',
    headers: {
        Authorization: `JWT ${FEEDBACKLY_TOKEN}`,
    },
});
