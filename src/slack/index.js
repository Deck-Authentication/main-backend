import express from "express"
let slackRouter = express.Router()
import * as slackUtils from "./utils"
// isEmail as a function from the main utils folder
import { isEmail } from "../utils"

/**
 * Get the user ID for a given email address, then get the user object for that ID.
 */
slackRouter.get("/user/:email", async (req, res) => {
  const email = req.params.email
  if (!isEmail(email))
    res
      .status(412)
      .json({ message: "Error: input must be a valid email address" })

  const userId = await slackUtils
    .emailToUserId(email)
    .catch((err) => res.status(406).json({ message: err.message }))

  const user = await slackUtils
    .getUser(userId)
    .catch((err) => res.status(403).json({ message: err.message }))

  res.status(200).json({ user })
})

slackRouter.get("/service-provider-configs", async (req, res) => {
  const serviceProviderConfigs = await slackUtils.getServiceProviderConfigs()

  res.status(200).json({ serviceProviderConfigs })
})

slackRouter.get("/list-conversations", async (req, res) => {
  const conversations = await slackUtils.listConversations()

  res.status(200).json({ conversations })
})

slackRouter.put("/invite-to-channel", async (req, res) => {
  // Assuming that there is no # sign in the channel name
  // This is an edge case that must be handled by the frontend
  const { email, channelName } = req.body

  if (!isEmail(email))
    res
      .status(412)
      .json({ message: "Error: input must be a valid email address" })

  const userId = await slackUtils
    .emailToUserId(email)
    .catch((err) => res.status(406).json({ message: err.message }))

  // Get channel ID from channel name
  const allChannels = await slackUtils
    .listConversations()
    .catch((err) => res.status(500).json({ message: err }))

  const matchedChannel = allChannels.find(
    (channel) => channel.name === channelName
  )

  if (!matchedChannel)
    res.status(404).json({ message: `Channel ${channelName} not found` })

  const channelId = matchedChannel.id

  const invitation = await slackUtils
    .inviteToChannel(userId, channelId)
    .catch((err) => res.status(500).json({ message: err }))

  res.status(200).json({ invitation })
})

// slackRouter.use((error, req, res, next) => {
//   res.status(500).json({ error })
// })

export default slackRouter
