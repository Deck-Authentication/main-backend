import express from "express"
import lodash from "lodash"
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
  // Assuming that there is no '#' sign in the channel name
  // This is an edge case that must be handled by the frontend
  // emails is an array of string
  const { emails, channelName } = req.body

  // The Slack API only allows 1000 users to be invited at a time: https://api.slack.com/methods/conversations.invite#arg_channel
  if (emails.length > 1000)
    res.json(413).json({
      message: "Error: only up to 1000 emails can be invited each API call",
    })

  let userIds = []

  for (let email of emails) {
    if (!isEmail(email))
      res.status(412).json({ message: `Error: invalid email address ${email}` })

    await slackUtils
      .emailToUserId(email)
      .then((userId) => userIds.push(userId))
      .catch((err) => res.status(406).json({ message: err.message }))
  }

  // Get all channels in the workspace, save into an object where keys are channel names
  let allChannels = {}
  await slackUtils
    .listConversations()
    .then((channels) =>
      channels.map(
        (channel) => (allChannels[channel.name] = lodash.cloneDeep(channel))
      )
    )
    .catch((err) => res.status(500).json({ message: err }))

  // for O(1) lookup, we should save all channels into an object

  const matchedChannel = allChannels.find(
    (channel) => channel.name === channelName && channel.is_channel
  )

  // matchedChannels should be an array

  if (!matchedChannel)
    res.status(404).json({ message: `Channel ${channelName} not found` })

  const channelId = matchedChannel.id

  // join the array userIds to a comma-separated string of user IDs to comply with Slack standards
  // Example: W1234567890,U2345678901,U3456789012
  const invitation = await slackUtils
    .inviteToChannel(userIds.join(), channelId)
    .catch((err) => res.status(500).json({ message: err }))

  res.status(200).json({ invitation })
})

// slackRouter.use((error, req, res, next) => {
//   res.status(500).json({ error })
// })

export default slackRouter
