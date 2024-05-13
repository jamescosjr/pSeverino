import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import subjectRouter from './routes/subjectRouter';
import professorRouter from './routes/professorRouter';
import studentRouter from './routes/studentRouter';
import studentClassRouter from './routes/studentClassRouter';
import attendanceRouter from './routes/attendanceRouter';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/subjects', subjectRouter);
app.use('/professors', professorRouter);
app.use('/students', studentRouter);
app.use('/studentClass', studentClassRouter);
app.use('/attendances', attendanceRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});