import express from 'express';
import cors from 'cors';
import FeedbackController from './controllers/FeedbackController';
import RoomController from './controllers/RoomController';
import ReportController from './controllers/ReportController';
import HomeController from './controllers/HomeController';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/feedbacks', FeedbackController);
app.use('/rooms', RoomController);
app.use('/reports', ReportController);
app.use('/home', HomeController);

app.get('/*', (req, res) => {
    res.send('Welcome to Happy Air APIs!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server is running at port 3001');
});
