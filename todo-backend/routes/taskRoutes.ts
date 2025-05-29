import express from "express";
import Task from "../models/Task";

const router = express.Router();

// Get all tasks
router.get("/", async (_, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Update task
router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

export default router;
