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
  if (!req.params.id)
    return res.status(400).json({ message: "id is required", ok: false })

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
      else res.status(200).json({ template, ok: true })
    })
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

templateRouter.post("/create-template", (req, res) => {})

templateRouter.delete("/remove-template", (req, res) => {})

templateRouter.put("/update-template", updateRouter)

export default templateRouter
