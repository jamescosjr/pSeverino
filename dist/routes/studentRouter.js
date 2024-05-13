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
const Student_1 = require("../models/Student");
const router = (0, express_1.Router)();
// Rota para listar todos os alunos
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student_1.StudentModel.find();
        res.json(students);
    }
    catch (error) {
        console.error('Erro ao obter alunos', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para criar um aluno
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const newStudent = new Student_1.StudentModel({ name, email });
        yield newStudent.save();
        res.status(201).json(newStudent);
    }
    catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para retornar os detalhes de um aluno específico
router.get('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.StudentModel.findOne({ email: req.params.email });
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao obter detalhes do aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para atualiza um aluno
router.put('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const updateStudent = yield Student_1.StudentModel.findOneAndUpdate({ email: req.params.email }, { name, email }, { new: true });
        if (updateStudent) {
            res.json(updateStudent);
        }
        else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para deletar um aluno
router.delete('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedStudent = yield Student_1.StudentModel.findOneAndDelete({ email: req.params.email });
        if (deletedStudent) {
            res.json({ message: 'Aluno deletado com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao deletar aluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
exports.default = router;
