import express from "express"
let slackRouter = express.Router()

slackRouter.get("/port", (req, res) => {
  res.status(200).send(`PORT = ${process.env.PORT || "No Port found"}`)
})

export default slackRouter
