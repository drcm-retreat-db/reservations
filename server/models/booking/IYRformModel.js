const mongoose = require("mongoose");
const participantTemplate = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  marriageDate: String,
});
const IYRformTemplate = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
  country: String,
  profession: String,
  count: Number,
  participants: { type: [participantTemplate], default: [] },
  roomType: String,
  cuisine: String,
  eta: String,
  sponsorName: String,
  sponsorCard: String,
  sponsorRelation: String,
  timestamp: { type: Date, default: Date.now },
});

IYRformData = mongoose.model("iyrform", IYRformTemplate);
module.exports = IYRformData;
