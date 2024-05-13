"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Professor_1 = require("../models/Professor");
const Subject_1 = require("../models/Subject");
const router = (0, express_1.Router)();
// Rota para listar todos os professores
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professors = yield Professor_1.ProfessorModel.find();
        res.json(professors);
    }
    catch (error) {
        console.error('Erro ao obter professores', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para criar um Professor
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, subject } = req.body;
        const newProfessor = new Professor_1.ProfessorModel({ name, email, subject });
        yield newProfessor.save();
        res.status(201).json(newProfessor);
    }
    catch (error) {
        console.error('Erro ao criar professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para retornar os detalhes de um professor específico
router.get('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professor = yield Professor_1.ProfessorModel.findOne({ email: req.params.email });
        if (professor) {
            res.json(professor);
        }
        else {
            res.status(404).json({ message: 'Professor não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao obter detalhes do professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para atualiza um professor
router.put('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, subject } = req.body;
        const updateProfessor = yield Professor_1.ProfessorModel.findOneAndUpdate({ email: req.params.email }, { name, email, subject }, { new: true });
        if (updateProfessor) {
            res.json(updateProfessor);
        }
        else {
            res.status(404).json({ message: 'Professor não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao atualizar professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para deletar um professor
router.delete('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProfessor = yield Professor_1.ProfessorModel.findOneAndDelete({ email: req.params.email });
        if (deletedProfessor) {
            res.json({ message: 'Professor deletado com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Professor não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao deletar professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para associar um professor a uma disciplina
router.post('/:email/subjects/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = req.params;
        // verificando se o professor existe
        const professor = yield Professor_1.ProfessorModel.findOne({ email });
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        // Verifica se a disciplina existe
        const subject = yield Subject_1.SubjectModel.findOne({ code });
        if (!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        // Adicionando a disciplina ao array de disciplinas em professor
        if (!professor.subjects.includes(code)) {
            professor.subjects.push(code);
            yield professor.save();
            return res.json({ message: 'Disciplina associada ao professor com sucesso' });
        }
        else {
            return res.status(400).json({ message: 'O professor já está associado a esta disciplina' });
        }
    }
    catch (error) {
        console.error('Erro ao associar disciplina ao professor:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Para desassociar um professor de uma dsiciplina
router.delete('/:email/subjects/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = req.params;
        // Verificando se o professor existe
        const professor = yield Professor_1.ProfessorModel.findOne({ email });
        if (!professor) {
            return res.status(404).json({ message: 'Professor não encontrado' });
        }
        // Verifica se a disciplina existe
        const subject = yield Subject_1.SubjectModel.findOne({ code });
        if (!subject) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        // Removendo a disciplina do array em professor
        const index = professor.subjects.indexOf(code);
        if (index !== -1) {
            professor.subjects.splice(index, 1);
            yield professor.save();
            return res.json({ message: 'Disciplina desassociada do professor com sucesso' });
        }
        else {
            return res.status(400).json({ message: 'O professor não está associado a esta disciplina' });
        }
    }
    catch (error) {
        console.error('Erro ao desassociar disciplina do professor', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
exports.default = router;
