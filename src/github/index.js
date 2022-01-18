import { Router } from "express"
import { Octokit } from "octokit"
import { config } from "dotenv"
// load environment variables from .env file
config()

const githubRouter = Router()
const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
})

githubRouter.post("/invite-to-team", async (req, res) => {
  const { org, team_slug, username, role } = req.body
  await octokit
    .request("PUT /orgs/:org/teams/:team_slug/memberships/:username", {
      org,
      team_slug,
      username,
      role,
    })
    .then((response) => {
      if (response.status == 200)
        res.status(200).json({
          message: `Successfully invite ${username} to ${team_slug} with role ${role}`,
        })
      else
        res.status(500).json({
          message: `Request failed with the Github status ${response.status}`,
        })
    })
    .catch((err) => res.status(500).json({ message: err.message }))
})

githubRouter.delete("/remove-from-team", (req, res) => {})

githubRouter.post("/create-team", (req, res) => {})

githubRouter.delete("/delete-team", (req, res) => {})

export default githubRouter
