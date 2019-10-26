import express from 'express';
import cors from 'cors';
import FeedbackController from './controllers/FeedbackController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/feedbacks', FeedbackController);

app.get('/*', (req, res) => {
    res.send('Welcome to Happy Air APIs!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running at port 3000');
});
