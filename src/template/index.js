import { Router } from "express"
import { Template } from "../database/template"

const templateRouter = Router()

templateRouter.get("/get-all-template", async (_, res) => {
  await Template.find({})
    .exec()
    .then((template) => res.status(200).json({ template }))
    .catch((err) => res.status(500).json({ message: err }))
})

templateRouter.post("/create-team", (req, res) => {})

templateRouter.delete("/remove-team", (req, res) => {})

templateRouter.put("/update-team", (req, res) => {})

export default templateRouter
