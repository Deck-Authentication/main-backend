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
import jwt from "express-jwt"
import jwks from "jwks-rsa"
const app = express()

require("dotenv").config()

const port = process.env.PORT || 8080

// connect to mongoDB database using call(this) to access local variables in this file
connectDB.call(this)

// in production environment, only allow requests from the frontend: https://app.withdeck.com
const corsOptions =
  process.env.ENVIRONMENT === "production"
    ? {
        origin: "https://app.withdeck.com",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      }
    : {}
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-fh2bo4e4.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:8080",
  issuer: "https://dev-fh2bo4e4.us.auth0.com/",
  algorithms: ["RS256"],
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.get("/", (_, res) => {
  res.status(200).send("Welcome to the Deck API. To learn more or sign up for Deck, visit https://withdeck.com")
})

// Secure the backend auth0 API management in production mode
process.env.ENVIRONMENT === "production" ? app.use(jwtCheck) : null

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
