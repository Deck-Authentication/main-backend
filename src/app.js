import express from "express"
import slackRouter from "./integrations/slack"
import googleRouter from "./integrations/google"
import githubRouter from "./integrations/github"
import atlassianRouter from "./integrations/atlassian"
import cors from "cors"
import { connectDB } from "./database"
const app = express()

require("dotenv").config()

const port = process.env.PORT || 1999

connectDB.call(this)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/team", teamRouter)

app.use("/slack", slackRouter)
app.use("/google", googleRouter)
app.use("/github", githubRouter)
app.use("/atlassian", atlassianRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
