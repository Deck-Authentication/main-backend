import { Router } from "express"
import { Template } from "../database/template"
import mongoose from "mongoose"
import updateRouter from "./update"

const templateRouter = Router()

templateRouter.get("/get-all-template", async (_, res) => {
  await Template.find({})
    .exec()
    .then((template) => res.status(200).json({ template, ok: true }))
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

templateRouter.get("/get-template-by-id/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: "id is required", ok: false })

  // cast the req.params.id to MongoDB ObjectId type to avoid invalid id error from mongoose
  const _id = mongoose.Types.ObjectId(req.params.id)

  await Template.findById(_id)
    .exec()
    .then((template) => {
      if (!template)
        res.status(404).json({
          message: "no template found matched the provided id",
          ok: true,
        })
      else res.status(200).json({ message: template, ok: true })
    })
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

templateRouter.post("/create-template", async (req, res) => {
  const { name } = req.body
  if (name.trim().length === 0) return res.status(400).json({ message: "name is required as a nonempty string", ok: false })

  // Must check for duplicate template name here. Will do later.

  const template = await Template.create({ name }).catch((err) => res.status(500).json({ message: err, ok: false }))

  return res.status(200).json({ template, message: "The template has been created", ok: true })
})

templateRouter.delete("/remove-template", async (req, res) => {
  const { id } = req.body
  if (!id || !id.trim()) return res.status(400).json({ message: "id is required as a nonempty string", ok: false })

  // cast the id to MongoDB ObjectId type to avoid invalid id error from mongoose
  const _id = mongoose.Types.ObjectId(id)

  const template = await Template.findByIdAndDelete(_id).catch((err) => res.status(500).json({ message: err, ok: false }))

  if (!template)
    return res.status(404).json({
      message: "no template found matched the provided id",
      ok: true,
    })

  return res.status(200).json({ message: "The template has been deleted", ok: true })
})

templateRouter.use("/update", updateRouter)

export default templateRouter
