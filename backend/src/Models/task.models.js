import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
}, { timestamps: true })
// created at & updated at



export const Task = mongoose.model("Task", taskSchema);