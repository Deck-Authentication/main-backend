import { Router } from "express"
import { google } from "googleapis"
import queryString from "query-string"
import path from "path"
import url from "url"

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
