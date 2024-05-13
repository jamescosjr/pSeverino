import express, { Router, Request, Response } from 'express';
import { AttendanceModel } from '../models/Attendance';

const router = Router();

// Rota para listar todos os registros de presença
router.get('/', async (req: Request, res: Response) => {
  try {
    const attendances = await AttendanceModel.find();
    res.json(attendances);
  } catch (error) {
    console.error('Erro ao obter registros de presença:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para criar um novo registro de presença
router.post('/', async (req: Request, res: Response) => {
    try {
      const { timestamp, mood, studentClassCode, email, userType } = req.body;
      const newAttendance = new AttendanceModel({ timestamp, mood, studentClassCode, email, userType });
      await newAttendance.save();
      res.status(201).json(newAttendance);
    } catch (error) {
      console.error('Erro ao criar registro de presença:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });


// Rota para calcular a média de humor por seção em um período específico
router.get('/moodaverage', async (req: Request, res: Response) => {
    try {
      const { startTime, endTime } = req.query;
      if (!startTime || !endTime) {
        return res.status(400).json({ message: 'Parâmetros de início e término do período são obrigatórios' });
      }
      // Converte os horários de string para objetos Date
      const start = new Date(startTime as string);
      const end = new Date(endTime as string);
      // Encontra todos os registros de presença dentro do intervalo de horário especificado
      const attendances = await AttendanceModel.find({
        timestamp: { $gte: start, $lte: end }
      });
      // Calcula a média de humor por seção
      const moodCounts = {} as { [key: string]: { total: number, count: number } };
      attendances.forEach(attendance => {
        if (!moodCounts[attendance.studentClassCode]) {
          moodCounts[attendance.studentClassCode] = { total: 0, count: 0 };
        }
        moodCounts[attendance.studentClassCode].total += attendance.mood;
        moodCounts[attendance.studentClassCode].count++;
      });
      const moodAverages = {} as { [key: string]: number };
      for (const sectionCode in moodCounts) {
        moodAverages[sectionCode] = moodCounts[sectionCode].total / moodCounts[sectionCode].count;
      }
      res.json(moodAverages);
    } catch (error) {
      console.error('Erro ao calcular média de humor por seção:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para obter detalhes de um registro de presença específico
router.get('/:id', async (req: Request, res: Response) => {
    try {
      const attendance = await AttendanceModel.findById(req.params.id);
      if (attendance) {
        res.json(attendance);
      } else {
        res.status(404).json({ message: 'Registro de presença não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao obter detalhes do registro de presença:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para atualizar um registro de presença existente
router.put('/:id', async (req: Request, res: Response) => {
    try {
      const { timestamp, mood, studentClassCode, email, userType } = req.body;
      const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
        req.params.id,
        { timestamp, mood, studentClassCode, email, userType },
        { new: true }
      );
      if (updatedAttendance) {
        res.json(updatedAttendance);
      } else {
        res.status(404).json({ message: 'Registro de presença não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar registro de presença:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para excluir um registro de presença
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const deletedAttendance = await AttendanceModel.findByIdAndDelete(req.params.id);
      if (deletedAttendance) {
        res.json({ message: 'Registro de presença excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Registro de presença não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir registro de presença:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

export default router;