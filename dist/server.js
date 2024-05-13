"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const subjectRouter_1 = __importDefault(require("./routes/subjectRouter"));
const professorRouter_1 = __importDefault(require("./routes/professorRouter"));
const studentRouter_1 = __importDefault(require("./routes/studentRouter"));
const studentClassRouter_1 = __importDefault(require("./routes/studentClassRouter"));
const attendanceRouter_1 = __importDefault(require("./routes/attendanceRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use('/subjects', subjectRouter_1.default);
app.use('/professors', professorRouter_1.default);
app.use('/students', studentRouter_1.default);
app.use('/studentClass', studentClassRouter_1.default);
app.use('/attendances', attendanceRouter_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
