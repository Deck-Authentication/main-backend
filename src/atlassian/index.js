import { Router } from "express"
import { config } from "dotenv"
import jiraRouter from "./jira"
import confluenceRouter from "./confluence"
// load environment variables from .env file
config()

const atlassianRouter = Router()

atlassianRouter.use("/jira", jiraRouter)
atlassianRouter.use("/confluence", confluenceRouter)

export default atlassianRouter
