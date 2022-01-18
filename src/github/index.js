import { response, Router } from "express"
import { Octokit } from "octokit"
import { config } from "dotenv"
// load environment variables from .env file
config()

const githubRouter = Router()
const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
})

githubRouter.post("/invite-to-team", async (req, res) => {
  const { org, team_slugs, users } = req.body

  let invitations = []

  team_slugs.map((team_slug) => {
    users.map((user) =>
      invitations.push(
        octokit.request(
          "PUT /orgs/:org/teams/:team_slug/memberships/:username",
          {
            org,
            team_slug,
            username: user.username,
            role: user.role,
          }
        )
      )
    )
  })

  await Promise.all(invitations)
    .then((responses) => {
      responses.map((response) => {
        if (response.status != 200)
          res.status(500).json({
            message: `Request failed`,
            responseStatus: response.status,
          })
      })

      res.status(200).json({
        message: `Invite successfully`,
      })
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Request failed from Github", error: err })
    )
})

githubRouter.delete("/remove-from-team", async (req, res) => {
  const { username, team_slug, org } = req.body
  await octokit
    .request("DELETE /orgs/:org/teams/:team_slug/memberships/:username", {
      org,
      team_slug,
      username,
    })
    .then((response) => {
      if (response.status == 204)
        res.status(200).json({
          message: `Successfully remove ${username} from ${team_slug}`,
        })
      else
        res.status(500).json({
          message: `Request failed with the Github status ${response.status}`,
        })
    })
    .catch((err) => res.status(500).json({ message: err.message }))
})

githubRouter.post("/create-team", (req, res) => {})

githubRouter.delete("/delete-team", (req, res) => {})

export default githubRouter
