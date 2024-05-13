import mongoose, { Document } from 'mongoose';

interface Subject extends Document {
  code: string;
  name: string;
  description: string;
}

const subjectSchema = new mongoose.Schema<Subject>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const SubjectModel = mongoose.model<Subject>('Subject', subjectSchema);

export { Subject, SubjectModel };