import { Router } from "express"
import groupRouter from "./group"

const googleRouter = Router()

googleRouter.use("/group", groupRouter)

googleRouter.get("/ping", (_, res) => {
  res.status(200).json({ message: "Hello. This route is working" })
})

export default googleRouter
