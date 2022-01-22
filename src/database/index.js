import mongoose from "mongoose"

export function connectDB() {
  // Connect to MongoDB
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((_) => console.log("MongoDB Connected"))
    .catch((err) => console.warn(err))
}
