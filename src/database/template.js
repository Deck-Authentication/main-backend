const mongoose = require("mongoose")

export const TemplateSchema = new mongoose.Schema(
  {
    app: {
      slack: {
        channels: [String],
      },
      google: {
        groupKeys: [String],
      },
      atlassian: {
        groupnames: [String],
      },
    },
    name: String,
    // an array of member _id strings
    members: [String],
  },
  { collection: "template" }
)

export const Template = mongoose.model("template", TemplateSchema)
