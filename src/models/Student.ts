import mongoose, { Document } from 'mongoose';

interface Student extends Document {
    name: string;
    email: string;
}

const studentSchema = new mongoose.Schema<Student>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const StudentModel = mongoose.model<Student>('Professor', studentSchema);

export { Student, StudentModel }