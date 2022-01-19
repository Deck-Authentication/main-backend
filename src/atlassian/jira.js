import { Router } from "express"
import { config } from "dotenv"
import { Version2Client } from "jira.js"

// load environment variables from .env file
config()

const jiraClient = new Version2Client({
  host: process.env.ATLASSIAN_HOST,
  authentication: {
    basic: {
      email: process.env.ATLASSIAN_EMAIL,
      apiToken: process.env.ATLASSIAN_API_TOKEN,
    },
  },
})

const jiraRouter = Router()

jiraRouter.post("/create-team", async (req, res) => {})

jiraRouter.delete("/delete-team", async (req, res) => {})

jiraRouter.post("/invite-to-team", async (req, res) => {})

jiraRouter.delete("/remove-from-team", async (req, res) => {})

// This route is for testing purposes only
jiraRouter.get("/get-projects", async (req, res) => {
  const projects = await jiraClient.projects
    .getAllProjects()
    .catch((err) => res.status(500).json(err))

  console.log(projects)

  res.status(200).json(projects)
})

export default jiraRouter
