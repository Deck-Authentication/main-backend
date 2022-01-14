import axios from "axios"
import { config } from "dotenv"

config()
// The base URL for the Slack API SCIM
const SLACK_SCIM_API = "https://api.slack.com/scim/v1"
const SLACK_API = "https://slack.com/api"

const authHeaders = {
  Authorization: `Bearer ${process.env.SLACK_ORG_ADMIN_USER_TOKEN}`,
  "Content-Type": "application/json",
}

// Limit (requests per minute): 300
// Burst (requests): 300
/**
 * It takes an optional `id` parameter, and if it's not empty, it makes a GET request to the
`/Users/:id` endpoint. Otherwise, it makes a GET request to the `/Users` endpoint.
 * @param id - The user's ID. If not provided, the endpoint will return all users.
 * @returns The user object.
 */
export async function getUser(id = "") {
  const url =
    id !== "" ? `${SLACK_SCIM_API}/Users/${id}` : `${SLACK_SCIM_API}/Users`
  const response = await axios.get(url, { headers: authHeaders })
  return response.data
}

// Limit (requests per minute): 180
// Burst (requests): 20
export async function createUser() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export async function updateUser() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export async function deleteUser() {}

// Limit (requests per minute): 300
// Burst (requests): 300
export async function getGroup() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export async function createGroup() {}

// Limit (requests per minute): 180
// Burst (requests): 80
export async function updateGroup() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export async function deleteGroup() {}

export async function getServiceProviderConfigs() {
  const result = await axios({
    method: "get",
    url: `${SLACK_SCIM_API}/ServiceProviderConfigs`,
    headers: authHeaders,
  }).then((res) => res.data)

  return result
}

/**
 * Given an email address,
 * return the Slack user ID.
 * @param email - The email address of the user to look up.
 * @returns The user ID of the user with the given email address.
 */
export async function emailToUserId(email) {
  const res = await axios({
    method: "get",
    url: `${SLACK_API}/users.lookupByEmail`,
    params: {
      token: process.env.SLACK_ORG_ADMIN_USER_TOKEN,
      email,
    },
  }).then((res) => res.data)

  if (!res.ok) throw new Error(`Slack API error: ${res.error}`)

  return res.user.id
}
