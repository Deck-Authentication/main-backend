import { Router } from "express"
import { findUser } from "./jiraUtils"
import { config } from "dotenv"
import { Version2Client } from "jira.js"
// load environment variables from .env file
config()

const jiraClient = new Version2Client({
  host: process.env.ATLASSIAN_HOST,
  authentication: {
    basic: {
      email: process.env.ATLASSIAN_EMAIL,
      apiToken: process.env.ATLASSIAN_API_TOKEN,
    },
  },
})

const jiraRouter = Router()

jiraRouter.post("/create-team", async (req, res) => {})

jiraRouter.delete("/delete-team", async (req, res) => {})

jiraRouter.post("/invite-to-team", async (req, res) => {
  const { groupnames, emails } = req.body
  console.log("groupnames", groupnames)
  console.log("emails", emails)

  const usersPromises = emails.map((email) => findUser(email))

  const users = await Promise.all(usersPromises).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })

  let promises = []

  groupnames.map((groupname) => {
    users.map((user) => {
      promises.push(
        jiraClient.groups.addUserToGroup({
          groupname: groupname,
          accountId: user.accountId,
        })
      )
    })
  })

  await Promise.all(promises)
    .then(() => res.status(200).json({ message: "Successfully invite users to groups" }))
    .catch((err) => res.status(500).send(err))
})

jiraRouter.get("/get-all-groups", async (_, res) => {
  await jiraClient.groups
    .findGroups()
    .then((groups) => res.status(200).json({ groups: groups.groups }))
    .catch((err) => res.status(500).send(err))
})

jiraRouter.delete("/remove-from-team", async (req, res) => {
  const { groupnames, emails } = req.body

  const usersPromises = emails.map((email) => findUser(email))

  const users = await Promise.all(usersPromises).catch((err) => res.status(500).send(err))

  let promises = []

  groupnames.map((groupname) => {
    users.map((user) => {
      promises.push(
        jiraClient.groups.removeUserFromGroup({
          groupname: groupname,
          accountId: user.accountId,
        })
      )
    })
  })

  await Promise.all(promises)
    .then(() => res.status(200).json({ message: "Successfully remove users from groups" }))
    .catch((err) => res.status(500).send(err))
})

// This route is for testing purposes only
jiraRouter.get("/get-projects", async (req, res) => {
  const projects = await jiraClient.projects.getAllProjects().catch((err) => res.status(500).json(err))

  console.log(projects)

  res.status(200).json(projects)
})

export default jiraRouter
