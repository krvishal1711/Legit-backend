const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  companyLogo: String,
  companyName: String,
  role: String,
  stipend: String,
  ctc: String,
  location: String,
  applyLink: String,
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);
