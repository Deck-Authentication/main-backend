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

/**
 * `findUser` is a function that takes an email address and returns the user object associated with
that email address.
 * @param email - The email address of the user to search for.
 * @returns The user object.
 */
export async function findUser(email) {
  const users = await jiraClient.userSearch
    .findUsers({
      query: email,
    })
    .catch((err) => {
      throw new Error(err)
    })
  return users[0]
}
