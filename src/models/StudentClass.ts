import mongoose, { Document } from 'mongoose';

interface StudentClass extends Document {
    code: string;
    shift: string;
    subjects: string[];
    students: string[];
}

const studentClassSchema = new mongoose.Schema<StudentClass>({
    code: { type: String, required: true, unique: true },
    shift: { type: String, required: true },
    subjects: [{ type: String }],
    students: [{ type: String }]
});

const StudentClassModel = mongoose.model<StudentClass>('StudentClass', studentClassSchema);

export { StudentClass, StudentClassModel };