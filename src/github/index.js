import { Route } from "express"

const githubRouter = Route()

githubRouter.post("/invite-to-team", (req, res) => {})

githubRouter.delete("/remove-from-team", (req, res) => {})

githubRouter.post("/create-team", (req, res) => {})

githubRouter.delete("/delete-team", (req, res) => {})

export default githubRouter
