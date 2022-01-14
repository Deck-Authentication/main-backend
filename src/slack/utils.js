import axios from "axios"
import { config } from "dotenv"

config()
// The base URL for the Slack API SCIM
const SLACK_SCIM_API_URL = "https://api.slack.com/scim/v1"

const authHeaders = {
  Authorization: `Bearer ${process.env.SLACK_ORG_ADMIN_USER_TOKEN}`,
  "Content-Type": "application/json",
}

// Limit (requests per minute): 300
// Burst (requests): 300
export async function getUser(id = "") {
  const url =
    id !== ""
      ? `${SLACK_SCIM_API_URL}/Users/${id}`
      : `${SLACK_SCIM_API_URL}/Users`
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
    url: `${SLACK_SCIM_API_URL}/ServiceProviderConfigs`,
    headers: authHeaders,
  }).then((res) => res.data)

  return result
}
