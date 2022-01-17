import { Router } from "express"
import { google } from "googleapis"
import queryString from "query-string"
import path from "path"
import url from "url"

const scopes = [
  "https://www.googleapis.com/auth/admin.directory.group",
  "https://www.googleapis.com/auth/admin.directory.group.member",
  "https://www.googleapis.com/auth/admin.directory.user.security",
]

const jwtKey = {
  type: "service_account",
  project_id: "workspace-admin-deck",
  private_key_id: "c258648fcf04da27e25d039fe10ac9fee87b44c9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCs0yy+7brGTeQo\nHKzc1Nd3LJ0jt3UvxwZYD8oPKqza13088TL0RdBWWiWqHx64Na7nOs0Wj5ohYRya\nhRK4ImyQw/CjAmHq17uz2My0s6bVYKFAYif41887kVrQWyug9c1w/+yaQm+jLMsm\nZupTXo9BkMKPvM6c4FXEPxlnZJMmmkhH4gCo9AKPaD/DoiJCUUdSisJhplSFPLnM\n/nyrCoEWovcjOwRr4pvL1uZW01PhTMixZOBPQiwJAurO39wYa7eAFBXh7rfu3XpC\n0dagjPMZwoKLiC2GFGuoLu33AXzQwKVR/EoMykhB0ZC0WbVKp850LC/A3uTFkaA8\no4A/4cxPAgMBAAECggEAAhWoAAOREaxF2MADy8QbdzoICTLAzJs7ddt25fjvTdJ0\nlcQZB75B1ZDPzH4Emlc3bV2VtLR1uPpZZHm/cI4lvhdG80hnkvQYNQKj8XgLRp6c\nQ1ELx2IfA0ptDH9VBuOAH2FO4stzWkYDi0qJgAjvdGyBFEfEPDsufaf/L/KUHc6Q\ngTMGkHS6UAhSAAJVkKGP2G5p0HCMn5uPhxf7M0/li7GWBt496e3Xf114xUe7HET8\nLpuFt02HFYFSCmypGp9QDYzmOFcvtRbNU437VtxdCFEU9QLzq+iIFxZM/8+smyTl\n3f/z2vUD8q4kDVTdukLCEfgQP4LbnTNiB7WmwQEcjQKBgQDmcNI7FOL7kN4nfMdf\nE6s7wLstpTKox/Bz8UrjAddhJsYJazu+4SlDk4+1LDQSobNxZ/ORhqMX3aWCVBWL\nHSxh8I1+qNG3S9M6Q2E84N7oT0TUwc98ul9z2oiP+9CuFJBfOoLyv3Hgu+lOrc12\nYi5eH3/U5lZns4r+ITQZn0KsjQKBgQC//mYnOUuOcH10Td7yzHt3kwW+4jlbsuAQ\niR42TqdE/O+j5ZKHtoW3CiPZUp3VPuudC68OuAa+/MMUr6yDaOVpCSUwACWRoWrx\n/1cNFrqLdheULIYchQrzEbFZkrG5lQCAvapJ5EydYUiwTdID7VYxwUe7AvrD+UCw\nU5BIdZf7SwKBgAMi7fmX4y8BXcSz0hLdNatuiB2q7fGWJxOs6RQF5mSQHonqR7nl\nXqZoz7/rhhnq0YJto8cLShT9E0+ezVxDXWNH3uUmbxRLl+hnGl+1v9LxoUI0ERrl\nfn8ZLlqnVsPHy98/8KBVMruYUyia/PzrgS4Ox7KiH/LxYqbq1Ma0gDfRAoGADk+T\nI7dUl3BxGXs4dBaj2VzfH8RTDC/AHdtqoheoxi6oWiohivYi72rVEzziQOPowhL9\n4HX9Ir1KeT9C96SY/QROfk50fm9uvk0PGw2np/+McGIFORj9oPKfqpKRpsihefcp\nO0rGHzECLwoN7ncBZsIGa70kHfl1Re9koNILGxMCgYBFTaJYZLyQSgvVSFzzST3W\nzdBDZQ1dTluKwXyyMdGgcfhtomIq3UG1EyV+o+ROP9O9P16BMd8Yy+70KR1b6nIE\nzXGkHWB+ks/oeEWXSxT+Fq0VRyL6s9zkMqzMBeBmNhqJVzOTTN4bXB04hDT1GCNC\nVRJbiW3H9BeXBLeVoDNzbA==\n-----END PRIVATE KEY-----\n",
  client_email: "deck-jwt@workspace-admin-deck.iam.gserviceaccount.com",
  client_id: "105665069308042416719",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/deck-jwt%40workspace-admin-deck.iam.gserviceaccount.com",
}

const googleRouter = Router()

googleRouter.post("/create-group", async (req, res) => {})

googleRouter.post("/delete-group", async (req, res) => {})

googleRouter.get("/get-group", async (req, res) => {})

googleRouter.get("/add-to-group", async (req, res) => {})

googleRouter.get("/remove-from-group", async (req, res) => {})

googleRouter.get("/ping", (_, res) => {
  res.status(200).json({ message: "Hello. This route is working" })
})

export default googleRouter
