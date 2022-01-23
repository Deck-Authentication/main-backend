import { Router } from "express"

const confluenceRouter = Router()

confluenceRouter.post("/create-team", async (req, res) => {})

confluenceRouter.delete("/delete-team", async (req, res) => {})

confluenceRouter.post("/invite-to-team", async (req, res) => {})

confluenceRouter.delete("/remove-from-team", async (req, res) => {})

export default confluenceRouter
