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

groupRouter.get("/get-group", async (req, res) => {})

groupRouter.get("/add-member", async (req, res) => {
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

groupRouter.get("/remove-member", async (req, res) => {})

export default groupRouter
