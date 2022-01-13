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
export function getUser() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export function createUser() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export function updateUser() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export function deleteUser() {}

// Limit (requests per minute): 300
// Burst (requests): 300
export function getGroup() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export function createGroup() {}

// Limit (requests per minute): 180
// Burst (requests): 80
export function updateGroup() {}

// Limit (requests per minute): 180
// Burst (requests): 20
export function deleteGroup() {}

export async function getServiceProviderConfigs() {
  console.log("authHeaders = ", authHeaders)

  const result = await axios({
    method: "get",
    url: `${SLACK_SCIM_API_URL}/ServiceProviderConfigs`,
    headers: authHeaders,
  }).then((res) => {
    console.log(res.statusText)
    console.log(res.status)
    return res.data
  })

  return result
}
