import { Router } from "express"
import { google } from "googleapis"
import { auth } from "./auth"
import lodash from "lodash"

const groupRouter = Router()

// obtain the admin client
const admin = google.admin({
  version: "directory_v1",
  auth,
})

groupRouter.post("/create-group", async (req, res) => {})

groupRouter.post("/delete-group", async (req, res) => {})

groupRouter.get("/list-all-groups", async (req, res) => {
  // Hard code the userKey as email address for now
  // since we don't have the user authentication flow on the frontend yet
  const email = "peter@withdeck.com"

  await admin.groups
    .list({
      userKey: email,
    })
    .then((response) => {
      res.status(200).json({
        groups: response.data.groups,
        ok: true,
      })
    })
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

groupRouter.post("/add-members", async (req, res) => {
  // groupKeys is an array of group emails, while members is an array of objects in the form { email: "", role: "" }
  const { groupKeys, members } = req.body

  let promises = []
  for (let groupKey of groupKeys) {
    for (let member of members) {
      promises.push(
        admin.members.insert({
          groupKey,
          resource: {
            email: member.email,
            role: member.role,
          },
        })
      )
    }
  }
  // Use Promise.allSettled instead of Promise.all since each invitation is independent on each other
  Promise.allSettled(promises).then((responses) => {
    for (let response of responses) {
      // ignore the exception where member is already in the group with the status code 409 for now
      if (response.status == "rejected" && response?.reason?.response?.status != 409)
        return res.status(500).json({ message: response.reason, ok: false })
    }

    res.status(200).json({ message: "success", ok: true })
  })
})

groupRouter.delete("/remove-members", async (req, res) => {
  // groupKeys is an array of group emails, while members is an array of user emails
  const { groupKeys, members } = req.body

  if (!lodash.isArray(groupKeys) || !lodash.isArray(members))
    return res.status(400).json({ message: "groupKeys and members must be arrays", ok: false })

  let promises = []
  for (let groupKey of groupKeys) {
    for (let member of members) {
      promises.push(
        admin.members.delete({
          groupKey,
          memberKey: member,
        })
      )
    }
  }

  // Use Promise.allSettled instead of Promise.all since each removal job is independent on each other
  Promise.allSettled(promises).then((responses) => {
    for (let response of responses) {
      // ignore the exception where member is not in the group with the status code 404 for now
      if (response.status == "rejected" && response?.reason?.response?.status != 404)
        return res.status(500).json({ message: response.reason, ok: false })
    }

    res.status(200).json({ message: "success", ok: true })
  })
})

export default groupRouter
