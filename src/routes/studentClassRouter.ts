import express, { Router, Request, Response } from 'express';
import { StudentClassModel } from '../models/StudentClass';
import { StudentModel } from '../models/Student';

const router = Router();

// Rota para listar todas as turmas de estudantes
router.get('/', async (req: Request, res: Response) => {
    try {
      const studentClasses = await StudentClassModel.find();
      res.json(studentClasses);
    } catch (error) {
      console.error('Erro ao obter turmas de estudantes:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para retornar a turma de um aluno específico
router.get('/students/:email', async (req: Request, res: Response) => {
    try {
      const studentEmail = req.params.email;
      const studentClass = await StudentClassModel.findOne({ students: { $in: [studentEmail] } });
      if (studentClass) {
        res.json(studentClass);
      } else {
        res.status(404).json({ message: 'Turma do aluno não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao obter turma do aluno:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para criar uma nova turma de estudantes
router.post('/', async (req: Request, res: Response) => {
    try {
      const { code, shift, subjects } = req.body;
      const newStudentClass = new StudentClassModel({ code, shift, subjects });
      await newStudentClass.save();
      res.status(201).json(newStudentClass);
    } catch (error) {
      console.error('Erro ao criar turma de estudantes:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para retornar detalhes de uma única turma de estudantes
router.get('/:code', async (req: Request, res: Response) => {
    try {
      const studentClass = await StudentClassModel.findOne({ code: req.params.code });
      if (studentClass) {
        res.json(studentClass);
      } else {
        res.status(404).json({ message: 'Turma de estudantes não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao obter detalhes da turma de estudantes:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para atualizar uma turma de estudantes existente
router.put('/:code', async (req: Request, res: Response) => {
    try {
      const { shift, subjects } = req.body;
      const updatedStudentClass = await StudentClassModel.findOneAndUpdate(
        { code: req.params.code },
        { shift, subjects },
        { new: true }
      );
      if (updatedStudentClass) {
        res.json(updatedStudentClass);
      } else {
        res.status(404).json({ message: 'Turma de estudantes não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao atualizar turma de estudantes:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para excluir uma turma de estudantes
router.delete('/:code', async (req: Request, res: Response) => {
    try {
      const deletedStudentClass = await StudentClassModel.findOneAndDelete({ code: req.params.code });
      if (deletedStudentClass) {
        res.json({ message: 'Turma de estudantes excluída com sucesso' });
      } else {
        res.status(404).json({ message: 'Turma de estudantes não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao excluir turma de estudantes:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para matricular um aluno em uma turma
router.post('/:code/students/:email', async (req: Request, res: Response) => {
    try {
      const { code, email } = req.params;
      // Verifica se a turma existe
      const studentClass = await StudentClassModel.findOne({ code });
      if (!studentClass) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }
      // Verifica se o aluno já está matriculado na turma
      if (studentClass.students.includes(email)) {
        return res.status(400).json({ message: 'O aluno já está matriculado nesta turma' });
      }
      // Matricula o aluno na turma
      studentClass.students.push(email);
      await studentClass.save();
      res.json({ message: 'Aluno matriculado na turma com sucesso' });
    } catch (error) {
      console.error('Erro ao matricular aluno na turma:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para remover um aluno de uma turma
router.delete('/:code/students/:email', async (req: Request, res: Response) => {
    try {
      const { code, email } = req.params;
      // Verifica se a turma existe
      const studentClass = await StudentClassModel.findOne({ code });
      if (!studentClass) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }
      // Verifica se o aluno está matriculado na turma
      const index = studentClass.students.indexOf(email);
      if (index === -1) {
        return res.status(400).json({ message: 'O aluno não está matriculado nesta turma' });
      }
      // Remove o aluno da turma
      studentClass.students.splice(index, 1);
      await studentClass.save();
      res.json({ message: 'Aluno removido da turma com sucesso' });
    } catch (error) {
      console.error('Erro ao remover aluno da turma:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

// Rota para listar todos os alunos que não estão matriculados em uma turma específica
router.get('/:code/studentsnotenrolled', async (req: Request, res: Response) => {
    try {
      const code = req.params.code;
      // Encontra a turma com o código fornecido
      const studentClass = await StudentClassModel.findOne({ code });
      if (!studentClass) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }
      // Encontra todos os alunos que não estão matriculados na turma
      const studentsNotEnrolled = await StudentModel.find({ email: { $nin: studentClass.students } });
      res.json(studentsNotEnrolled);
    } catch (error) {
      console.error('Erro ao obter alunos não matriculados na turma:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });

export default router;