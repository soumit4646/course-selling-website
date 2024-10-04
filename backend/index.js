require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../", "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    );
  });
}

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(process.env.MONGO_URL);
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
