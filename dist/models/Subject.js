"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});
const SubjectModel = mongoose_1.default.model('Subject', subjectSchema);
exports.SubjectModel = SubjectModel;
