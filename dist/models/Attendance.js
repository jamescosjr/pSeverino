"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, default: Date.now },
    mood: { type: Number, required: true, min: 1, max: 5 },
    studentClassCode: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, required: true }
});
const AttendanceModel = mongoose_1.default.model('Attendance', attendanceSchema);
exports.AttendanceModel = AttendanceModel;
