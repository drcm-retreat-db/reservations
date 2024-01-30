const mongoose = require("mongoose");

const userTemplate = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  contact: String,
  MarriageDate: String,
});

const roomTemplate = new mongoose.Schema({
  roomNo: String, // 101
  floor: String, // 1
  building: String, // Sharon
  roomType: String, // AC, NONAC
  totalOccupancy: Number, // 3
  readyToUse: Boolean, // true
  isSharing: Boolean, // false
  alloted: Boolean, // true
  checkedIn: Boolean, // false
  users: [userTemplate],
  attributes: { type: [String] }, // ['sick bed available', 'ground floor', 'boys']
  comments: { type: String }, // Needs mechanic to fix AC
});

roomData = mongoose.model("room", roomTemplate);
module.exports = roomData;
