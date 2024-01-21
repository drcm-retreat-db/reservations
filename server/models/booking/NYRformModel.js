const mongoose = require("mongoose");
const participantTemplate = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  MarriageDate: String,
});
const NYRformTemplate = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
  country: String,
  profession: String,
  count: Number,
  participants: [participantTemplate],
  roomType: String,
  cuisine: String,
  eta: String,
  sponsorName: String,
  sponsorCard: String,
  sponsorRelation: String,
  timestamp: { type: Date, default: Date.now },
});

NYRformData = mongoose.model("nyrform", NYRformTemplate);
module.exports = NYRformData;
