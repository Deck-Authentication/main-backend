import { Router } from "express"
import { Template } from "../database/template"

const templateRouter = Router()

templateRouter.get("/get-all-template", async (_, res) => {
  await Template.find({})
    .exec()
    .then((template) => res.status(200).json({ template, ok: true }))
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

templateRouter.get("/get-template-by-id", async (req, res) => {
  if (!req.params.id)
    res.status(400).json({ message: "id is required", ok: false })

  await Template.findById(req.params.id)
    .exec()
    .then((template) => {
      if (!template)
        res
          .status(404)
          .json({
            message: "no template found matched the provided id",
            ok: true,
          })
      else res.status(200).json({ template, ok: true })
    })
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

templateRouter.post("/create-team", (req, res) => {})

templateRouter.delete("/remove-team", (req, res) => {})

templateRouter.put("/update-team", (req, res) => {})

export default templateRouter
