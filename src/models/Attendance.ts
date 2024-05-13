import mongoose, { Document } from 'mongoose';

interface Attendance extends Document {
    timestamp: Date;
    mood: number;
    studentClassCode: string;
    email: string;
    userType: string;
}

const attendanceSchema = new mongoose.Schema<Attendance>({
    timestamp: { type: Date, default: Date.now },
    mood: { type: Number, required: true, min: 1, max: 5 },
    studentClassCode: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, required: true }
});

const AttendanceModel = mongoose.model<Attendance>('Attendance', attendanceSchema);

export { Attendance, AttendanceModel };