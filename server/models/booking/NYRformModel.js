const mongoose = require("mongoose");
const participantTemplate = new mongoose.Schema({
  name: { type: String, default: "" },
  age: { type: String, default: "" },
  gender: { type: String, default: "" },
  marriageDate: { type: String, default: "" },
});
const bookingTemplate = new mongoose.Schema({
  paymentData: {
    regFee: { type: String, default: "" },
    roomFee: { type: String, default: "" },
    mcFee: { type: String, default: "" },
    amountPaid: { type: String, default: "" },
    paymentMode: { type: String, default: "" },
    paymentVerified: { type: Boolean, default: false },
    paymentStatus: { type: String, default: "UNVERIFIED" },
  },
  roomData: { type: [String], default: [] },
});
const NYRformTemplate = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
  country: String,
  profession: String,
  count: String,
  participants: { type: [participantTemplate], default: [] },
  bookingData: bookingTemplate,
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
