import express, { Router, Request, Response } from 'express';
import { StudentModel } from '../models/Student';

const router = Router();

// Rota para listar todos os alunos
router.get('/', async (req: Request, res: Response) => {
    try {
        const students = await StudentModel.find();
        res.json(students);
    } catch (error) {
        console.error('Erro ao obter alunos', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para criar um aluno
router.post('/', async (req: Request, res:Response) => {
    try {
        const { name , email } = req.body;
        const newStudent = new StudentModel({ name, email });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para retornar os detalhes de um aluno específico
router.get('/:email', async (req: Request, res: Response) => {
    try {
        const student = await StudentModel.findOne({ email: req.params.email });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    }catch (error) {
        console.error('Erro ao obter detalhes do aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para atualiza um aluno
router.put('/:email', async (req: Request, res: Response) => {
    try{
        const { name , email } = req.body;
        const updateStudent = await StudentModel.findOneAndUpdate(
            { email: req.params.email },
            { name , email },
            { new: true }
        );
        if (updateStudent) {
            res.json(updateStudent);
        } else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para deletar um aluno
router.delete('/:email', async (req: Request, res: Response) => {
    try {
        const deletedStudent = await StudentModel.findOneAndDelete({ email: req.params.email });
        if (deletedStudent) {
            res.json({ message: 'Aluno deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

export default router;