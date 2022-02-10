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

export default userRouter
