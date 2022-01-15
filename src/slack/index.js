import express from "express"
let slackRouter = express.Router()
import * as slackUtils from "./utils"

slackRouter.get("/port", (req, res) => {
  res.status(200).send(`PORT = ${process.env.PORT || "No Port found"}`)
})

/**
 * Get the user ID for a given email address, then get the user object for that ID.
 */
slackRouter.get("/user/:email", async (req, res) => {
  const email = req.params.email
  const userId = await slackUtils.emailToUserId(email)

  const user = await slackUtils.getUser(userId)

  res.status(200).json({ user })
})

slackRouter.get("/ServiceProviderConfigs", async (req, res) => {
  const serviceProviderConfigs = await slackUtils.getServiceProviderConfigs()

  res.status(200).json({ serviceProviderConfigs })
})

slackRouter.get("/listConversations", async (req, res) => {
  const conversations = await slackUtils.listConversations()

  res.status(200).json({ conversations })
})

// slackRouter.use((error, req, res, next) => {
//   res.status(500).json({ error })
// })

export default slackRouter
