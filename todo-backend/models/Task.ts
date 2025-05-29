import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  completed: boolean;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model<ITask>("Task", TaskSchema);
