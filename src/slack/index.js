import express from "express"
let slackRouter = express.Router()
import * as slackUtils from "./utils"

slackRouter.get("/port", (req, res) => {
  res.status(200).send(`PORT = ${process.env.PORT || "No Port found"}`)
})

slackRouter.get("/ServiceProviderConfigs", async (req, res) => {
  const serviceProviderConfigs = await slackUtils.getServiceProviderConfigs()

  console.log("serviceProvderConfigs = ", serviceProviderConfigs)
  res.status(200).json({ serviceProviderConfigs })
})

// slackRouter.use((error, req, res, next) => {
//   res.status(500).json({ error })
// })

export default slackRouter
