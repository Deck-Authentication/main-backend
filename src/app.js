import express from "express"
import slackRouter from "./integrations/slack"
import googleRouter from "./integrations/google"
import githubRouter from "./integrations/github"
import atlassianRouter from "./integrations/atlassian"
import templateRouter from "./template"
import userRouter from "./users"
import cors from "cors"
import helmet from "helmet"
import { connectDB } from "./database"
const app = express()

require("dotenv").config()

const port = process.env.PORT || 1999

connectDB.call(this)

// in production environment, only allow requests from the frontend: https://app.withdeck.com
const corsOptions =
    process.env.ENVIRONMENT === "production" ?
    {
        origin: "https://app.withdeck.com",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    } :
    {}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.get("/", cors(), (_, res) => {
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