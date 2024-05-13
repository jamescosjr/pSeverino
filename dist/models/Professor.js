"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const professorSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subjects: [{ type: String }]
});
const ProfessorModel = mongoose_1.default.model('Professor', professorSchema);
exports.ProfessorModel = ProfessorModel;
