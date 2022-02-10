import { Router } from "express"
import { User } from "../database/user"

const userRouter = Router()

userRouter.get("/get-user/:email", async (req, res) => {
  const { email } = req.params
  const user = await User.findOne({ "members.email": email }).catch((err) => res.status(500).send(err))
  if (user) {
    res.status(200).json({ user })
  } else {
    res.status(404).json({ message: "User not found" })
  }
})

// return all users in the database
userRouter.get("/list-all", async (req, res) => {
  const users = await User.find().catch((err) => res.status(500).json({ message: err, ok: false }))

  res.status(200).json({ users, ok: true })
})

// create an user given their email and name
userRouter.post("/create", async (req, res) => {
  const { email, name } = req.body
  if (!email?.trim()) return res.status(400).json({ message: "email is required as a nonempty string", ok: false })
  if (!name?.trim()) return res.status(400).json({ message: "name is required as a nonempty string", ok: false })

  // we must check if the user email already exists before creating a new one
  const existingUser = await User.findOne({ email }).catch((err) => res.status(500).json({ message: err, ok: false }))

  if (existingUser) return res.status(400).json({ message: "User already exists", ok: false })

  // new user isn't provided any team, so the team field must be an empty array
  const user = await User.create({ email, name, team: [] }).catch((err) => res.status(500).json({ message: err, ok: false }))

  if (user) res.status(200).json({ user, ok: true })
  else res.status(500).json({ message: "Error in creating new user", ok: false })
})

userRouter.put("/update", async (req, res) => {})

userRouter.delete("/delete", async (req, res) => {})

export default userRouter
