const mongoose = require("mongoose")

// const TeamReferenceSchema = new mongoose.Schema({
//   // ObjectId of the team for reference. This is helpful for searching
//   referenceId: {
//     type: String,
//     required: true,
//   },
// })

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
    team: [String],
  },
  { collection: "user" }
)

export const User = mongoose.model("user", UserSchema)
