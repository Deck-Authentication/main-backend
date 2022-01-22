const mongoose = require("mongoose")

const member = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  objectId: {
    type: String,
    required: true,
  },
})

export const TeamSchema = new mongoose.Schema(
  {
    app: {
      slack: {
        channel: [String],
      },
      google: {
        groupKeys: [String],
      },
      atlassian: {
        groupnames: [String],
      },
    },
    name: String,
    member: [member],
  },
  { collection: "team" }
)

export const Team = mongoose.model("team", TeamSchema)
