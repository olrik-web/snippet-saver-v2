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
      required: [true, "Please provide a first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name."],
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
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  snippetFolder: {
    type: Schema.Types.ObjectId,
    ref: "SnippetFolder",
  },
});

const snippetFolderSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user."],
  },
});

// This is the array of models that will be exported to the database.
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
  {
    name: "SnippetFolder",
    schema: snippetFolderSchema,
    collection: "SnippetFolder",
  },
];
