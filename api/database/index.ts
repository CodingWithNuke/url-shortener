import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL!, {
  authSource: "admin"
});

mongoose.connection.on("open", () => console.log("connected"));
