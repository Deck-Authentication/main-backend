import { Router } from "express"
import { Template } from "../database/template"
import lodash from "lodash"
import mongoose from "mongoose"

const updateTemplateRouter = Router()

// update the name of field of the template
updateTemplateRouter.put("/name", async (req, res) => {
  let { id, name } = req.body

  if (!id) return res.status(400).json({ message: "id is required", ok: false })

  if (!name || name.trim().length === 0)
    return res.status(400).json({ message: "name is required as a non-empty string", ok: false })

  // cast the req.body.id to MongoDB ObjectId type to avoid invalid id error from mongoose
  id = mongoose.Types.ObjectId(id)

  // set the option new to true to return the updated document
  await Template.findByIdAndUpdate(id, { name }, { new: true })
    .exec()
    .then((template) => {
      if (!template)
        res.status(404).json({
          message: "no template found matched the provided id",
          ok: false,
        })
      else
        res.status(200).json({
          template,
          message: "The new template has been updated",
          ok: true,
        })
    })
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

// check if the channels is an array and every element is a non-empty string
const areChannelsValid = (channels) => {
  return lodash.isArray(channels) && channels.every((channel) => typeof channel === "string" && channel.trim() !== "")
}

updateTemplateRouter.put("/app/slack", async (req, res) => {
  let { id, channels } = req.body

  if (!id) return res.status(400).json({ message: "id is required", ok: false })

  if (!channels) return res.status(400).json({ message: "channels is required", ok: false })
  if (!areChannelsValid(channels))
    return res.status(400).json({ message: "channels is not valid: must be an array of non-empty strings", ok: false })

  // cast the req.body.id to MongoDB ObjectId type to avoid invalid id error from mongoose
  id = mongoose.Types.ObjectId(id)

  // set the option new to true to return the updated document
  await Template.findByIdAndUpdate(
    id,
    {
      $set: {
        "app.slack.channels": channels,
      },
    },
    { new: true }
  )
    .exec()
    .then((template) => {
      if (!template)
        res.status(404).json({
          message: "no template found matched the provided id",
          ok: false,
        })
      else
        res.status(200).json({
          template,
          message: "The new template has been updated",
          ok: true,
        })
    })
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

export default updateTemplateRouter
