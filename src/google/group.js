import { Router } from "express"
import { google } from "googleapis"
import { auth } from "./auth"

const groupRouter = Router()

// obtain the admin client
const admin = google.admin({
  version: "directory_v1",
  auth,
})

groupRouter.post("/create-group", async (req, res) => {})

groupRouter.post("/delete-group", async (req, res) => {})

groupRouter.get("/get-group", async (req, res) => {})

groupRouter.get("/add-member", async (req, res) => {})

groupRouter.get("/remove-member", async (req, res) => {})

export default groupRouter
