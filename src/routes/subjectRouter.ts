import express, { Router, Request, Response } from 'express';
import { SubjectModel } from '../models/Subject';

const router = Router();

// Rota para listar todas as disciplinas
router.get('/', async (req: Request, res: Response) => {
  try {
    const subjects = await SubjectModel.find();
    res.json(subjects);
  } catch (error) {
    console.error('Erro ao obter disciplinas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para criar uma nova disciplina
router.post('/', async (req: Request, res: Response) => {
    try {
        const { code, name, description } = req.body;
        const newSubject =new SubjectModel({ code, name, description });
        await newSubject.save();
    } catch (error) {
        console.error('Erro ao criar disciplina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para retornar os detalhes de uma única disciplina
router.get('/:code', async (req: Request,  res: Response) => {
    try {
        const subject = await SubjectModel.findOne({ code: req.params.code });
        if (subject) {
            res.json(subject);
        }else {
            res.status(404).json({ message: 'Disciplina não encontrada' });
        }
    }catch (error) {
        console.error('Erro ao obter detalhes da disciplina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
});

// Rota para atualizar uma disciplina
router.put('/:code', async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const updatedSubject = await SubjectModel.findOneAndUpdate(
            { code: req.params.code },
            { name, description },
            { new: true }
        );
        if (updatedSubject) {
            res.json(updatedSubject);
        } else {
            res.status(404).json({ message: 'Disciplina não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar a disciplina', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para deletar uma disciplina
router.delete('/:code', async (req: Request, res: Response) => {
    try {
        const deletedSubject = await SubjectModel.findOneAndDelete({ code: req.params.code });
        if (deletedSubject) {
            res.json({ message: 'Disciplina excluida com sucesso' });
        } else {
            res.status(404).json({ message: 'Disciplina nãop encontrada' });
        }
    } catch (error) {
        console.error('Erro ao excluir disciplina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

export default router;