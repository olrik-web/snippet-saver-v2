import { mongoose } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: [true, "Email already exist."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
  },
  profile: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const snippetSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  desc: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
});

export const models = [
  {
    name: "User",
    schema: userSchema,
    collection: "User",
  },
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "Snippet",
  },
];
