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
const Subject_1 = require("../models/Subject");
const router = (0, express_1.Router)();
// Rota para listar todas as disciplinas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield Subject_1.SubjectModel.find();
        res.json(subjects);
    }
    catch (error) {
        console.error('Erro ao obter disciplinas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para criar uma nova disciplina
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, name, description } = req.body;
        const newSubject = new Subject_1.SubjectModel({ code, name, description });
        yield newSubject.save();
    }
    catch (error) {
        console.error('Erro ao criar disciplina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para retornar os detalhes de uma única disciplina
router.get('/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield Subject_1.SubjectModel.findOne({ code: req.params.code });
        if (subject) {
            res.json(subject);
        }
        else {
            res.status(404).json({ message: 'Disciplina não encontrada' });
        }
    }
    catch (error) {
        console.error('Erro ao obter detalhes da disciplina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para atualizar uma disciplina
router.put('/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const updatedSubject = yield Subject_1.SubjectModel.findOneAndUpdate({ code: req.params.code }, { name, description }, { new: true });
        if (updatedSubject) {
            res.json(updatedSubject);
        }
        else {
            res.status(404).json({ message: 'Disciplina não encontrada' });
        }
    }
    catch (error) {
        console.error('Erro ao atualizar a disciplina', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para deletar uma disciplina
router.delete('/:code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSubject = yield Subject_1.SubjectModel.findOneAndDelete({ code: req.params.code });
        if (deletedSubject) {
            res.json({ message: 'Disciplina excluida com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Disciplina nãop encontrada' });
        }
    }
    catch (error) {
        console.error('Erro ao excluir disciplina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
exports.default = router;
