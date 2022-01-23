import { Router } from "express"
import { Team } from "../database/team"

const teamRouter = Router()

teamRouter.get("/get-all-team", async (_, res) => {
  await Team.find({})
    .exec()
    .then((team) => res.status(200).json({ team }))
    .catch((err) => res.status(500).json({ message: err }))
})

teamRouter.post("/create-team", (req, res) => {})

teamRouter.delete("/remove-team", (req, res) => {})

teamRouter.put("/update-team", (req, res) => {})

export default teamRouter
