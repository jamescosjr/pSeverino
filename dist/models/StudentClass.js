"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentClassModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentClassSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true, unique: true },
    shift: { type: String, required: true },
    subjects: [{ type: String }],
    students: [{ type: String }]
});
const StudentClassModel = mongoose_1.default.model('StudentClass', studentClassSchema);
exports.StudentClassModel = StudentClassModel;
