import mongoose, { Document } from 'mongoose';

interface Professor extends Document {
    name: string;
    email: string;
    subjects: string[];
}

const professorSchema = new mongoose.Schema<Professor>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subjects: [{ type: String }]
});

const ProfessorModel = mongoose.model<Professor>('Professor', professorSchema);

export { Professor, ProfessorModel }