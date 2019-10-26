import express from 'express';
import cors from 'cors';
import FeedbackController from './controllers/FeedbackController';
// import { Question, Questions } from './types';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/feedbacks', FeedbackController);

app.get('/*', (req, res) => {
    console.log('hi');

    res.send('Welcome to Happy Air APIs!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    // const arr = await Object.keys(ratings).map(async q => {
    // 	const res = await feedbackly.get(`/questions/${q}`);
    // 	const question = res.data as Question;
    // 	const choices = question.choices!.map(choice => ({
    // 		id: choice.id,
    // 		text: choice.text,
    // 		rating: ratings[q][choice.id],
    // 	}));
    // 	console.log({
    // 		id: q,
    // 		heading: {
    // 			fi: question.heading.fi
    // 		},
    // 		choices,
    // 	})
    // });
    console.log('Server is running at port 3000');
});