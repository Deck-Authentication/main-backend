import { Router } from "express"
import { User } from "../database/user"
import mongoose from "mongoose"
import lodash from "lodash"

const userRouter = Router()

// get user by Id
userRouter.get("/get-user", async (req, res) => {
  const { id } = req.query
  // cast the req.body.id to MongoDB ObjectId type to avoid invalid id error from mongoose
  const _id = mongoose.Types.ObjectId(id)

  const user = await User.findById(id).catch((err) => res.status(500).json({ message: err, ok: false }))
  if (user) {
    res.status(200).json({ message: user, ok: true })
  } else {
    res.status(404).json({ message: "User not found", ok: false })
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

userRouter.put("/update/team", async (req, res) => {
  const { _id, team } = req.body

  if (!_id?.trim()) return res.status(400).json({ message: "_id is required as a nonempty string", ok: false })
  if (!lodash.isArray(team)) return res.status(400).json({ message: "team is required as an array of strings", ok: false })

  // cast the _id to MongoDB ObjectId type to avoid invalid id error from mongoose
  let id = mongoose.Types.ObjectId(_id)

  // set the option new to true to return the updated document
  await User.findByIdAndUpdate(id, { team })
    .exec()
    .then((_) => res.status(200).json({ message: "Successfully update user", ok: true }))
    .catch((err) => res.status(500).json({ message: err, ok: false }))
})

userRouter.delete("/delete", async (req, res) => {})

export default userRouter
