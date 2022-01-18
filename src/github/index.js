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
  const { usernames, team_slugs, org } = req.body

  let removals = []

  team_slugs.map((team_slug) => {
    usernames.map((username) =>
      removals.push(
        octokit.request(
          "DELETE /orgs/:org/teams/:team_slug/memberships/:username",
          {
            org,
            team_slug,
            username,
          }
        )
      )
    )
  })

  await Promise.all(removals)
    .then((responses) => {
      responses.map((response) => {
        if (response.status != 200 && response.status != 204)
          res.status(500).json({
            message: `Request failed`,
            responseStatus: response.status,
          })
      })

      res.status(200).json({
        message: `Remove successfully`,
      })
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Request failed from Github", error: err })
    )
})

githubRouter.post("/create-team", (req, res) => {})

githubRouter.delete("/delete-team", (req, res) => {})

export default githubRouter
