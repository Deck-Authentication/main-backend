import express from "express"
import slackRouter from "./integrations/slack"
import googleRouter from "./integrations/google"
import githubRouter from "./integrations/github"
import atlassianRouter from "./integrations/atlassian"
import templateRouter from "./template"
import userRouter from "./users"
import cors from "cors"
import { connectDB } from "./database"
const app = express()

require("dotenv").config()

const port = process.env.PORT || 1999

connectDB.call(this)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (_, res) => {
  res.send("Hello World!")
})

// templates
app.use("/template", templateRouter)

// users
app.use("/users", userRouter)

// apps
app.use("/slack", slackRouter)
app.use("/google", googleRouter)
app.use("/github", githubRouter)
app.use("/atlassian", atlassianRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
