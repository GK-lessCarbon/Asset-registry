import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import assetsRouter from './routes/assets';
import usersRouter from './routes/users';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use('/api/assets', assetsRouter);
app.use('/api/users', usersRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
