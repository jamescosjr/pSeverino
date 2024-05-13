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
const Attendance_1 = require("../models/Attendance");
const router = (0, express_1.Router)();
// Rota para listar todos os registros de presença
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendances = yield Attendance_1.AttendanceModel.find();
        res.json(attendances);
    }
    catch (error) {
        console.error('Erro ao obter registros de presença:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para criar um novo registro de presença
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { timestamp, mood, studentClassCode, email, userType } = req.body;
        const newAttendance = new Attendance_1.AttendanceModel({ timestamp, mood, studentClassCode, email, userType });
        yield newAttendance.save();
        res.status(201).json(newAttendance);
    }
    catch (error) {
        console.error('Erro ao criar registro de presença:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para calcular a média de humor por seção em um período específico
router.get('/moodaverage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startTime, endTime } = req.query;
        if (!startTime || !endTime) {
            return res.status(400).json({ message: 'Parâmetros de início e término do período são obrigatórios' });
        }
        // Converte os horários de string para objetos Date
        const start = new Date(startTime);
        const end = new Date(endTime);
        // Encontra todos os registros de presença dentro do intervalo de horário especificado
        const attendances = yield Attendance_1.AttendanceModel.find({
            timestamp: { $gte: start, $lte: end }
        });
        // Calcula a média de humor por seção
        const moodCounts = {};
        attendances.forEach(attendance => {
            if (!moodCounts[attendance.studentClassCode]) {
                moodCounts[attendance.studentClassCode] = { total: 0, count: 0 };
            }
            moodCounts[attendance.studentClassCode].total += attendance.mood;
            moodCounts[attendance.studentClassCode].count++;
        });
        const moodAverages = {};
        for (const sectionCode in moodCounts) {
            moodAverages[sectionCode] = moodCounts[sectionCode].total / moodCounts[sectionCode].count;
        }
        res.json(moodAverages);
    }
    catch (error) {
        console.error('Erro ao calcular média de humor por seção:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para obter detalhes de um registro de presença específico
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield Attendance_1.AttendanceModel.findById(req.params.id);
        if (attendance) {
            res.json(attendance);
        }
        else {
            res.status(404).json({ message: 'Registro de presença não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao obter detalhes do registro de presença:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para atualizar um registro de presença existente
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { timestamp, mood, studentClassCode, email, userType } = req.body;
        const updatedAttendance = yield Attendance_1.AttendanceModel.findByIdAndUpdate(req.params.id, { timestamp, mood, studentClassCode, email, userType }, { new: true });
        if (updatedAttendance) {
            res.json(updatedAttendance);
        }
        else {
            res.status(404).json({ message: 'Registro de presença não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao atualizar registro de presença:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
// Rota para excluir um registro de presença
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAttendance = yield Attendance_1.AttendanceModel.findByIdAndDelete(req.params.id);
        if (deletedAttendance) {
            res.json({ message: 'Registro de presença excluído com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Registro de presença não encontrado' });
        }
    }
    catch (error) {
        console.error('Erro ao excluir registro de presença:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}));
exports.default = router;
