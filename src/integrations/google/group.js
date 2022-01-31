import { Router } from "express"
import { google } from "googleapis"
import { auth } from "./auth"

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

  Promise.all(promises)
    .then((_) => res.status(200).json({ message: "success" }))
    .catch((err) => res.status(500).json({ message: err }))
})

groupRouter.delete("/remove-members", async (req, res) => {
  // groupKeys is an array of group emails, while members is an array of user emails
  const { groupKeys, members } = req.body

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

  Promise.all(promises)
    .then((_) => res.status(200).json({ message: "success" }))
    .catch((err) => res.status(500).json({ message: err }))
})

export default groupRouter
