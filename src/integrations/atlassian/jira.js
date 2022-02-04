import { Router } from "express"
import { findUser, getUsersFromGroup } from "./jiraUtils"
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

  // fetch full user info to use the user.accountId
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

  await Promise.allSettled(promises).then((responses) => {
    for (let response of responses) {
      // since the groupname and the accountId are provided and not empty, the 400 can only from the case where the user is already in the group
      // in that case, we ignore the error since we've fulfilled the user invitation request
      if (response.status == "rejected" && response?.reason?.response?.status != 400) {
        return res.status(500).json({ error: response.reason, ok: false })
      }
    }

    res.status(200).json({ message: "Successfully invite users to groups" })
  })
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

jiraRouter.get("/get-all-users-in-group", async (req, res) => {
  const { groupname } = req.query

  const users = await getUsersFromGroup(groupname).catch((err) => res.status(500).json({ message: err, ok: false }))

  res.status(200).json({ users: users, ok: true })
})

// This route is for testing purposes only
jiraRouter.get("/get-projects", async (_, res) => {
  const projects = await jiraClient.projects.getAllProjects().catch((err) => res.status(500).json(err))

  console.log(projects)

  res.status(200).json(projects)
})

export default jiraRouter
