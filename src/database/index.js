import mongoose from "mongoose"

// Connect to MongoDB
export function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((_) => console.log("MongoDB Connected"))
    .catch((err) => console.warn(err))
}
