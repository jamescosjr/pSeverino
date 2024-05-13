import express, { Router, Request, Response } from 'express';
import { ProfessorModel } from '../models/Professor';
import { SubjectModel } from '../models/Subject';

const router = Router();

// Rota para listar todos os professores
router.get('/', async (req: Request, res: Response) => {
    try {
        const professors = await ProfessorModel.find();
        res.json(professors);
    } catch (error) {
        console.error('Erro ao obter professores', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para criar um Professor
router.post('/', async (req: Request, res:Response) => {
    try {
        const { name , email, subject } = req.body;
        const newProfessor = new ProfessorModel({ name, email, subject });
        await newProfessor.save();
        res.status(201).json(newProfessor);
    } catch (error) {
        console.error('Erro ao criar professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para retornar os detalhes de um professor específico
router.get('/:email', async (req: Request, res: Response) => {
    try {
        const professor = await ProfessorModel.findOne({ email: req.params.email });
        if (professor) {
            res.json(professor);
        } else {
            res.status(404).json({ message: 'Professor não encontrado' });
        }
    }catch (error) {
        console.error('Erro ao obter detalhes do professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para atualiza um professor
router.put('/:email', async (req: Request, res: Response) => {
    try{
        const { name , email, subject } = req.body;
        const updateProfessor = await ProfessorModel.findOneAndUpdate(
            { email: req.params.email },
            { name , email, subject },
            { new: true }
        );
        if (updateProfessor) {
            res.json(updateProfessor);
        } else {
            res.status(404).json({ message: 'Professor não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para deletar um professor
router.delete('/:email', async (req: Request, res: Response) => {
    try {
        const deletedProfessor = await ProfessorModel.findOneAndDelete({ email: req.params.email });
        if (deletedProfessor) {
            res.json({ message: 'Professor deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Professor não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para associar um professor a uma disciplina
router.post('/:email/subjects/:code', async (req: Request, res: Response) => {
    try {
        const { email, code } = req.params;
        // verificando se o professor existe
        const professor = await ProfessorModel.findOne({ email });
        if(!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        // Verifica se a disciplina existe
        const subject = await SubjectModel.findOne({ code });
        if(!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        // Adicionando a disciplina ao array de disciplinas em professor
        if(!professor.subjects.includes(code)) {
            professor.subjects.push(code);
            await professor.save();
            return res.json({ message: 'Disciplina associada ao professor com sucesso' });
        }else {
            return res.status(400).json({ message: 'O professor já está associado a esta disciplina' });
        }
    }catch (error) {
        console.error('Erro ao associar disciplina ao professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Para desassociar um professor de uma dsiciplina
router.delete('/:email/subjects/:code', async (req: Request, res: Response) => {
    try{
        const { email, code } = req.params;
        // Verificando se o professor existe
        const professor = await ProfessorModel.findOne({ email });
        if(!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        // Verifica se a disciplina existe
        const subject = await SubjectModel.findOne({ code });
        if(!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        // Removendo a disciplina do array em professor
        const index = professor.subjects.indexOf(code);
        if(index !== -1) {
            professor.subjects.splice(index, 1);
            await professor.save();
            return res.json({ message: 'Disciplina desassociada do professor com sucesso' });
        } else {
            return res.status(400).json({ message: 'O professor não está associado a esta disciplina' });
        }
    } catch (error) {
        console.error('Erro ao desassociar disciplina do professor', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

export default router;