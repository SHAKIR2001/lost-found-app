import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["lost", "found"],
    required: true
  },

  location: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  image: {
    type: String
  },

  contactName: {
    type: String,
    required: true
  },

  contactEmail: {
    type: String,
    required: true
  },

  contactPhone: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Item", itemSchema);