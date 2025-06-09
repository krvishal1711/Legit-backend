const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Middleware to check admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Add job (Admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all jobs (Public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete job by ID (Admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
