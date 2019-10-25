import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

app.get('/*', (req: express.Request, res: express.Response) => {
  res.send('Welcome to Happy Air APIs!');
});

app.listen(5000, () => {
  console.log(`Server is running at port 5000`);
});