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
const isStringArray = (arr) => {
  return lodash.isArray(arr) && arr.every((ele) => typeof ele === "string" && ele.trim() !== "")
}

updateTemplateRouter.put("/app/slack", async (req, res) => {
  let { id, channels } = req.body

  if (!id) return res.status(400).json({ message: "id is required", ok: false })

  if (!channels) return res.status(400).json({ message: "channels is required", ok: false })
  if (!isStringArray(channels))
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

updateTemplateRouter.put("/app/google", async (req, res) => {
  let { id, groupKeys } = req.body

  if (!id) return res.status(400).json({ message: "id is required", ok: false })

  if (!groupKeys) return res.status(400).json({ message: "groupKeys are required", ok: false })
  if (!isStringArray(groupKeys))
    return res.status(400).json({ message: "groupKeys are not valid: must be an array of non-empty strings", ok: false })

  // cast the req.body.id to MongoDB ObjectId type to avoid invalid id error from mongoose
  id = mongoose.Types.ObjectId(id)

  // set the option new to true to return the updated document
  await Template.findByIdAndUpdate(
    id,
    {
      $set: {
        "app.google.groupKeys": groupKeys,
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

updateTemplateRouter.put("/app/atlassian", async (req, res) => {
  let { id, groupnames } = req.body

  if (!id) return res.status(400).json({ message: "id is required", ok: false })

  if (!groupnames) return res.status(400).json({ message: "groupnames is required", ok: false })
  if (!isStringArray(groupnames))
    return res.status(400).json({ message: "groupnames is not valid: must be an array of non-empty strings", ok: false })

  // cast the req.body.id to MongoDB ObjectId type to avoid invalid id error from mongoose
  id = mongoose.Types.ObjectId(id)

  // set the option new to true to return the updated document
  await Template.findByIdAndUpdate(
    id,
    {
      $set: {
        "app.atlassian.groupnames": groupnames,
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

updateTemplateRouter.put("/members", async (req, res) => {
  let { id, members } = req.body
  if (!lodash.isArray(members)) return res.status(400).json({ message: "members is not an array", ok: false })
  if (!id) return res.status(400).json({ message: "id is required", ok: false })
  // cast the req.body.id to MongoDB ObjectId type to avoid invalid id error from mongoose
  id = mongoose.Types.ObjectId(id)

  await Template.findByIdAndUpdate(id, { members }, { new: true })
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
