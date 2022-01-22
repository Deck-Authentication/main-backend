const mongoose = require("mongoose")

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
    team: [
      {
        name: {
          type: String,
          required: true,
        },
        // ObjectId of the team. This is helpful for searching
        objectId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "user" }
)

export const User = mongoose.model("team", UserSchema)
