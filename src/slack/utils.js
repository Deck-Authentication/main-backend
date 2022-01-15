import axios from "axios"
import { config } from "dotenv"

config()
// The base URL for the Slack API SCIM
const SLACK_SCIM_API = "https://api.slack.com/scim/v1"
const SLACK_API = "https://slack.com/api"

const scimAuthHeaders = {
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
  const response = await axios.get(url, { headers: scimAuthHeaders })

  if (!response.ok) throw new Error(`Slack API error: ${res.error}`)

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

/**
 * @returns A list of service provider configs.
 */
export async function getServiceProviderConfigs() {
  const result = await axios({
    method: "get",
    url: `${SLACK_SCIM_API}/ServiceProviderConfigs`,
    headers: scimAuthHeaders,
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
  const config = {
    method: "get",
    url: `${SLACK_API}/users.lookupByEmail?email=${email}`,
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      Cookie: "b=394400ceb27cb8b995ced7ab7e2247bc",
    },
  }

  const res = await axios(config).then((res) => res.data)

  if (!res.ok) throw new Error(`Slack API error: ${res.error}`)

  return res.user.id
}

/**
 * It makes a GET request to the Slack API, and returns the response as a JSON object.
 * @returns A list of channels.
 */
export async function listConversations() {
  const config = {
    method: "get",
    url: `${SLACK_API}/conversations.list`,
    headers: {
      Authorization: `Bearer ${process.env.SLACK_ORG_ADMIN_USER_TOKEN}`,
      Cookie: "b=394400ceb27cb8b995ced7ab7e2247bc",
    },
    params: {
      types: "public_channel,private_channel",
    },
  }

  const response = await axios(config).then((res) => res.data)

  if (!response.ok) throw new Error(`Slack API error: ${response.error}`)

  return response.channels
}

export async function inviteToChannel(userIds = "", channelId = "") {
  const config = {
    method: "get",
    url: `${SLACK_API}/conversations.invite`,
    headers: {
      Authorization: `Bearer ${process.env.SLACK_ORG_ADMIN_USER_TOKEN}`,
      Cookie: "b=394400ceb27cb8b995ced7ab7e2247bc",
    },
    params: {
      channel: channelId,
      users: userIds,
    },
  }

  const response = await axios(config).then((res) => res.data)

  if (!response.ok) throw new Error(`Slack API error: ${response.error}`)

  return response.channel
}
