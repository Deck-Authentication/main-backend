import { Router } from "express"

const confluenceRouter = Router()

confluenceRouter.post("/create-team", (req, res) => {})

confluenceRouter.delete("/delete-team", (req, res) => {})

confluenceRouter.post("/invite-to-team", (req, res) => {})

confluenceRouter.delete("/remove-from-team", (req, res) => {})

export default confluenceRouter
