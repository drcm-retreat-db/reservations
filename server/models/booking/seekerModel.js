const mongoose = require("mongoose");

const SeekerApplicationTemplate = new mongoose.Schema({
  applicationType: { type: String, required: true },
  applicantName: { type: String, required: true },
  applicantMobile: { type: String, required: true },
  age: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  preferenceOne: { type: String, required: true },
  preferenceTwo: { type: String, required: true },
  bookedBy: { type: String, required: true },
  requestId: { type: String, required: true },
  date:{type:Date,default:Date.now}
});

seekerApplicationData = mongoose.model(
  "seekerApplication",
  SeekerApplicationTemplate
);
module.exports = seekerApplicationData;
