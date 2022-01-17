import express from "express"
import slackRouter from "./slack"
import googleRouter from "./google"
import cors from "cors"
const app = express()

require("dotenv").config()

const port = process.env.PORT || 1999

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/slack", slackRouter)
app.use("/google", googleRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
