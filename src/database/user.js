const mongoose = require("mongoose")

const TeamReferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // ObjectId of the team. This is helpful for searching
  _id: {
    type: String,
    required: true,
  },
})

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    team: [TeamReferenceSchema],
  },
  { collection: "user" }
)

export const User = mongoose.model("user", UserSchema)
