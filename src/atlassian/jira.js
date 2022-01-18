import { Router } from "express"

const jiraRouter = Router()

jiraRouter.post("/create-team", (req, res) => {})

jiraRouter.delete("/delete-team", (req, res) => {})

jiraRouter.post("/invite-to-team", (req, res) => {})

jiraRouter.delete("/remove-from-team", (req, res) => {})

export default jiraRouter
